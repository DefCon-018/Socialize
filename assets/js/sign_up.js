let login = document.getElementById('login');
let register= document.getElementById('register');
let btn = document.querySelector('.btn');
let loginBtn = document.getElementById('btn-login');
let signupBtn = document.getElementById('btn-signup');

function handleRegister(){
    register.style.left = "100px";
    login.style.left = "-550px";
    btn.style.left= "50%"
    btn.style.right = "0px"
    signupBtn.style.color= "white";
    loginBtn.style.color = "blue"
}

function handleLogin(){
    register.style.left = "560px";
    login.style.left = '100px';
    btn.style.left = "0px";
    loginBtn.style.color = "white";
    signupBtn.style.color = "blue";
}