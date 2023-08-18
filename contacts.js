
let notiz = [];
let thema = []; /* Array */


function render(){
 let myposts = document.getElementById('myposts'); /* Zugriff */
    myposts.innerHTML = ''; /* inhalt leeren*/
    for (let i = 0; i < notiz.length; i++) { /* schleife um Array abzurufen*/
        myposts.innerHTML += `
        <div class="post">
            <b>Notiz: ${thema [i]}
        </div> 
        <button onclick="deleteNotiz(${i})">Löschen</button>
        `;
    }
    document.getElementById('thema').value = ''; /* leeren von Input*/
    
}

function addNotiz() {
    let name = document.getElementById('thema').value; 
    thema.push(name);

    render();
    save();
}

function deleteNotiz(i) {
    thema.splice(i,1);
    render();
    save();
}

function save(){
    let themaAsText = JSON.stringify(thema); /* erster Schritt für Localstorage*/

    localStorage.setItem('thema', themaAsText); /* names ist Key und namesAsText Value*/
    window.location.href = './contacts'

}

function load(){
    let themaAsText = localStorage.getItem('thema');
    if(themaAsText && notizAsText){
        thema = JSON.parse(themaAsText); 
    } 
    render();
}

