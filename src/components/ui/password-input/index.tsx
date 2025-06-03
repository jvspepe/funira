'use client';

import { type ReactNode, type Ref, useRef } from 'react';
import {
  type ButtonProps,
  type GroupProps,
  type InputProps,
} from '@chakra-ui/react';
import {
  Field,
  IconButton,
  Input,
  InputGroup,
  mergeRefs,
  useControllableState,
} from '@chakra-ui/react';
import { EyeIcon, EyeOff } from 'lucide-react';

function VisibilityTrigger({
  ref,
  ...props
}: ButtonProps & { ref?: Ref<HTMLButtonElement> }) {
  return (
    <IconButton
      tabIndex={-1}
      ref={ref}
      me="-2"
      aspectRatio="square"
      size="sm"
      variant="ghost"
      height="calc(100% - {spacing.2})"
      aria-label="Toggle password visibility"
      {...props}
    />
  );
}

interface PasswordVisibilityProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visibilityIcon?: { on: ReactNode; off: ReactNode };
}

interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
  rootProps?: GroupProps;
  label?: string;
  error?: boolean;
  helperText?: ReactNode;
  errorText?: ReactNode;
  optionalText?: ReactNode;
}

export function PasswordInput({
  ref,
  ...props
}: PasswordInputProps & { ref?: Ref<HTMLInputElement> }) {
  const {
    rootProps,
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityIcon = { on: <EyeIcon />, off: <EyeOff /> },
    ...rest
  } = props;

  const [visible, setVisible] = useControllableState({
    value: visibleProp,
    defaultValue: defaultVisible ?? false,
    onChange: onVisibleChange,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field.Root invalid={props.error}>
      {props.label && (
        <Field.Label>
          {props.label}
          <Field.RequiredIndicator fallback={props.optionalText} />
        </Field.Label>
      )}
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e) => {
              if (rest.disabled) return;
              if (e.button !== 0) return;
              e.preventDefault();
              setVisible(!visible);
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          ref={mergeRefs(ref, inputRef)}
          type={visible ? 'text' : 'password'}
        />
      </InputGroup>
      {props.helperText && (
        <Field.HelperText>{props.helperText}</Field.HelperText>
      )}
      {props.errorText && <Field.ErrorText>{props.errorText}</Field.ErrorText>}
    </Field.Root>
  );
}

// interface PasswordStrengthMeterProps extends StackProps {
//   max?: number;
//   value: number;
// }

// export const PasswordStrengthMeter = ({
//   ref,
//   ...props
// }: PasswordStrengthMeterProps & { ref?: Ref<HTMLDivElement | null> }) => {
//   const { max = 4, value, ...rest } = props;

//   const percent = (value / max) * 100;
//   const { label, colorPalette } = getColorPalette(percent);

//   return (
//     <Stack
//       align="flex-end"
//       gap="1"
//       ref={ref}
//       {...rest}
//     >
//       <HStack
//         width="full"
//         ref={ref}
//         {...rest}
//       >
//         {Array.from({ length: max }).map((_, index) => (
//           <Box
//             // eslint-disable-next-line react-x/no-array-index-key
//             key={index}
//             height="1"
//             flex="1"
//             rounded="sm"
//             data-selected={index < value ? '' : undefined}
//             layerStyle="fill.subtle"
//             colorPalette="gray"
//             _selected={{
//               colorPalette,
//               layerStyle: 'fill.solid',
//             }}
//           />
//         ))}
//       </HStack>
//       {label && <HStack textStyle="xs">{label}</HStack>}
//     </Stack>
//   );
// };

// function getColorPalette(percent: number) {
//   switch (true) {
//     case percent < 33:
//       return { label: 'Low', colorPalette: 'red' };
//     case percent < 66:
//       return { label: 'Medium', colorPalette: 'orange' };
//     default:
//       return { label: 'High', colorPalette: 'green' };
//   }
// }
