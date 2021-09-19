function requestPermission() {    
    Notification.requestPermission()
        .then( result => {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            }
            else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
        });     
}
export {requestPermission as default};