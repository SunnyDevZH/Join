let users = []; // Array Users


async function init(){
    loadUsers();
}

async function loadUsers(){ // User laden
    try {
        users = JSON.parse(await getItem('users')); // Items als json laden
    } catch(e){
        console.error('Loading error:', e); // Falls Users nicht gefunden
        alert('User nicht gefunden')
    }
}


async function register() { // Registrieren
    registerBtn.disabled = true; // Button aus
    users.push({ // email und passwort in Array user pushen
        name: name.value,
        email: email.value,
        password: password.value,

    });
    await setItem('users', JSON.stringify(users)); // Daten von Users auf Server laden 
    window.location.href = './login.html' // Weiterleitung zum Login
    resetForm();
    
}

function resetForm() {
    email.value = ''; // Feld leeren
    password.value = ''; // Feld leeren
    registerBtn.disabled = false; // Button an
}