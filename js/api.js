import {getAll, getById, deleteProfile} from "./db.js";
const base_url = "https://api.football-data.org/v2/";
const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': "7c3c1c3506fc46aa92626229a82e71ba"
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};
function displayLoader(){
    let loader = "";
    loader += `
        <br><br><br>
        <div class="center">
            <div class="preloader-wrapper active">
                <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>`
    return loader;
}
function displayMatch(data, dateFrom, dateTo){
    const startDate = new Date(`${dateFrom}`)
    const endDate = new Date(`${dateTo}`)
    let resultMatches = data.matches.filter(function (a){
        let matchDate = new Date(a.utcDate);
        return matchDate >= startDate && matchDate <= endDate
    })

    let teamMatch = "";
    //jika tidak ada pertandingan, tampilkan card ini
    if(resultMatches.length === 0){
        teamMatch += `
        <div class="row center">
            <div class="col s12">
                <div class="card" id="card-bg">
                    <div class="card-content white-text">
                        <div class="row ">
                            <div class="col s12">
                            <span class="card-title">No Match</span>
                                <p><b>There is no match at that times</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    else{
        teamMatch += `
            <div class= "carousel carousel-slider" id="isi">
                    <div class="carousel-fixed-item center middle-indicator">
                        <div class="left">
                            <a class="movePrevCarousel waves-circle waves-effect waves-light red-text"><i class="material-icons" id="move">chevron_left</i></a>
                        </div>
                        
                        <div class="right">
                            <a class=" moveNextCarousel waves-circle waves-effect waves-light red-text"><i class="material-icons" id="move">chevron_right</i></a>
                        </div>
                    </div>`
        resultMatches.forEach(function(match){
            //custom date supaya formatnya bagus untuk dibaca
            let date = new Date(`${match.utcDate}`);
            const year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            if (dt < 10) 
                dt = '0' + dt;
            if (month < 10) 
                month = '0' + month;
            date = month + '-'+ dt +'-'+ year;

            //custom pemenang, supaya menampilkan nama tim, tidak hanya "away team" atau "home team"
            let win = "unknown";
            if (match.score.winner !== null)
                win = match.score.winner;
            if (win === "HOME_TEAM")
                win = match.homeTeam.name;
            else if (win === "AWAY_TEAM")
                win = match.awayTeam.name;
            
            let halfTimeHome = match.score.halfTime.homeTeam;
            if (halfTimeHome === null)
                halfTimeHome = '-'
            let halfTimeAway = match.score.halfTime.awayTeam;
            if (halfTimeAway === null)
                halfTimeAway = '-'  
            
            let fullTimeHome = match.score.fullTime.homeTeam;
            if (fullTimeHome === null)
                fullTimeHome = '-'
            let fullTimeAway = match.score.fullTime.awayTeam;
            if (fullTimeAway === null)
                fullTimeAway = '-' 
            
            //custom score selama adu penalti, supaya tidak null jika tidak ada penalti
            let penaltyHome = match.score.penalties.homeTeam;
            if (match.score.penalties.homeTeam === null)
                penaltyHome = '-'
            let penaltyAway = match.score.penalties.awayTeam;
            if (match.score.penalties.awayTeam === null)
                penaltyAway = '-'

            //custom score selama adu extra time, supaya tidak null jika tidak ada extra time
            let homeExtra = match.score.extraTime.homeTeam;
            if (match.score.extraTime.homeTeam === null)
                homeExtra = '-'
            let awayExtra = match.score.extraTime.awayTeam;
            if (match.score.extraTime.awayTeam === null)
                awayExtra = '-'
            
            //menata elemen ke dalam card
            teamMatch += `
                <div class="carousel-item">
                <div class="row center">
                <div class="col s12">
                    <div class="card" id="card-bg">
                        <div class="card-content white-text">
                            <table class="centered">
                                <tbody>
                                    <tr>
                                        <th>Match Date</th>
                                        <td colspan="2">${date}</td>
                                    </tr>
                                    <tr>
                                        <th>Stage</th>
                                        <td colspan="2">${match.stage}</td>
                                    </tr>
                                    <tr>
                                        <th>Duration</th>
                                        <td colspan="2">${match.score.duration}</td>
                                    </tr>
                                    <tr>
                                        <th>Winner</th>
                                        <td colspan="2">${win.toUpperCase()}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="centered">
                                <tbody>
                                    <tr>
                                        <td><strong style="font-size: 110%">${match.homeTeam.name.toUpperCase()}</strong></td>
                                        <td><strong style="font-size: 110%">-</strong></td>
                                        <td><strong style="font-size: 110%">${match.awayTeam.name.toUpperCase()}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>${halfTimeHome}</td>
                                        <td>Half Time</p>
                                        <td>${halfTimeAway}</td>
                                    </tr>
                                    <tr>
                                        <td>${fullTimeHome}</td>
                                        <td>Full Time</p>
                                        <td>${fullTimeAway}</td>
                                    </tr>
                                    <tr>
                                        <td>${penaltyHome}</td>
                                        <td>Penalties</p>
                                        <td>${penaltyAway}</td>
                                    </tr>
                                    <tr>
                                        <td>${homeExtra}</td>
                                        <td>Extra Time</p>
                                        <td>${awayExtra}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
                </div>
                </div>`;
        })
        teamMatch += `</div>`
    }
    //stylize card
    teamMatch += `
    <style>
        #card-bg{
            background-color: #1a237ea8 !important;
        }
        #move{
            font-size: 36px;
        }
        #isi{
            height: 600px !important;
        }
    </style>`
    
    //tambah card ke elemen
    document.getElementById("teamMatch").innerHTML = teamMatch;

    if (resultMatches.length !== 0){
        //init carousel
        const ab = document.querySelectorAll('.carousel');
        M.Carousel.init(ab, {fullWidth: true});
        
        //prev match button
        const prevP = document.querySelector(".movePrevCarousel")
        prevP.addEventListener('click', function(){
            const a = document.querySelector(".carousel")
            const instance = M.Carousel.getInstance(a)
            instance.prev();
        })

        //next match button
        const nextP = document.querySelector(".moveNextCarousel")
        nextP.addEventListener('click', function(){
            const a = document.querySelector(".carousel")
            const instance = M.Carousel.getInstance(a)
            instance.next();
        })
    }

}
function getMatche(dateFrom, dateTo){
    document.getElementById("teamMatch").innerHTML = displayLoader();
    if ('caches' in window){
        caches.match(`${base_url}competitions/2001/matches`)
        .then(function(response){
            if(response){
                response.json()
                .then(data =>{
                    setTimeout( () =>{
                        displayMatch(data, dateFrom, dateTo);
                    }, 400)
                })  
            }
        })
    }
    fetchAPI(`${base_url}competitions/2001/matches`)
        .then(data => {
            setTimeout( () =>{
                displayMatch(data, dateFrom, dateTo);
            }, 400)
        })
        .catch(error =>{
            console.log(error)
        })
}
function displayTeams(data, group){
    let grup = [];
    for (let j = 0; j<data.standings.length; j++){
        if (data.standings[j].group === `GROUP_${group}` && data.standings[j].type === "TOTAL"){
            grup.push(data.standings[j].table[0]);
            grup.push(data.standings[j].table[1]);
            grup.push(data.standings[j].table[2]);
            grup.push(data.standings[j].table[3]);
            break;
        }
    }
    let teamsContent = "";
    teamsContent +=`
        <div class="card" id="card-bg">
        <table class="highlight centered">
            <thead>
                <tr>
                    <th>GROUP ${group}</th>
                    <th>M</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th class="hide-on-small-only">GF</th>
                    <th class="hide-on-small-only">GA</th>
                    <th class="hide-on-small-only">GD</th>
                    <th>Pts</th>
                    <th></th>
                </tr>
            </thead>`
    grup.forEach(element => {
        teamsContent += `
            <tbody>
                <tr>
                    <td>${element.team.name}</td>
                    <td>${element.playedGames}</td>
                    <td>${element.won}</td>
                    <td>${element.draw}</td>
                    <td>${element.lost}</td>
                    <td class="hide-on-small-only">${element.goalsFor}</td>
                    <td class="hide-on-small-only">${element.goalsAgainst}</td>
                    <td class="hide-on-small-only">${element.goalDifference}</td>
                    <td>${element.points}</td>
                    <td><a href="./teamdetail.html?id=${element.team.id}">Profile</a></td>
                </tr>
            </tbody>`
    });
    teamsContent += `
        </table>
        </div>
        <style>
            #card-bg{
                background-color: #1a237ea8 !important;
            }
            a:hover{
                color: white;
            }
        </style>`;
    document.getElementById("articles").innerHTML = teamsContent;
}
function getTeams(group){
    document.getElementById("articles").innerHTML = displayLoader();
    if ('caches' in window){
        caches.match(`${base_url}competitions/2001/standings`)
        .then(response => {
            if(response){
                response.json()
                .then(data => {
                    setTimeout( () =>{
                        displayTeams(data, group);
                    }, 400)
                })
            }
        })
    }
    fetchAPI(`${base_url}competitions/2001/standings`)
        .then(data => {
            setTimeout( () =>{
                displayTeams(data, group);
            }, 400)
        })
        .catch(error =>{
            console.log(error)
        })
}
function displayProfile(data){
    let pic = data.crestUrl;
    if (pic !== null)
        pic = pic.replace(/^http:\/\//i, 'https://');
    let teamContent = `
        <div class="container">
            <div class="card" id="card-bg">
                <div class="card-content white-text">
                    <span class="card-title"><b style="font-weight: 600;">${data.name.toUpperCase()}</b></span>
                    <div class="card-image">
                        <img src="${pic}" alt="${data.name} flag"/>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Founded</th>
                                <td>${data.founded}</td>
                            </tr>
                            <tr>
                                <th>Club colors</th>
                                <td>${data.clubColors}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>${data.address}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>${data.phone}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>${data.website}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>${data.email}</td>
                            </tr>
                            <tr>
                                <th>Squad</th>
                                <td><ol>`;
    data.squad.forEach(player =>{
        let positionRole = player.position;
        if (positionRole === null)
            positionRole = "unknown";
        teamContent += `<li><b>${player.name}</b><br>${positionRole}</li>`
    })
    teamContent += `            </ol> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <style>
            #card-bg{
                background-color: #1a237ea8 !important;
            }
            .card .card-image img{
                margin-left: auto;
                margin-right: auto;
                width: 36%;
            }
            td, th{
                vertical-align: top;
            }
            ol{
                margin-block-start: 0;
                padding-inline-start: 13px;
            }
        </style>`;
    document.getElementById("body-content").innerHTML = teamContent;
}
function getTeamProfile(){
    return new Promise((resolve, reject) =>{
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        document.getElementById("body-content").innerHTML = displayLoader();
        if ('caches' in window){
            caches.match(`${base_url}teams/${idParam}`)
            .then(response => {
                if(response){
                    response.json()
                    .then(data =>{
                        setTimeout( () =>{
                            displayProfile(data)
                        }, 400)
                        resolve(data)
                    })
                }
            })
        }
        fetchAPI(`${base_url}teams/${idParam}`)
            .then(data => {
                setTimeout( () =>{
                    displayProfile(data)
                }, 400)
                resolve(data)
            })
    })
}
function getSavedTeams(){
    getAll()
        .then((profiles) => {
            let profilesHTML = "";
            if (profiles.length === 0){
                profilesHTML += `
                            <div class="card center" id="card-bg">
                                <div class="card-content white-text">
                                    <div class="row ">
                                        <div class="col s12">
                                        <span class="card-title">No Saved Teams</span>
                                            <p><b>There is no team saved</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            }
            else{
                profiles.forEach(function(profile) {
                profilesHTML += `
                    <div class="card" id="card-bg">
                        
                        <div class="card-content white-text">
                            <span class="card-title">${profile.name}</span>
                            <a class="btn-floating halfway-fab waves-effect waves-light red delButton"><i id="${profile.id}"class="material-icons">delete</i></a>
                            <p>${profile.phone} <br> 
                            ${profile.website} <br> 
                            ${profile.email}</p>
                        </div>
                        <div class="card-action">
                        
                            <a href="./teamdetail.html?id=${profile.id}&saved=true">Detail</a>
                        </div>
                    </div>
                    `;
                });
            }
                profilesHTML += `
                    <style>
                        #card-bg{
                            background-color: #1a237ea8 !important;
                        }
                        .btn-floating.halfway-fab {
                            bottom: 34px;
                    </style>`; 
            document.getElementById("saved").innerHTML = profilesHTML;
            if (profiles.length !== 0){
                const delBtn = document.querySelectorAll(".delButton");
                for(let button of delBtn){
                    button.addEventListener('click', function(event){
                    let teamId = parseInt(event.target.id);
                        deleteProfile(teamId)
                            .then(() => {
                                getSavedTeams();
                            })
                            .catch( () =>{
                                console.log(`delete not completed`)
                            })
                    })
                }
            }
        });
}
function getSavedTeambyId(){
    return new Promise((resolve, reject) =>{
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        getById(idParam)
            .then(data =>{
                document.getElementById("save").style.display = 'none';
                displayProfile(data)
                resolve(true);
            })
            .catch(() =>{
                getTeamProfile();
                reject(false);
            })
    })
}
export {getMatche, getTeams, getSavedTeams, getTeamProfile, getSavedTeambyId};