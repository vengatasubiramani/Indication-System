import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, ref, set, get, remove ,child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCtZEdZqxxM1i0WGV2-Xk84Qj9ZtTDDhcY",
  authDomain: "login-form-9c63b.firebaseapp.com",
  databaseURL: "https://login-form-9c63b-default-rtdb.firebaseio.com",
  projectId: "login-form-9c63b",
  storageBucket: "login-form-9c63b.appspot.com",
  messagingSenderId: "718323928178",
  appId: "1:718323928178:web:86380cd6dd3128786cc6eb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase()

const userEl = document.getElementById("name")
const emailEl = document.getElementById("email")
const passwordEl= document.getElementById("password")
const repasswordEl = document.getElementById("re_password")
const q1El = document.getElementById("q1");
const q2El = document.getElementById("q2");
const signupBtn = document.getElementById("signupbtn")

signupBtn.addEventListener('click',()=>{
  if(passwordEl.value === repasswordEl.value){
    set(ref(db, "Users/" + userEl.value),{
      name : userEl.value,
      password : passwordEl.value,
      email : emailEl.value,
      q1 : q1El.value,
      q2 : q2El.value
    }).then(alert("Sign Up successfully"))
    userEl.value = ""
    passwordEl.value =""
    repasswordEl.value = ""
    emailEl.value=""
    q1El.value = ""
    q2El.value = ""
  }else{
    alert("Password Mismatch")
  }
})
