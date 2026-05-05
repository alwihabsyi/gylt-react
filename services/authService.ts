import { UserData } from "@/types/user";
import { formatDateTime } from "@/utils/formatter";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase/config";

export const authService = {
  async signUp(
    email: string,
    password: string,
    fullName: string,
  ): Promise<User> {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", result.user.uid), {
      fullName,
      email,
      createdAt: formatDateTime(new Date()),
    });

    return result.user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  async signOut(): Promise<void> {
    await signOut(auth);
  },

  async userData(id: string): Promise<UserData> {
    const result = await getDoc(doc(db, "users", id));

    if (!result.exists()) throw new Error("User not found");
    const data = result.data();
    return { id, fullName: data.fullName, email: data.email, createdAt: data.createdAt };
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};
