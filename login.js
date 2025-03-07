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

const userEl = document.getElementById("username")
const passwordEl = document.getElementById("password")
const loginBtn = document.getElementById("loginbtn")

loginBtn.addEventListener('click',()=>{
    console.log(userEl.value)
    console.log(passwordEl.value)
    const dbRef = ref(db)
    get(child(dbRef, 'Users/' + userEl.value)).then((snapshot) =>{
        if(snapshot.exists()){
            const userdb = snapshot.val().name
            const passwordDb = snapshot.val().password
            const email = snapshot.val().email
            const q1 = snapshot.val().q1
            const q2 = snapshot.val().q2
            console.log(userdb)
            console.log(passwordDb)
            checkData(userdb,passwordDb,email,q1,q2)
        }
    })
})
function sendEmail(email,userdb){
    var templateParams = {
        email: email,
        to_name: userdb,
        message: "We have detected unauthorized access attempts to your account. Please review your account activity for any suspicious behaviour."
    };

    emailjs.send('service_z8roc58', 'template_hq4ryaz', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            window.alert("Sent successfully!");
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            window.alert("Failed to send email.");
        });
}
let otp;
function sendOTP(email,userdb) {
   
    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('username');
    let enteredEmail = urlParams.get('email');
    const emailError = document.getElementById('emailError');

    setTimeout(() => {
        otp = Math.floor(100000 + Math.random() * 900000);
        var templateParams = {
            email: email,
            to_name: userdb,
            message: `Your OTP is: ${otp}`
        };

        emailjs.send('service_z8roc58', 'template_hq4ryaz', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                window.alert("OTP Sent to email successfully!");
                renderOTP(otp);
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                window.alert("Failed to send otp to email.");
            });
    }, 1000);
    

}

function renderOTP(otp){
    const urlParams = new URLSearchParams({
       otp: otp,
   });
   window.location.href = 'otp.html?' + urlParams.toString();
}


function renderQuestion(q1,q2){
    const urlParams = new URLSearchParams({
        q1: q1,
        q2 : q2
    });
    window.location.href = 'question.html?' + urlParams.toString();
}

const urlParams = new URLSearchParams(window.location.search);
let loginAttempt = parseInt(urlParams.get('loginAttempt')) || 0;

function checkData(userdb, passwordDb, email, q1, q2) {
    

    if ((userEl.value === userdb) && (passwordEl.value === passwordDb)) {
        alert("login successfully!!");
    } else {
        loginAttempt++;
        if (loginAttempt == 1) {
            alert("Invalid Password");
            sendEmail(email, userdb);
        }
        if (loginAttempt == 2) {
            alert("Invalid Password");
            sendOTP(email, userdb);
        }
        if (loginAttempt == 3) {
            alert("Invalid Password");
            renderQuestion(q1, q2);
        }
    }
}