function init() {
  setTimeout(renderLogin, 1300);
}

function renderLogin() {
  document.getElementById("login-container").innerHTML = `
    <div class="background">
        <header class="loginHeader">
            <div class="displayFlex">
                <p>Not a Join user?</p>
                <button>Sign Up</button>
            </div>
        </header>
        <div class="alignItems">
            <div class="loginContainer">
                <h1>Log in</h1>
                <form onsubmit="register(); return false;">
                    <input required type="email" id="email" placeholder="Email">
                    <input required type="password" id="password" placeholder="Password">
                  </form>
                <div>
                    <input type="checkbox" name="Remember" id="remember"><label for="remember">Remember me</label>
                    <a href="#">I forgot my password</a>
                </div>
                <div>
                    <button id="registerBtn">Log in</button>
                    <button onclick="guestLogin()">Guest Log in</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

function guestLogin() {
  window.location.href = "./summary.html";
}
