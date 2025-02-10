import {
  collection as firestoreCollection,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDoc,
  getDocs,
  query,
  QueryNonFilterConstraint,
  setDoc,
  WithFieldValue,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { firestore } from '../config';
import { FirebaseError } from 'firebase/app';

type ReturnData<T> = {
  status: 'success' | 'error' | 'not-found';
  message: string;
  data?: T;
};

const converter = <T>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data) {
      return data || {};
    },
    fromFirestore(snapshot, options) {
      return snapshot.data(options) as T;
    },
  };
};

export const createDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: string,
  path: string,
  data: T
): Promise<ReturnData<T>> => {
  try {
    await setDoc(
      doc(firestore, collection, path).withConverter(converter<T>()),
      data
    );

    return {
      status: 'success',
      message: 'Document created successfully',
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        status: 'error',
        message: `Firebase Error ${error.code}: ${error.message}`,
      };
    } else {
      return {
        status: 'error',
        message: JSON.stringify(error),
      };
    }
  }
};

export const getDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: string,
  path: string
): Promise<ReturnData<T>> => {
  try {
    const document = await getDoc(
      doc(firestore, collection, path).withConverter(converter<T>())
    );

    if (!document.exists()) {
      return {
        status: 'not-found',
        message: 'Document does not exists',
      };
    }

    return {
      status: 'success',
      message: 'Document retrieved successfully.',
      data: document.data(),
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        status: 'error',
        message: `Firebase Error ${error.code}: ${error.message}`,
      };
    } else {
      return {
        status: 'error',
        message: JSON.stringify(error),
      };
    }
  }
};

export const getDocuments = async <T>(
  collection: string,
  ...constraints: QueryNonFilterConstraint[]
): Promise<
  ReturnData<{
    documents: T[];
    lastDocument: QueryDocumentSnapshot<T>;
    isLastDocument: boolean;
  }>
> => {
  const documents: T[] = [];
  let lastDocument: QueryDocumentSnapshot<T>;
  let isLastDocument: boolean;

  try {
    const snapshot = await getDocs(
      query(
        firestoreCollection(firestore, collection).withConverter(
          converter<T>()
        ),
        ...constraints
      )
    );

    if (snapshot.empty)
      return {
        status: 'not-found',
        message: 'No documents found',
      };

    snapshot.forEach((element) => documents.push(element.data()));
    lastDocument = snapshot.docs[snapshot.size - 1];
    isLastDocument = snapshot.size < 1;

    return {
      status: 'success',
      message: 'Documents found: ' + snapshot.size,
      data: {
        documents,
        lastDocument,
        isLastDocument,
      },
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        status: 'error',
        message: `Firebase Error ${error.code}: ${error.message}`,
      };
    } else {
      return {
        status: 'error',
        message: JSON.stringify(error),
      };
    }
  }
};
