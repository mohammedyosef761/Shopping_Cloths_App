let userInfo =  document.querySelector("#username");
let password =  document.querySelector("#password");
let loginBtn =  document.querySelector("#sign_in");


let getUser    =localStorage.getItem('username');
let getpassword=localStorage.getItem('password');

loginBtn.addEventListener('click',login);

function login(e){
        e.preventDefault();
        if(username.value === "" ||password.value ===""){
            alert("please fill data");
        }
        else{
           if((getUser && getUser.trim() ===username.value.trim()) && (getpassword &&getpassword===password.value.trim() ) ){
              window.location="index.html"
           }
           else{
               console.log("no user");
           };
       
        }
    
    }













