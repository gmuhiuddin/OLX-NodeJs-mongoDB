import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore, getDocs, setDoc, getDoc, collection, addDoc, query, doc, where, onSnapshot, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRoL0wtWFQpsLsOR51GvN3nCgoX8IEzgY",
  authDomain: "olx-clone-b4869.firebaseapp.com",
  projectId: "olx-clone-b4869",
  storageBucket: "olx-clone-b4869.appspot.com",
  messagingSenderId: "517440342860",
  appId: "1:517440342860:web:0db7f06a31809991b61de9",
  measurementId: "G-WNG1M7XXGW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const getDateFromDb = async (id) => {
  if (id) {

    const res = await fetch(`https://olx-clone-api.up.railway.app/products/${id}`)
    const result = await res.json();

    return result.data;
  }
  else {
    const res = await fetch('https://olx-clone-api.up.railway.app/products');
    const result = await res.json();

    return result;
  }
};

const getUserInfo = async (id) => {
  const userInfoRes = await fetch(`https://olx-clone-api.up.railway.app/userinfo/${id}`);
  const resultOfUserInfo = await userInfoRes.json();

  return resultOfUserInfo;
};

const login = async (email, password) => {

  const res = await fetch(`https://olx-clone-api.up.railway.app/user/login/${email}/${password}`);
  const result = await res.json();

  if (result.data) {
    const userInfoRes = await getUserInfo(result.data._id);

    return userInfoRes;
  };

  return result;
};

const signUp = async (name, fatherName, email, password) => {

  const res = await fetch('https://olx-clone-api.up.railway.app/user/signup', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        email,
        password
      }
    )
  });
  const result = await res.json();

  const userInfoRes = await fetch('https://olx-clone-api.up.railway.app/userinfo/post', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        firstname: name,
        lastname: fatherName,
        userEmail: email,
        userImg: "",
        cartsIdForBasket: [],
        _id: result.uid,
        password
      }
    )
  });

  const resultOfUserInfo = await userInfoRes.json();

  return resultOfUserInfo;
};

const getProductId = async () => {
  const res = await fetch('https://olx-clone-api.up.railway.app/productid');
  const productId = await res.json();

  return productId.data.productId;
};

const updateProductId = async (id) => {
  await fetch(`https://olx-clone-api.up.railway.app/productid/put/${id}`);
};

const addMultiImagesInDatabase = async (image, imageNum) => {

  const productId = await getProductId();

  let storageRef = ref(storage, `productImages/${imageNum}/${productId}`);

  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
};

const addImageInDatabase = async (image) => {
  const productId = await getProductId();

  const res = await fetch(`https://olx-clone-api.up.railway.app/imgtourl/${image}`);
const data = await res.json()
console.log(data);
  return 'url';
};

const addDateForAdds = async (addInfo, userId) => {

  const productId = await getProductId();

  const discountPercentage = Math.round(Math.random() * 35);
  const rating = Math.floor(Math.random() * 5);

  const userData = await getDoc(doc(db, 'userInfo', userId));

  const obj = {
    ...addInfo,
    discountPercentage: discountPercentage,
    rating: rating,
    ...userData.data(),
    userId: userData.id,
    productId
  };

  await fetch('https://olx-clone-api.up.railway.app/products/post', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });

  await updateProductId(productId + 1);
};

const addUserMsg = async (msgInfo) => {

  await addDoc(collection(db, 'usersChats'), {
    ...msgInfo,
    time: serverTimestamp()
  });

};

const getUsersMsg = async (chatId) => {

  const msgRef = query(collection(db, 'usersChats'), orderBy("time"), where("chatId", "==", chatId));

  const abc = new Promise((resolve, reject) => {
    onSnapshot(msgRef, (data) => {

      if (data.empty) {
        reject('on Chats')
      } else {
        resolve(data.docs)
      }
    })

  })

  return abc;
};

const resetPass = async (email) => {
  const res = sendPasswordResetEmail(auth, email);

  return res;
};

const getDataOfAddToCart = async (userId) => {
  const res = await getUserInfo(userId);

  return res.data.cartsIdForBasket;
};

const addToCart = async (id, userId) => {
  const res = await getDataOfAddToCart(userId);

  let idIsAlreadyExist = false;

  const cartsIds = [...res];

  for (let i = 0; i < cartsIds.length; i++) {
    if (cartsIds[i] == id) {
      idIsAlreadyExist = true;
      break;
    };
  };

  if (!idIsAlreadyExist) {
    cartsIds.push(id);
  };

  await fetch(`https://olx-clone-api.up.railway.app/userinfo/put/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        cartsIdForBasket: cartsIds
      }
    )
  });
};

const removeFromCart = async (id, userId) => {

  const res = await getDataOfAddToCart(userId);

  const cartIndex = res.indexOf(id);

  const cartsIds = [...res];

  cartsIds.splice(cartIndex, 1);

  await fetch(`https://olx-clone-api.up.railway.app/userinfo/put/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        cartsIdForBasket: cartsIds
      }
    )
  });

};

export { getDateFromDb, login, signUp, addDateForAdds, getUsersMsg, addImageInDatabase, addUserMsg, resetPass, addMultiImagesInDatabase, addToCart, removeFromCart, getDataOfAddToCart };