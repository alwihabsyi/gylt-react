import { Activity } from "@/types/activity";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "./firebase/config";

const COL = "activities";

export const activityService = {
  async getAll(userId: string): Promise<Activity[]> {
    const q = query(
      collection(db, COL),
      where("userId", "==", userId),
      orderBy("date", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Activity,
    );
  },

  async add(data: Omit<Activity, "id">): Promise<Activity> {
    const ref = await addDoc(collection(db, COL), data);
    return { id: ref.id, ...data };
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COL, id));
  },
};
