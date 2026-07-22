import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBRlDDqLXCq50vtbdZ0DuQYXXJKPhrbuwY",
  authDomain: "dragonrojo-ff53d.firebaseapp.com",
  projectId: "dragonrojo-ff53d",
  storageBucket: "dragonrojo-ff53d.firebasestorage.app",
  messagingSenderId: "817293386145",
  appId: "1:817293386145:web:7b29987a8778745632abe0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
  return errInfo;
}
