let users = [];

async function start() {
  loadUsers();
}

function login() {
  let email = document.getElementById("email"); // Eingabe von Login
  let password = document.getElementById("password"); // Eingabe von Login
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  ); // Vergleich von Login und Register
  if (user) {
    let userId = users.findIndex((u) => u.email == email.value);
    localStorage.setItem("activeID", userId);
    window.location.href = "./summary.html"; // Weiterleitung zum Summary
    alert("Passwort korrekt");
  } else {
    alert("Falsches Passwort");
  }
}

async function loadUsers() {
  // User laden
  try {
    users = JSON.parse(await getItem("users")); // Items als json laden
  } catch (e) {
    console.error("Loading error:", e); // Falls Users nicht gefunden
    alert("User nicht gefunden");
  }
}
