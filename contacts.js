
let contacts= [];

function render(){
 let mycontact = document.getElementById('mycontact'); /* Zugriff Div */

 mycontact.innerHTML = ''; /* inhalt leeren*/

 for (let i = 0; i < contacts.length; i++) {
    mycontact.innerHTML += `
    <div>
        <b>Kontakt: ${contacts[i].name}</b>
        <p>Email: ${contacts[i].email}</p>
        <p>Telefon: ${contacts[i].phone}</p>
        <button onclick="deletecontact(${i})">Löschen</button>
    </div>
`;

 }
        document.getElementById('name').value = ''; /* leeren von Input*/
        document.getElementById('email').value = ''; /* leeren von Input*/
        document.getElementById('phone').value = ''; /* leeren von Input*/
}

function addContact() { // Funktion 1 aufgerufen durch onclick
    document.getElementById('addcontact').innerHTML = contactTemplate(); // Zugriff auf Div Dialog

}

function contactTemplate() { // Funktion 2 aufgerufen durch Funktion 1
    return `

    <div>
        <div class="input">
            <input id="name" placeholder="Name" type="text" />
            <input id="email" placeholder="Email" type="text" />
            <input id="phone" placeholder="Phone" type="text" />
        </div>
        <div class="addbutton">
            <button onclick="window.location.href= './contacts.html';">Cancel X</button>
            <button onclick="addNotiz()">Create contact</button>
        </div>
    </div> `;
}

function addNotiz() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    
    let contact = { name, email, phone }; // Erzeugen eines Kontaktobjekts
    contacts.push(contact);
    render();
    save();
}

function deletecontact(i) {
    contacts.splice(i,1);
    render();
    save();
}

function save(){
    let contactAsText = JSON.stringify(contacts); /* erster Schritt für Localstorage*/
    localStorage.setItem('contacts', contactAsText); /* names ist Key und namesAsText Value*/
}

function load(){
    let contactAsText = localStorage.getItem('contacts');
    if (contactAsText) {
        contacts = JSON.parse(contactAsText);
    } else {
        contacts = []; // Falls keine Daten vorhanden sind, leeres Array erstellen
    }
}



