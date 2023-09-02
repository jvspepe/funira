import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import * as Styled from "./styles";

const CreateAccount = () => {
  return (
    <Styled.Background>
      <Styled.Wrapper>
        <Styled.Form onSubmit={(event) => event.preventDefault()}>
          <TextInput
            variant="secondary"
            id="username"
            label="Nome de Usuário"
          />
          <TextInput variant="secondary" id="email" label="E-mail" />
          <TextInput variant="secondary" id="password" label="Senha" />
          <TextInput
            variant="secondary"
            id="confirm-password"
            label="Confirmar Senha"
          />
          <Button variant="secondary" type="submit">
            Confirmar
          </Button>
        </Styled.Form>
      </Styled.Wrapper>
    </Styled.Background>
  );
};

export default CreateAccount;
