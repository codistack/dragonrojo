import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  getDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/config';
import { ConfiguracionGeneral, Plato } from '../types';
import { defaultConfiguracion, defaultPlatos } from '../data/defaultData';

const CONFIG_COLLECTION = 'configuracion';
const CONFIG_DOC = 'general';
const PLATOS_COLLECTION = 'platos';

/**
 * Escucha cambios en tiempo real de la configuración general.
 * Si no existe en Firestore, lo inicializa automáticamente con datos por defecto.
 */
export function subscribeConfiguracion(
  callback: (config: ConfiguracionGeneral) => void,
  onError?: (err: any) => void
) {
  const configRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC);

  return onSnapshot(
    configRef,
    async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as ConfiguracionGeneral;
        callback({ ...defaultConfiguracion, ...data });
      } else {
        // Inicializar documento en Firestore
        try {
          await setDoc(configRef, defaultConfiguracion);
          callback(defaultConfiguracion);
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, `${CONFIG_COLLECTION}/${CONFIG_DOC}`);
          callback(defaultConfiguracion);
        }
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `${CONFIG_COLLECTION}/${CONFIG_DOC}`);
      if (onError) onError(error);
      callback(defaultConfiguracion);
    }
  );
}

/**
 * Escucha cambios en tiempo real de la lista de platos.
 * Si la colección está vacía, la puebla automáticamente con los platos típicos iniciales.
 */
export function subscribePlatos(
  callback: (platos: Plato[]) => void,
  onError?: (err: any) => void
) {
  const platosRef = collection(db, PLATOS_COLLECTION);

  return onSnapshot(
    platosRef,
    async (snapshot) => {
      if (!snapshot.empty) {
        const platos: Plato[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as Plato[];
        
        // Ordenar por campo 'orden' o 'nombre'
        platos.sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
        callback(platos);
      } else {
        // Si está vacía, sembrar la base de datos con los platos típicos por defecto
        try {
          for (const item of defaultPlatos) {
            const { id, ...itemData } = item;
            await setDoc(doc(db, PLATOS_COLLECTION, id), itemData);
          }
          callback(defaultPlatos);
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, PLATOS_COLLECTION);
          callback(defaultPlatos);
        }
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, PLATOS_COLLECTION);
      if (onError) onError(error);
      callback(defaultPlatos);
    }
  );
}

/**
 * Guarda o actualiza la configuración general del restaurante en Firestore
 */
export async function updateConfiguracionGeneral(nuevosDatos: Partial<ConfiguracionGeneral>): Promise<boolean> {
  const configRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC);
  try {
    const snap = await getDoc(configRef);
    if (snap.exists()) {
      await updateDoc(configRef, nuevosDatos);
    } else {
      await setDoc(configRef, { ...defaultConfiguracion, ...nuevosDatos });
    }
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${CONFIG_COLLECTION}/${CONFIG_DOC}`);
    return false;
  }
}

/**
 * Agrega un nuevo plato a Firestore
 */
export async function crearPlato(nuevoPlato: Omit<Plato, 'id'>): Promise<string | null> {
  try {
    const platosRef = collection(db, PLATOS_COLLECTION);
    const docRef = await addDoc(platosRef, {
      ...nuevoPlato,
      disponible: nuevoPlato.disponible ?? true,
      destacado: nuevoPlato.destacado ?? false,
      orden: nuevoPlato.orden ?? Date.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, PLATOS_COLLECTION);
    return null;
  }
}

/**
 * Edita un plato existente
 */
export async function actualizarPlato(id: string, datos: Partial<Plato>): Promise<boolean> {
  try {
    const platoRef = doc(db, PLATOS_COLLECTION, id);
    const { id: _, ...datosSinId } = datos;
    await updateDoc(platoRef, datosSinId);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PLATOS_COLLECTION}/${id}`);
    return false;
  }
}

/**
 * Elimina un plato de Firestore
 */
export async function eliminarPlato(id: string): Promise<boolean> {
  try {
    const platoRef = doc(db, PLATOS_COLLECTION, id);
    await deleteDoc(platoRef);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PLATOS_COLLECTION}/${id}`);
    return false;
  }
}
