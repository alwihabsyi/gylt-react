import { Goals } from "@/domain/Goals";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./firebase/config";

const COL = "goals";

export const goalService = {
  async getAll(userId: string): Promise<Goals[]> {
    const q = query(collection(db, COL), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Goals);
  },

  async add(data: Omit<Goals, "id">): Promise<Goals> {
    const ref = await addDoc(collection(db, COL), data);
    return { id: ref.id, ...data };
  },

  async update(id: string, data: Partial<Goals>): Promise<void> {
    await updateDoc(doc(db, COL, id), data);
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COL, id));
  },
};
