let contacts = [];
let isAddingContact = false; // Flag für den Kontakt-Hinzufügen-Modus

window.addEventListener('load', load);


function render() {
    let mycontact = document.getElementById('mycontact'); /* Zugriff Div */
    mycontact.innerHTML = ''; /* Inhalt leeren */

    if (isAddingContact) {
        mycontact.innerHTML = contactTemplate(); // Kontaktformular anzeigen
    } else {
        for (let i = 0; i < contacts.length; i++) {
            mycontact.innerHTML += `
            <div class="rendercontact">
                <b onclick="contact()">${contacts[i].name}</b>
                <a href="">${contacts[i].email}</a>
                <button onclick="deletecontact(${i})">x</button>
            </div>
            `;
        }
    }

    document.getElementById('name').value = ''; /* Leeren von Input */
    document.getElementById('email').value = ''; /* Leeren von Input */
    document.getElementById('phone').value = ''; /* Leeren von Input */
}

function addContact() { // Funktion 1 aufgerufen durch onclick
    isAddingContact = true; // Flag setzen
    render(); // Ansicht aktualisieren
}

function contact(i) { // Funktion 2 aufgerufen durch Funktion 1
    let mycontact = document.getElementById('mycontact'); /* Zugriff Div */
    mycontact.innerHTML = ''; /* Inhalt leeren */

    mycontact.innerHTML += `

        <div class="rendercontact">
        <b onclick="contact()">${contacts[i].name}</b>
        <a href="">${contacts[i].email}</a>
        <button onclick="deletecontact(${i})">x</button>
        </div>`
}

function contactTemplate() {
    return `
    <div class="add">
        <div class="container">
            <div class="addcontainer">
                <div class="betterteam">
                    <img src="./img/join.png" alt="join">
                    <h1>Add contact</h1>
                    Tasks are better with a team!
                    <div class="line2"></div>
                </div>
                <div class="inputcointainer">
                    <div class="close" onclick="cancelContact()">x</div>
                    <div class="input">
                        <div>
                            <img src="./img/user.png" alt="user">
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

function cancelContact() {
    isAddingContact = false; // Flag zurücksetzen
    render(); // Ansicht aktualisieren
}

// Restlicher Code bleibt unverändert


function addNotiz() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    
    let contact = { name, email, phone }; // Erzeugen eines Kontaktobjekts
    contacts.push(contact);

     // Sortiere die Kontakte alphabetisch nach dem Namen
     contacts.sort((a, b) => a.name.localeCompare(b.name));

    isAddingContact = false;
    render();
    save();
}

function save(){
    let contactAsText = JSON.stringify(contacts); /* erster Schritt für Localstorage*/
    localStorage.setItem('contacts', contactAsText); /* names ist Key und namesAsText Value*/
}

function load() {
    let contactAsText = localStorage.getItem('contacts');
    if (contactAsText) {
        contacts = JSON.parse(contactAsText);
    } else {
        contacts = []; // Falls keine Daten vorhanden sind, leeres Array erstellen
    }
    render(); // Zeige die geladenen Kontakte auf der Seite an
}

function deletecontact(i) {
    contacts.splice(i, 1);
    save(); // Speichere die aktualisierten Kontakte im Local Storage
    render(); // Zeige die aktualisierten Kontakte auf der Seite an
}
