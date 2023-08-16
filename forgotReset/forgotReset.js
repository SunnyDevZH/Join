
async function newRegister() { // Registrieren
    users.push({ // email und passwort in Array user pushen
        password: password.value,
    });
    await setItem('users', JSON.stringify(users)); // Daten von Users auf Server laden 
    window.location.href = 'login.html?msg= Du hast dich erfolgreich registriert' // Weiterleitung zum Login
    resetForm();
    
}

function resetForm() {
    password.value = ''; // Feld leeren
}