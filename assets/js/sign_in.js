let login = document.getElementById('login');
let register= document.getElementById('register');

let loginBtn = document.getElementById('btn-login');
let signupBtn = document.getElementById('btn-signup');

function handleRegister(){
    register.style.left = "57px";
    login.style.left = '-620px';
    signupBtn.style.borderBottomColor ='blue';
    signupBtn.style.borderBottomWidth= "4px";
    signupBtn.style.borderBlockEndStyle = "solid"
    loginBtn.style.borderBottom = "3px solid lightgray";
    signupBtn.style.color= "blue";
    loginBtn.style.color= "gray";
}

function handleLogin(){
    register.style.left = "750px";
    login.style.left = '57px';
    loginBtn.style.borderBottomColor ='blue';
    loginBtn.style.borderBottomWidth= "4px";
    loginBtn.style.borderBlockEndStyle = "solid"
    signupBtn.style.borderBottom = "3px solid lightgray";
    loginBtn.style.color= "blue";
    signupBtn.style.color= "gray";
}