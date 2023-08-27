async function start() {
  loadUserInformation();
  loadUsers();
  localStorage.setItem("activeID", -1);
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

function save() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("names").value;

  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  localStorage.setItem("names", name);
}

function loadUserInformation() {
  let getemail = localStorage.getItem("email");
  let getpassword = localStorage.getItem("password");

  document.getElementById("email").value = getemail;
  document.getElementById("password").value = getpassword;
}
