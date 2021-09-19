import {getSavedTeambyId, getTeamProfile} from "./api.js";
import {NotifAdd} from "./notif.js";
import {saveForLater} from "./db.js";
const getSaveMain = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const profSavedBtn = document.getElementById("profSaved")
    const btnSave = document.getElementById("save");
    const backSaveBtn = document.getElementById("backSave");
    const backStandBtn = document.getElementById("backStand");
    if (isFromSaved) {
        // ambil artikel lalu tampilkan
        getSavedTeambyId()
            .then(()=>{
                profSavedBtn.style.display = 'none';
                backSaveBtn.style.display = 'block';
                backStandBtn.style.display = 'none';

            })
    } else {
        getSavedTeambyId()
            .then(()=>{
                profSavedBtn.style.display = 'block';
            })
            .catch(()=>{//api
                const item = getTeamProfile(); 
                    btnSave.onclick = function() {
                        console.log("Tombol FAB di klik.");
                        profSavedBtn.style.display = 'block';
                        btnSave.style.display = 'none';
                        item.then(function (profile) {
                            saveForLater(profile); //db.js
                            NotifAdd(profile.name); //notif.js
                        });

                    }
            })        
    } 
}
export default getSaveMain;