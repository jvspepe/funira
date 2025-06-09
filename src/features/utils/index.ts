import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';
import type {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

export function converter<T extends DocumentData>(): FirestoreDataConverter<
  T,
  T
> {
  return {
    toFirestore(data: WithFieldValue<T>) {
      return data;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<T, T>, options) {
      return snapshot.data(options);
    },
  };
}

export const handleAuthError = (error: unknown) => {
  let message = '';
  if (!(error instanceof FirebaseError)) {
    message = String(error);
  }
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case AuthErrorCodes.USER_DELETED:
        message = 'Usuário não existe';
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        message = 'Senha incorreta';
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        message = 'E-mail já em uso';
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        message = 'E-mail inválido';
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        message = 'Senha muito fraca';
        break;
      case AuthErrorCodes.POPUP_CLOSED_BY_USER:
        message = 'Operação cancelada';
        break;
      case AuthErrorCodes.POPUP_BLOCKED:
        message = 'Operação bloqueada';
        break;
      default:
        message = 'Algo deu errado';
        break;
    }
  }
  return message;
};

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomRating(min: number, max: number): number {
  const rating = Math.random() * (max - min) + min;
  return parseFloat(rating.toFixed(1));
}
