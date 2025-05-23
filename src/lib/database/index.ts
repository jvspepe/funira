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
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../config';
import { FirebaseError } from 'firebase/app';
import type { ReturnData } from '@/@types/models';

type Collection = 'users' | 'products' | 'categories';

const converter = <T>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data: WithFieldValue<T>) {
      return data ?? {};
    },
    fromFirestore(snapshot, options) {
      return snapshot.data(options) as T;
    },
  };
};

export const createDocument = async <T extends DocumentData>(
  collection: Collection,
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
      data,
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
  collection: Collection,
  path: string
): Promise<ReturnData<T>> => {
  try {
    const document = await getDoc(
      doc(firestore, collection, path).withConverter(converter<T>())
    );

    if (!document.exists()) {
      return {
        status: 'fail',
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

export const getDocuments = async <T extends DocumentData>(
  collection: Collection,
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
        status: 'fail',
        message: 'No documents found',
      };

    snapshot.forEach((element) => documents.push(element.data()));
    lastDocument = snapshot.docs[snapshot.docs.length - 1];
    isLastDocument = snapshot.docs.length < 1;

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

export const updateDocument = async <T>(
  collection: Collection,
  path: string,
  data: Partial<T> & Record<string, unknown>
) => {
  try {
    await updateDoc(
      doc(firestore, collection, path).withConverter(converter<T>()),
      data
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(`Firebase Error ${error.code}: ${error.message}`);
    } else if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};
