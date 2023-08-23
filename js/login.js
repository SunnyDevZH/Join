
async function init(){
    loadUserInformation()
}

function login(){ 
    let email = document.getElementById('email'); // Eingabe von Login
    let password = document.getElementById('password') // Eingabe von Login
    let user = users.find(u => u.email == email.value && u.password == password.value); // Vergleich von Login und Register 
    console.log(user);
    if(user){
        window.location.href = './summary.html' // Weiterleitung zum Summary
        alert('Passwort korrekt')
    } else{
        alert('Falsches Passwort');
    }
}

// Local Storage für Remember me hacken

function save(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let remember = document.getElementById('remember').checked;

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);     
}

function loadUserInformation(){
    let getemail= localStorage.getItem('email');
    let getpassword = localStorage.getItem('password');
    
    document.getElementById('email').value = getemail;
    document.getElementById('password').value = getpassword;
}

window.onload = function() {
    let remember = localStorage.getItem('remember');
    if (remember === 'true') {
        load();
        document.getElementById('remember').checked = true;
    }
}
