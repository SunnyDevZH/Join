try {
  let users = [];
} catch {}

async function init() {
  loadUsers();
  generateRandomColor();
}

// Registrieren //

async function register() {
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

// Form leeren //

function resetForm() {
  names.value = ""; // Feld leeren
  email.value = "";
  password.value = "";
}

// Farbe generieren //

function generateRandomColor() {
  const colorCode =
    "#" +
    Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, "0");
  return colorCode;
}

// User laden //

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e); // Falls Users nicht gefunden
    alert("User nicht gefunden");
  }
}

// Checkbox //

function checkBox() {
  var checkbox = document.getElementById("remember");

  if (checkbox.checked) {
    register();
  } else {
    alert("Bitte akzeptieren Sie die Bedingungen, um fortzufahren.");
  }
}
