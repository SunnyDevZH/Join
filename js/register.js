let users = []; // Array Users

let colorArray = [];

async function init() {
  loadUsers();
  generateRandomColor();
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

async function register() {
  // Registrieren

  let names = document.getElementById("names").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let contact = {
    names: names,
    email: email,
    password: password,
    color: generateRandomColor(),
  };

  users.push(contact);

  await setItem("users", JSON.stringify(users)); // Daten von Users auf Server laden
  window.location.href = "./login.html"; // Weiterleitung zum Login
  resetForm();
}

function resetForm() {
  email.value = ""; // Feld leeren
  password.value = ""; // Feld leeren
}

function generateRandomColor() {
  const colorCode =
    "#" +
    Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, "0");
  colorArray.push(colorCode);
  return colorCode;
}
