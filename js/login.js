try {
  let users = [];
} catch {}

localStorage.setItem("activeID", -1);

function start() {
  loadUsers();
}

// Login mit Passwortvergleich //

function login() {
  let email = document.getElementById("email"); // Eingabe von Login
  let password = document.getElementById("password"); // Eingabe von Login
  let user = users.find((u) => u.email == email.value && u.password == password.value); // Vergleich von Login und Register
  if (user) {
    userId = users.findIndex((u) => u.email == email.value);
    localStorage.setItem("activeID", userId);
    window.location.href = "./summary.html"; // Weiterleitung zum Summary
  } else {

    var messageContainer = document.getElementById("message2");

    messageContainer.style.display = "block"; // Stellen Sie sicher, dass das Nachrichtencontainer sichtbar ist

      var messageElement = document.createElement("p");
      messageElement.textContent = "Falsches Passwort oder Benutzer.";
      messageContainer.innerHTML = ""; // Löschen Sie den vorherigen Inhalt, falls vorhanden
      messageContainer.appendChild(messageElement);
  
    return;
  }
}

// User laden //

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users")); // Items als json laden
  } catch (e) {
    console.error("Loading error:", e); // Falls Users nicht gefunden
    alert("User nicht gefunden");
  }
}
