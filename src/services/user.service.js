import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { ref } from "vue";

const user = ref(null);
const users = ref([]);

const getAllUsers = () => {
  // let userArr = [];
  // const querySnapshot = await getDocs(
  //   query(collection(db, "users"), orderBy("first_name", "asc"))
  // );

  // querySnapshot.forEach((doc) => {
  //   userArr.push(Object.assign({ id: doc.id }, doc.data()));
  // });

  // users.value = userArr;
  // return users;

  const q = query(collection(db, "users"), orderBy("first_name", "asc"));
  onSnapshot(q, (querySnapshot) => {
    let userArr = [];
    querySnapshot.forEach((doc) => {
      userArr.push(Object.assign({ id: doc.id }, doc.data()));
    });
    users.value = userArr;
  });
  return users;
};

const findUser = async (userInfo = {}) => {
  const q = query(
    collection(db, "users"),
    where("first_name", "==", userInfo.first_name),
    where("last_name", "==", userInfo.last_name),
    where("phone", "==", userInfo.phone),
    where("department", "==", userInfo.department)
  );
  const querySnapshot = await getDocs(q);
  const resultArray = [];
  querySnapshot.forEach((doc) => {
    resultArray.push(Object.assign({ id: doc.id }, doc.data()));
  });
  user.value = resultArray.length > 0 ? resultArray[0] : null;
  return user;
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
    user,
    users,
    addUser,
    getAllUsers,
    findUser,
  };
}
