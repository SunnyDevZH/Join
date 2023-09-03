let addContacts = [];

window.addEventListener("load", load);

// Kontakt anzeigen //

function renderContacts() {
  let mycontact = document.getElementById("mycontact");
  mycontact.innerHTML = "";

  // Sortiere die Kontakte alphabetisch nach dem Namen
  addContacts.sort((a, b) => a.name.localeCompare(b.name));

  let currentLetter = null;

  for (let i = 0; i < addContacts.length; i++) {
    const contact = addContacts[i];

    const firstLetter = contact.name[0];

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      mycontact.innerHTML += `<div class="alphabet-group">${currentLetter}</div>`;
    }

    mycontact.innerHTML += `
            
            <div onclick="currentcontact(${i}); selectContact(this);" class="rendercontact">
                <div class="circle" style="background-color: ${contact.color}">
                    <span class="initials">${contact.name.substring(0,2)}</span>
                </div>
                <div class="flex-direction">
                    <div>
                        <b>${contact.name}</b>
                    </div>
                    <div>
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                </div>
            </div>`;
  }
}

// aktueller Kontakt anzeigen //

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
  contactContainer.innerHTML = contactTemplate(); 
}

function contactTemplate() {
  return `
    <div id="add" class="add">
        <div class="container">
            <div class="addcontainer">
                <div class="betterteam">
                    <img src="./img/join.png" alt="join">
                    <h1>Add contact</h1>
                    <p>Tasks are better with a team!</p>
                    <div class="line2"></div>
                </div>
                <div class="inputcointainer">
                    <div class="close" onclick="cancelContact('add')">x</div>
                    <div class="input">
                        <div>
                            <img class="displaynone1" src="./img/user.png" alt="user" style="width: 120px;">
                        </div>
                        <div>
                            <div class="inputsytle">
                                <div class="displayflex">
                                    <input required type="text" id="name" placeholder="Name">
                                    <img class="loginimg" src="./img/name.png" alt="name" width="30px"> 
                                </div>
                                <div class="displayflex">
                                    <input required type="email" id="email" placeholder="Email">
                                    <img class="loginimg" src="./img/mail.png" alt="mail" width="25px"> 
                                </div>
                                <div class="displayflex">
                                    <input required type="number" id="phone" placeholder="Phone">
                                    <img class="loginimg" src="./img/tel.png" alt="mail" width="30px"> 
                                </div>
                            </div>
                            <div class="buttonfield">
                                <button onclick="cancelContact('add')">Cancel</button>
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
  <div id="edit${i}" class="add">
        <div class="container">
            <div class="addcontainer">
                <div class="betterteam">
                    <img src="./img/join.png" alt="join">
                    <h1>Edit contacts</h1>
                    <div class="line2"></div>
                </div>
                <div class="inputcointainer">
                    <div class="close" onclick="cancelContact('edit${i}')">x</div>
                    <div class="input">
                        <div>
                          <div class="circle" style="background-color: ${addContacts[i].color}">
                            <span class="initials">${addContacts[i].name.substring(0,2)}</span>
                          </div>
                        </div>
                        <div>
                            <div class="inputsytle">
                                <div class="displayflex">
                                    <input required type="text" id="name" value="${addContacts[i].name}">
                                    <img class="loginimg" src="./img/name.png" alt="name" width="30px"> 
                                </div>
                                <div class="displayflex">
                                    <input required type="email" id="email" value="${addContacts[i].email}">
                                    <img class="loginimg" src="./img/mail.png" alt="mail" width="25px"> 
                                </div>
                                <div class="displayflex">
                                    <input required type="number" id="phone" value="${addContacts[i].phone}">
                                    <img class="loginimg" src="./img/tel.png" alt="mail" width="30px"> 
                                </div>
                            </div>
                            <div class="buttonfield">
                                <button onclick="deletecontact(${i})">Delete </button>
                                <button class="createButton" onclick="edit(${i})">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div> `;

}

// Zurück //

function cancelContact(elementId) {
    const contactElement = document.getElementById(elementId);
    if (contactElement) {
      contactElement.style.display = "none";
    }
  }

// Kontakt hinzufügen //

async function addNotiz() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value; // Hier wird die Telefonnummer abgerufen
  
    let color = getRandomColor();
  
    if (contactExists(name)) {
      alert("Ein Kontakt mit diesem Namen existiert bereits.");
      return;
    }
  
    let contact = { name, email, phone, color };
    addContacts.push(contact);
  
    await setItem("addContacts", JSON.stringify(addContacts));
  
    renderContacts();
    window.location.href = "contacts.html";
}
  

function contactExists(name) {
    return addContacts.some(contact => contact.name === name);
  }

// Kontakt bearbeiten //

async function edit(i) {
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
  
    const color = getRandomColor(); // Zufällige Farbe generieren

    if (contactExists(name)) {
        alert("Ein Kontakt mit diesem Namen existiert bereits.");
        return;
    }
  
    const editedContact = { name, email, phone, color }; // Aktualisierte Kontaktinformationen
  
    // Überschreibe den Kontakt im Array mit den bearbeiteten Informationen
    addContacts[i] = editedContact;
  
    await setItem("addContacts", JSON.stringify(addContacts)); // Speichern der aktualisierten Kontakte auf dem Server
  
    renderContacts();
    window.location.href = "contacts.html";
}  

// Kontakt laden //

async function load() {
  try {
    addContacts = JSON.parse(await getItem("addContacts")); // Items als json laden
  } catch (e) {
    console.error("Loading error:", e); // Falls Users nicht gefunden
    alert("Kontakt nicht gefunden");
  }
  renderContacts();
}

// Kontakt löschen //

async function deletecontact(i) {
  addContacts.splice(i, 1);
  await setItem("addContacts", JSON.stringify(addContacts));
  renderContacts(); // Zeige die aktualisierten Kontakte auf der Seite an
  window.location.href = "./contacts.html";
}

// Farbe generieren //

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // Zufälliger Farbwert zwischen 0 und 359
  const saturation = Math.floor(Math.random() * 50) + 50; // Sättigung zwischen 50 und 100
  const lightness = Math.floor(Math.random() * 20) + 40; // Helligkeit zwischen 40 und 60

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Auswahl markieren //

let selectedContact = null;

function selectContact(contactElement) {
  if (selectedContact !== null) {
    selectedContact.classList.remove("selected");
  }

  selectedContact = contactElement;
  selectedContact.classList.add("selected");
}