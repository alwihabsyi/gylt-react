import { UserData } from "@/types/user";
import { formatDateTime } from "@/utils/formatter";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase/config";

export type UpdateProfilePayload = {
  fullName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
};

export const authService = {
  async signUp(email: string, password: string, fullName: string): Promise<User> {
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

  async updateProfile(payload: UpdateProfilePayload): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("Not authenticated");

    // Re-auth is required by Firebase before sensitive changes
    if (payload.currentPassword) {
      const credential = EmailAuthProvider.credential(user.email, payload.currentPassword);
      await reauthenticateWithCredential(user, credential);
    }

    const firestoreUpdates: Record<string, string> = {};

    if (payload.fullName) {
      firestoreUpdates.fullName = payload.fullName;
    }

    if (payload.email && payload.email !== user.email) {
      await updateEmail(user, payload.email);
      firestoreUpdates.email = payload.email;
    }

    if (payload.newPassword) {
      await updatePassword(user, payload.newPassword);
    }

    if (Object.keys(firestoreUpdates).length > 0) {
      await updateDoc(doc(db, "users", user.uid), firestoreUpdates);
    }
  },

  async deleteAccount(password: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("Not authenticated");

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user);
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};