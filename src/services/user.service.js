import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";

import { ref } from "vue";

const users = ref([]);

const getAllUsers = async () => {
  let userArr = [];
  const querySnapshot = await getDocs(
    query(collection(db, "users"), orderBy("first_name", "asc"))
  );

  querySnapshot.forEach((doc) => {
    userArr.push(Object.assign({ id: doc.id }, doc.data()));
  });

  users.value = userArr;
  return users;
};

const addUser = async (user) => {
  const docRef = await addDoc(collection(db, "users"), {
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    address: user.address,
    department: user.department,
    created_at: user.created_at,
  });
  console.log("Document written with ID: ", docRef.id);
};

export function useUsers() {
  return {
    users,
    addUser,
    getAllUsers,
  };
}
