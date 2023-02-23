const CLIENT_ID = "83db17a602d24b0d8cee63fbb60038db";
const REDIRECT_URI = "http://localhost:3000/login/login.html";
const ACCESS_TOKEN = "accessToken";
const APP_URL= "http://localhost:3000";
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read"

const authorizeUser =()=>{
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${scopes}&redirect_uri=${REDIRECT_URI}&show_dialog=true`
    window.open( url , "login", "height=600, widht=600");
}

document.addEventListener("DOMContentLoaded", ()=>{
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", authorizeUser);
})

window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("tokenType", tokenType);
    localStorage.setItem("expiresIn", (Date.now() + (expiresIn * 1000)));
    window.location.href = APP_URL;
}

window.addEventListener("load", () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }

    if (window.opener !== null && !window.opener.closed) {

        window.focus();
        if (window.location.href.includes("error")) {
            window.close();
        }

        const { hash } = window.location;
        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");

        // #access_token = BQCpXqx_mZoHhCEIoAGbjxJqIG - QSlTm6zyM_zN6dqZhpvXxYGfF7ZKeLQd9dM3NX5QvJmQ1ovlOVGrsAw_vrURimONPMfRhn2J - mZXWlhnNVTZAcxvULe3YMNZZGhmr - PaZVpfBYDUbnsfQ9KFiFzFttfElKp - xwchWrbkoB8rf6_ggOLntd6jo0iUVMgz_FgFWAFbKffJHmspKCUzWS03NrTEdsXlKTBBiIQ & token_type=Bearer & expires_in=3600

        const tokenType = searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");
        if (accessToken) {
            window.close();
            window.opener.setItemsInLocalStorage({ accessToken, tokenType, expiresIn });
        } else {
            window.close();
        }
    }
})