import registerServiceWorker from "./js/registSW.js";
import getSaveMain from "./js/getSavedMain.js";
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
}
 else {
    registerServiceWorker();
}
document.addEventListener("DOMContentLoaded", getSaveMain)