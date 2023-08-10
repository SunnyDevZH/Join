function login(){ 
    let email = document.getElementById('email'); // Eingabe von Login
    let password = document.getElementById('password') // Eingabe von Login
    let user = users.find(u => u.email == email.value && u.password == password.value); // Vergleich von Login und Register 
    console.log(user);
    if(user){
        console.log('User gefunden') // Weiter leiten an Mainpage!
    } else{

    }
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

if(msg){
    msgBox.innerHTML = msg;
} else {
    // display:none;
}