let addContacts = [];

window.addEventListener("load", load);

function renderContacts() {
  let mycontact = document.getElementById("mycontact");
  mycontact.innerHTML = "";

  // Sortiere die Kontakte alphabetisch nach dem Namen
  addContacts.sort((a, b) => a.name.localeCompare(b.name));

  let currentLetter = null;

  for (let i = 0; i < addContacts.length; i++) {
    const contact = addContacts[i];

    const firstLetter = contact.name[0].toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      mycontact.innerHTML += `<div class="alphabet-group">${currentLetter}</div>`;
    }

    mycontact.innerHTML += `
            <div class="rendercontact">
                <div class="circle" style="background-color: ${contact.color}">
                    <span class="initials">${contact.name.substring(
                      0,
                      2
                    )}</span>
                </div>
                <div class="flex-direction">
                    <div>
                        <b onclick="currentcontact(${i})">${contact.name}</b>
                    </div>
                    <div>
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                </div>
            </div>`;
  }
}

// Kontakt anzeigen //

function currentcontact(i) {
  let currentcontactDiv = document.getElementById("currentcontact");
  currentcontactDiv.innerHTML = "";

  currentcontactDiv.innerHTML += `
        <div class="contactBoxOne">
            <div class="circle" style="background-color: ${addContacts[i].color}">
                <span class="initials">${addContacts[i].name.substring(0,2)}</span>
            </div>
            <div class="flex-direction">
                <div>
                    <b>${addContacts[i].name}</b>
                </div>
                <div class="edit">
                    <div>
                        <img onclick="deletecontact(${i})" src="./img/delete.png" alt="delete" width="100px">
                    </div>
                    <div>
                        <img onclick="editContainer(${i})" src="./img/edit.png" alt="edit" width="80px">
                    </div>
                </div>
            </div>
        </div>
        <div class="contactBox">
            <div>
                <b>Contact Information</b>
            </div>
            <div>
                <p>E-mail:</p>
                <a href="">${addContacts[i].email}</a>
            </div>
            <div>
                <p>Tel:</p>
                <p>${addContacts[i].phone}</p>
            </div>
        </div>`;
}


// Kontakt Hinzufügen //

function addContact() {
  let contactContainer = document.getElementById("contactContainer");
  contactContainer.innerHTML = contactTemplate(); // Hier wird das Kontaktformular gerendert
}

function contactTemplate() {
  return `
    <div class="add">
        <div class="container">
            <div class="addcontainer">
                <div class="betterteam">
                    <img src="./img/join.png" alt="join">
                    <h1>Add contact</h1>
                    <p>Tasks are better with a team!</p>
                    <div class="line2"></div>
                </div>
                <div class="inputcointainer">
                    <div class="close" onclick="cancelContact()">x</div>
                    <div class="input">
                        <div>
                            <img src="./img/user.png" alt="user" style="width: 120px;">
                        </div>
                        <div>
                            <div class="inputsytle">
                                <input id="name" placeholder="Name" type="text" />
                                <input id="email" placeholder="Email" type="text" />
                                <input id="phone" placeholder="Phone" type="text" />
                            </div>
                            <div class="buttonfield">
                                <button onclick="cancelContact()">Cancel X</button>
                                <button class="createButton" onclick="addNotiz()">Create contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div> `;
}

// Edit //

function editContainer(i) {
  let editContainer = document.getElementById("editContainer");
  editContainer.innerHTML = renderEdit(i);
}

function renderEdit(i) {

  return`
  <div class="add">
        <div class="container">
            <div class="addcontainer">
                <div class="betterteam">
                    <img src="./img/join.png" alt="join">
                    <h1>Edit contacts</h1>
                    <div class="line2"></div>
                </div>
                <div class="inputcointainer">
                    <div class="close" onclick="cancelContact()">x</div>
                    <div class="input">
                        <div>
                          <div class="circle" style="background-color: ${addContacts[i].color}">
                            <span class="initials">${addContacts[i].name.substring(0,2)}</span>
                          </div>
                        </div>
                        <div>
                            <div class="inputsytle">
                                <input id="name" placeholder="Name" type="text" />
                                <input id="email" placeholder="Email" type="email" />
                                <input id="phone" placeholder="Phone" type="number" />
                            </div>
                            <div class="buttonfield">
                                <button onclick="deletecontact(${i})">Delete </button>
                                <button class="createButton" onclick="edit()">Safe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div> `;

}


function cancelContact() {
  window.location.href = "contacts.html";
}

async function addNotiz() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  let color = getRandomColor(); // Zufällige Farbe generieren

  let contact = { name, email, phone, color }; // dem Kontakt hinzufügen
  addContacts.push(contact);

  await setItem("addContacts", JSON.stringify(addContacts)); // Daten von Users auf Server laden

  renderContacts();
  window.location.href = "contacts.html";
}

async function edit() {

  deletecontact();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  let color = getRandomColor(); // Zufällige Farbe generieren

  let contact = { name, email, phone, color }; // dem Kontakt hinzufügen
  addContacts.push(contact);

  await setItem("addContacts", JSON.stringify(addContacts)); // Daten von Users auf Server laden

  renderContacts();
  window.location.href = "contacts.html";
}

async function load() {
  try {
    addContacts = JSON.parse(await getItem("addContacts")); // Items als json laden
  } catch (e) {
    console.error("Loading error:", e); // Falls Users nicht gefunden
    alert("Kontakt nicht gefunden");
  }
  renderContacts();
}

async function deletecontact(i) {
  addContacts.splice(i, 1);
  await setItem("addContacts", JSON.stringify(addContacts));
  renderContacts(); // Zeige die aktualisierten Kontakte auf der Seite an
  window.location.href = "./contacts.html";
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // Zufälliger Farbwert zwischen 0 und 359
  const saturation = Math.floor(Math.random() * 50) + 50; // Sättigung zwischen 50 und 100
  const lightness = Math.floor(Math.random() * 20) + 40; // Helligkeit zwischen 40 und 60

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
