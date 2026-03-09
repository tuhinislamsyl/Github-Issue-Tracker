document.getElementById("sign-in-btn").addEventListener("click", function () {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    if (username == "admin" && password == "admin123") {
        alert("Login success");
        window.location.assign("main.html");
    }
    else {
        alert("Login Failed");
        return;
    }
});