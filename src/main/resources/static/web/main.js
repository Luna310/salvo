var data;
var gpID;
window.onload = () => {
    getData();
}

function getData() {
    fetch("/api/games", {
        method: "GET",

    }).then(function (response) {
        if (response.ok) {


            return response.json();
        }

    }).then(function (json) {
        data = json;
        insertPlay();
        insertScores();
        console.log(data.games.length);
        showAndHide()
        //this.gpID=data.games[0].id;
        console.log(gpID);

    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function insertPlay() {

    for (var i = 0; i < data.games.length; i++) {

        var emailplayer = [];
        for (var j = 0; j < data.games[i].gamePlayers.length; j++) {
            // console.log("entra1")
            var datePlays = data.games[i].create;
            emailplayer.push(data.games[i].gamePlayers[j].player.email);
        }

        var newDate = new Date(datePlays);
        var newLI = document.createElement("li");
        newLI.setAttribute("id", "li" + i);
        var buttonGame = document.createElement("button");
        var divLi = document.createElement("div")


        newLI.setAttribute("class", "list-group-item row");


        divLi.innerHTML = newDate.getFullYear() + "/" + newDate.getMonth() + 1 + "/" + newDate.getDate() + " | " +
            newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds() + " |   " + emailplayer;
        document.getElementById("listPlay").appendChild(newLI);
        document.getElementById("li" + i).appendChild(divLi);

        var idDivButton = i;

        var stringDiv = `<div id=${idDivButton}></div>`;

        if (data.currentUser) {
            divLi.innerHTML = newDate.getFullYear() + "/" + newDate.getMonth() + 1 + "/" + newDate.getDate() + " | " +
                newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds() + " |   " + emailplayer;

            newLI.innerHTML = stringDiv;

            newLI.appendChild(divLi);

            document.getElementById("listPlay").appendChild(newLI);


            if (emailplayer.length === 1 && emailplayer[0] !== data.currentUser.email) {
                this.gpID = data.games[i].id;
                console.log("entra en la función " + gpID);
                var changeButton = document.getElementById(idDivButton);

                changeButton.innerHTML = `<button onclick="joinGame(${gpID})" id="provisional" class="btn btn-default">JOIN</button>`;
                var join = document.getElementById("provisional");
                //join.addEventListener("click", () => joinGame(gpID));
                join.setAttribute("id", gpID + "button");
                var join2 = document.getElementById(gpID + "button");

            }
            else if (emailplayer.length === 2 && (emailplayer[0] === data.currentUser.email || emailplayer[1] ===
                data.currentUser.email) || emailplayer.length === 1 && emailplayer[0] === data.currentUser.email) {
                changeButton = document.getElementById(idDivButton);

                changeButton.innerHTML = "<a id='buttonGame2' type='button' class='btn btn-default'><p>BACK</p></a>"
                let pButton = document.getElementById("buttonGame2");
                pButton.setAttribute("id", "link" + i);
                pButton.setAttribute("target", "_blank");

                for (k = 0; k < data.games[i].gamePlayers.length; k++) {
                    if (data.games[i].gamePlayers[k].player.email === data.currentUser.email)
                        document.getElementById("link" + i).setAttribute("href", "http://localhost:8080/web/game.html?gp=" +
                            data.games[i].gamePlayers[k].id)
                }
            }
        }

    }
}

function insertScores() {
    var arrayThead = ["Name", "Total", "Won", "Lost", "Tied"];
    var newThead = document.createElement("thead");
    var newTbody = document.createElement("tbody");
    newTbody.setAttribute("id", "tbodyScore");
    newThead.setAttribute("id", "theadScore");
    document.getElementById("table1").appendChild(newThead);
    document.getElementById("table1").appendChild(newTbody);

    for (var i = 0; i < arrayThead.length; i++) {

        var newTd = document.createElement("td");
        newTd.innerHTML = arrayThead[i];
        newThead.appendChild(newTd);
    }


    for (var i = 0; i < data.leaderBoard.length; i++) {
        if (data.leaderBoard[i].player != "") {
            var newTr1 = document.createElement("tr");


            newTr1.setAttribute("id", data.leaderBoard[i].player);
            newTbody.appendChild(newTr1);
            for (var j = 0; j < data.leaderBoard.length; j++) {
                var newtd2 = document.createElement("td");
                var newtd3 = document.createElement("td");
                var newtd4 = document.createElement("td");
                var newtd5 = document.createElement("td");
                var newtd6 = document.createElement("td");
                newtd2.innerHTML = data.leaderBoard[i].player;
                newtd3.innerHTML = data.leaderBoard[i].total;
                newtd4.innerHTML = data.leaderBoard[i].won;
                newtd5.innerHTML = data.leaderBoard[i].lost;
                newtd6.innerHTML = data.leaderBoard[i].tied;
            }
            newTr1.appendChild(newtd2);
            newTr1.appendChild(newtd3);
            newTr1.appendChild(newtd4);
            newTr1.appendChild(newtd5);
            newTr1.appendChild(newtd6);
        }
    }
}


function logIn_out(url) {
    var userName = document.getElementById("inputName").value;
    var pwd = document.getElementById("inputpwd").value;

    if (url == '/api/login') {

        fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',

            body: 'user=' + userName + '&password=' + pwd,
        }).then(function (data) {
            console.log('Request success: ', data);
            //showAndHide();
            window.location.reload();

        })
            .catch(function (error) {
                console.log('Request failure: ', error);
            });

    } else if (url === '/api/logout') {

        fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',

        })
            .then(function (data) {
                console.log('Request success: ', data);


            }).then(function () {
            window.location.reload();
            document.getElementById("out").style.display = "none";
            document.getElementById("in").style.display = "block";
            document.getElementById("register").style.display = "block";
            document.getElementById("inputPassEmail").style.display = "block";
            document.getElementById("createGame").style.display = "none";
        })
            .catch(function (error) {
                console.log('Request failure: ', error);
            });

    }
}

function register() {

    let userName = document.getElementById("inputName").value;
    let pwd = document.getElementById("inputpwd").value;
    console.log(userName);
    console.log(pwd);
    fetch("/api/players", {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',

        body: JSON.stringify({
            user: userName,
            password: pwd
        })
    })
        .then(function (data) {
            console.log('Request success: ', data);
            logIn_out('/api/login')

        }).then(function () {

    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
    userName.innerHTML = "";
    pwd.innerHTML = "";
}

function showAndHide() {
    if (data.currentUser) {
        document.getElementById("out").style.display = "block";
        document.getElementById("in").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("inputPassEmail").style.display = "none";
        document.getElementById("createGame").style.display = "block";
    }
}

function createGame() {

    fetch("/api/games", {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',

    }).then(function (data) {
        console.log('Request success: ', data);
        window.location.reload();
        return data.json();

    }).then(function (json) {
        console.log(json);
        window.open("http://localhost:8080/web/game.html?gp=" + json.gpId);
    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });

}

function joinGame(gameId) {
    //alert(gameId);
    fetch("/api/game/" + gameId + "/players", {
        method: "POST",

    }).then(function (data) {
        return data.json();

    }).then(function (json) {
        console.log(gameId);
        window.open("http://localhost:8080/web/game.html?gp=" + json.gameId);
    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}