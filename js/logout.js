

const logOut =document.getElementById("logout");
console.log("YES");
logOut.addEventListener('click',logout);

function logout(e){
    console.log("YES");
    e.preventDefault();

    localStorage.clear();
    setTimeout(()=>{
        window.location="register.html";
    },1500);

}

