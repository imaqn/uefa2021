import requestPermission from "./js/notifPermiss.js";
import registerServiceWorker from "./js/registSW.js";
import nav from "./js/nav.js"
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
}
 else {
    registerServiceWorker();
}
if ('Notification' in window)
    requestPermission();
else
    console.log("browser tidak mendukung notifikasi")
document.addEventListener("DOMContentLoaded", nav)