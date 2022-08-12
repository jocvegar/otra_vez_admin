import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ref } from "vue";

const users = ref([]);

const getAllUsers = async () => {
  let userArr = [];
  const querySnapshot = await getDocs(collection(database, "users"));

  querySnapshot.forEach((doc) => {
    userArr.push(Object.assign({ id: doc.id }, doc.data()));
  });

  users.value = userArr;
  return users;
};

export function useUsers() {
  return {
    users,
    getAllUsers,
  };
}
