import {getSavedTeams, getTeams, getMatche} from "./api.js";
const nav = () =>{
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);
    function loadPage  (page){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState === 4){
                const content = document.querySelector("#body-content");
                if(this.status === 200){
                    window.scrollTo(0,0);
                    content.innerHTML = xhttp.responseText;
                    if (page === "savedTeams")
                        getSavedTeams();
                    else if (page === "standings"){
                        const button = document.querySelector('.btn')
                        button.addEventListener('click', function(){
                            const choose = document.querySelector('input[name="group1"]:checked').value;
                            getTeams(choose)
                        })
                    }
                    else if (page === "matches"){
                        const button = document.querySelector('.btn')
                        const dateFrom = document.getElementById("dateF")
                        const dateTo = document.getElementById("dateT")
                        button.addEventListener('click', function() {
                            getMatche(dateFrom.value, dateTo.value)
                        })                        
                    }
                }
                else{
                    loadPage("404")
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
    function loadNav (){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if (this.readyState === 4) {
                if (this.status !== 200) return;
                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });
        
            // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", function(event) {
                    // Tutup sidenav
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
        
                    // Muat konten halaman yang dipanggil
                    const page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
}
export default nav;