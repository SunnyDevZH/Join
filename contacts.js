
let notiz = [];
let thema = []; /* Array */


function render(){
 let myposts = document.getElementById('myposts'); /* Zugriff */
    myposts.innerHTML = ''; /* inhalt leeren*/
    for (let i = 0; i < notiz.length; i++) { /* schleife um Array abzurufen*/
        myposts.innerHTML += `
        <div class="post">
            <b>Notiz: ${thema [i]}
            ${notiz[i]} 
        </div> 
        <button onclick="deleteNotiz(${i})">Löschen</button>
        `;
    }
    document.getElementById('notiz').value = '';
    document.getElementById('thema').value = ''; /* leeren von Input*/
    
}

function addNotiz() {
    let text = document.getElementById('notiz').value; /* input wird geholt mit message*/
    let name = document.getElementById('thema').value; 
    notiz.push(text); /* text wird in Array gepusht*/
    thema.push(name);

    render();
    save();
}

function deleteNotiz(i) {
    thema.splice(i,1);
    notiz.splice(i,1);
    render();
    save();
}

function save(){
    let themaAsText = JSON.stringify(thema); /* erster Schritt für Localstorage*/
    let notizAsText = JSON.stringify(notiz); 

    localStorage.setItem('thema', themaAsText); /* names ist Key und namesAsText Value*/
    localStorage.setItem('notiz', notizAsText); 
}

function load(){
    let themaAsText = localStorage.getItem('thema');
    let notizAsText = localStorage.getItem('notiz');
    if(themaAsText && notizAsText){
        thema = JSON.parse(themaAsText); 
        notiz = JSON.parse(notizAsText);
    } 
    render();
}

