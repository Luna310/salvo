let data;
let locations;
let idGp = getParameterByName("gp");
let typeShip = "1";
let orientationShip = "2";
let arrayIdCelda = [];
let allShips;
let dataShips = [];

function getData() {
    fetch("/api/game_view/" + getParameterByName("gp"), {
        method: "GET",

    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }

    }).then(function (json) {

        data = json;
        dataShips = data.ships;
        dataGamePlayer = data.game.gamePlayers;
        dataSalvos = data.salvoPlayers;
        getColorLocation();
        getColorLocationSalvo();
        showInfoPlayer();
        if (dataShips.length > 0) {
            document.getElementById("buttonsShips").style.display = "none";
            document.getElementById("divButtonSalvos").style.display = "block";
        }

    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function createTable() {
    console.log("createtabla");
    let newThead = document.createElement("thead");
    newThead.setAttribute("id", "numberRow");

    let newTbody = document.createElement("tbody");
    newTbody.setAttribute("id", "bodyTable");

    let newTr = document.createElement("tr");

    var newTd = document.createElement("td");
    document.getElementById("table1").appendChild(newThead);
    document.getElementById("table1").appendChild(newTbody);
    document.getElementById("numberRow").appendChild(newTd);
    newTd.innerHTML = " ";

    var arrayLetter = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var num = 1;
    for (var i = 1; i < 11; i++) {

        var newTr2 = document.createElement("tr");
        newTr2.setAttribute("id", arrayLetter[i]);

        var newTd = document.createElement("td");


        document.getElementById("table1").appendChild(newTr);
        document.getElementById("numberRow").appendChild(newTd);
        document.getElementById("bodyTable").appendChild(newTr2);
        newTd.innerHTML = i;

        var newTd2 = document.createElement("td");
        newTr2.appendChild(newTd2);
        newTd2.innerHTML = arrayLetter[i];

        for (var j = 1; j < arrayLetter.length; j++) {
            let idCelda = arrayLetter[i] + num;
            var newTd3 = document.createElement("td");
            newTd3.setAttribute("id", idCelda);
            newTd3.setAttribute("style", "");
            num++;
            arrayIdCelda.push(idCelda);
            document.getElementById(arrayLetter[i]).appendChild(newTd3);

            newTd3.onclick = implementShips2(idCelda);
        }
        num = 1;
    }
}

function getColorLocation() {
    console.log("getlocation");

    let locations = [];
    for (let i = 0; i < dataShips.length; i++) {
        for (let j = 0; j < dataShips[i].location.length; j++) {
            locations.push(dataShips[i].location[j])
        }
    }
    for (let i = 0; i < locations.length; i++) {
        document.getElementById(locations[i]).setAttribute("class", "shipLocation");
    }
    this.locations = locations;
    //console.log(locations);
}

function createTableSalvos() {
    console.log("createSalvos");
    var newThead = document.createElement("thead");
    newThead.setAttribute("id", "numberRowSalvo");

    var newTbody = document.createElement("tbody");
    newTbody.setAttribute("id", "bodyTableSalvo");

    var newTr = document.createElement("tr");

    var newTd = document.createElement("td");
    document.getElementById("tableSalvo").appendChild(newThead);
    document.getElementById("tableSalvo").appendChild(newTbody);
    document.getElementById("numberRowSalvo").appendChild(newTd);
    newTd.innerHTML = " ";

    var arrayLetter = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var num = 1;
    for (var i = 1; i < 11; i++) {

        var newTr2 = document.createElement("tr");
        newTr2.setAttribute("id", arrayLetter[i] + "S");

        var newTd = document.createElement("td");


        document.getElementById("tableSalvo").appendChild(newTr);
        document.getElementById("numberRowSalvo").appendChild(newTd);
        document.getElementById("bodyTableSalvo").appendChild(newTr2);
        newTd.innerHTML = i;

        let newTd2 = document.createElement("td");
        newTr2.appendChild(newTd2);
        newTd2.innerHTML = arrayLetter[i];

        for (let j = 1; j < arrayLetter.length; j++) {
            let idCeldaSalvos = arrayLetter[i] + num + "S";
            var newTd3 = document.createElement("td");
            newTd3.setAttribute("id", idCeldaSalvos);
            num++;
            document.getElementById(arrayLetter[i] + "S").appendChild(newTd3);
            newTd3.onclick = implementSalvos(idCeldaSalvos);
        }
        num = 1;

    }


}

function getColorLocationSalvo() {
    console.log("getcolorlocation");
    var currentTurn = [];
    var opponentTurn = [];
    var currentSalvo = [];
    var opponetSalvo = [];

    for (var i = 0; i < dataSalvos.length; i++) {

        for (var j = 0; j < dataSalvos[i].salvos.length; j++) {

            for (var k = 0; k < dataSalvos[i].salvos[j].location.length; k++) {
                if (dataGamePlayer[i].id === idGp) {
                    console.log("getcolorlocation1");
                    currentTurn.push(dataSalvos[i].salvos[j].turn);
                    currentSalvo.push(dataSalvos[i].salvos[j].location[k]);
                } else {
                    opponentTurn.push(dataSalvos[i].salvos[j].turn);
                    opponetSalvo.push(dataSalvos[i].salvos[j].location[k]);
                }
            }
        }
    }
    // console.log(currentSalvo);
    // console.log(currentTurn);
    // console.log(opponetSalvo);
    // console.log(opponentTurn);
    for (let i = 0; i < currentSalvo.length; i++) {
        let salvo = document.getElementById(currentSalvo[i] + "s");
        salvo.setAttribute("class", "locationSalvo");
        salvo.innerHTML = currentTurn[i];
    }
    var hitLocation = [];
    for (let i = 0; i < opponetSalvo.length; i++) {
        for (let j = 0; j < this.locations.length; j++) {
            if (opponetSalvo[i] === this.locations[j]) {
                hitLocation.push(opponetSalvo[i])
            }
            let salvo = document.getElementById(opponetSalvo[i]);
            salvo.setAttribute("class", "locationSalvoOpponent");
            salvo.innerHTML = opponentTurn[i];
        }
    }
    for (let i = 0; i < hitLocation.length; i++) {
        let hit = document.getElementById(hitLocation[i]);
        hit.setAttribute("class", "hit");
    }

    // console.log(idGp);
    // console.log(hitLocation);

}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function showInfoPlayer() {
    console.log("infoplayer");
    let name1 = "";
    let name2 = "";

    if (idGp === data.game.gamePlayers[0].id && data.game.gamePlayers[1] != null) {
        //console.log("entra")
        name1 = data.game.gamePlayers[0].player.email;
        name2 = data.game.gamePlayers[1].player.email;
    }
    else if (idGp !== data.game.gamePlayers[0].id) {
        //console.log("entra2")
        name1 = data.game.gamePlayers[1].player.email;
        name2 = data.game.gamePlayers[0].player.email;
    }
    else if (data.game.gamePlayers[1] == null) {
        name1 = data.game.gamePlayers[0].player.email;
        name2 = " Waitting an opponent";
    }
    // console.log(name1);
    // console.log(name2);
    // console.log(data.game.gamePlayers[0].player.email);
    let newH2 = document.createElement("h2");
    document.getElementById("infoPlayers").appendChild(newH2);
    newH2.innerHTML = name1 + " VS " + name2

}

function implementShips(type, orientation) {
    console.log("implementShip");
    typeShip = type;
    orientationShip = orientation;
    console.log(typeShip);
    console.log(orientationShip);

}

let positionsDestroyer = [];
let positionsSubmarine = [];
let positionsPatrol = [];
let positionsAircraft = [];
let positionsBattleShip = [];
let allPositions = [];
console.log(dataShips.length + "IIIIIIII");
if (dataShips.length < 5) {
    console.log(dataShips.length + "dataShips<5");

    function implementShips2(idCelda) {

        return function lazy() {

            if ((typeShip === "destroyer") && orientationShip === "horizontal") {

                for (let j = 0; j < positionsDestroyer.length; j++) {

                    document.getElementById(positionsDestroyer[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    let checkAttribute = document.getElementById(arrayIdCelda[i]).getAttribute("style");

                    if (arrayIdCelda[i] === idCelda && checkAttribute === "") {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 1], 0) || allPositions.includes(arrayIdCelda[i + 2], 0)
                            || arrayIdCelda[i + 1] == null || arrayIdCelda[i + 2] == null) {
                            positionsDestroyer = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsDestroyer = [];
                            positionsDestroyer = [arrayIdCelda[i], arrayIdCelda[i + 1], arrayIdCelda[i + 2]];
                        }
                    }
                }

                if (positionsDestroyer.length === 3) {
                    if (positionsDestroyer[0].split("")[0] === positionsDestroyer[1].split("")[0] && positionsDestroyer[0].split("")[0] === positionsDestroyer[2].split("")[0]) {

                        document.getElementById(typeShip).disabled = true;
                        for (let j = 0; j < positionsDestroyer.length; j++) {
                            document.getElementById(positionsDestroyer[j]).setAttribute("style", "background-color: blue;");
                        }
                    } else {
                        positionsDestroyer = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if ((typeShip === "destroyer") && orientationShip === "vertical") {

                for (let j = 0; j < positionsDestroyer.length; j++) {

                    document.getElementById(positionsDestroyer[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    let checkAttribute = document.getElementById(arrayIdCelda[i]).getAttribute("style");

                    if (arrayIdCelda[i] === idCelda && checkAttribute === "") {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 10], 0) || allPositions.includes(arrayIdCelda[i + 20], 0)
                            || arrayIdCelda[i + 10] == null || arrayIdCelda[i + 20] == null) {
                            positionsDestroyer = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsDestroyer = [];
                            positionsDestroyer = [arrayIdCelda[i], arrayIdCelda[i + 10], arrayIdCelda[i + 20]];
                        }
                    }
                }

                if (positionsDestroyer.length === 3) {
                    if (positionsDestroyer[0].split("")[1] === positionsDestroyer[1].split("")[1] && positionsDestroyer[0].split("")[1] === positionsDestroyer[2].split("")[1]) {

                        document.getElementById(typeShip).disabled = true;
                        for (let j = 0; j < positionsDestroyer.length; j++) {
                            document.getElementById(positionsDestroyer[j]).setAttribute("style", "background-color: blue;");
                        }
                    } else {
                        positionsDestroyer = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if ((typeShip === "submarine") && orientationShip === "horizontal") {

                for (let j = 0; j < positionsSubmarine.length; j++) {
                    document.getElementById(positionsSubmarine[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    let checkAttribute = document.getElementById(arrayIdCelda[i]).getAttribute("style");


                    if (arrayIdCelda[i] === idCelda && checkAttribute === "") {

                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 1], 0) || allPositions.includes(arrayIdCelda[i + 2], 0)
                            || arrayIdCelda[i + 1] == null || arrayIdCelda[i + 2] == null) {
                            positionsSubmarine = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsSubmarine = [];
                            positionsSubmarine = [arrayIdCelda[i], arrayIdCelda[i + 1], arrayIdCelda[i + 2]];
                        }
                    }
                }

                if (positionsSubmarine.length === 3) {
                    if (positionsSubmarine[0].split("")[0] === positionsSubmarine[1].split("")[0] && positionsSubmarine[0].split("")[0] === positionsSubmarine[2].split("")[0]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsSubmarine.length; j++) {
                            document.getElementById(positionsSubmarine[j]).setAttribute("style", "background-color: violet;");
                        }
                    } else {
                        positionsSubmarine = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if ((typeShip === "submarine") && orientationShip === "vertical") {

                for (let j = 0; j < positionsSubmarine.length; j++) {
                    document.getElementById(positionsSubmarine[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    let checkAttribute = document.getElementById(arrayIdCelda[i]).getAttribute("style");


                    if (arrayIdCelda[i] === idCelda && checkAttribute === "") {

                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 10], 0) || allPositions.includes(arrayIdCelda[i + 20], 0)
                            || arrayIdCelda[i + 10] == null || arrayIdCelda[i + 20] == null) {
                            positionsSubmarine = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsSubmarine = [];
                            positionsSubmarine = [arrayIdCelda[i], arrayIdCelda[i + 10], arrayIdCelda[i + 20]];
                        }
                    }
                }

                if (positionsSubmarine.length === 3) {
                    if (positionsSubmarine[0].split("")[1] === positionsSubmarine[1].split("")[1] && positionsSubmarine[0].split("")[1] === positionsSubmarine[2].split("")[1]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsSubmarine.length; j++) {
                            document.getElementById(positionsSubmarine[j]).setAttribute("style", "background-color: violet;");
                        }
                    } else {
                        positionsSubmarine = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if (typeShip === "patrolBoat" && orientationShip === "horizontal") {

                for (let j = 0; j < positionsPatrol.length; j++) {
                    document.getElementById(positionsPatrol[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    if (arrayIdCelda[i] === idCelda) {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 1], 0) || arrayIdCelda[i + 1] == null) {
                            positionsPatrol = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsPatrol = [arrayIdCelda[i], arrayIdCelda[i + 1]];
                        }
                    }
                }

                if (positionsPatrol.length === 2) {
                    if (positionsPatrol[0].split("")[0] === positionsPatrol[1].split("")[0]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsPatrol.length; j++) {
                            document.getElementById(positionsPatrol[j]).setAttribute("style", "background-color: black;");
                        }
                    } else {
                        positionsPatrol = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if (typeShip === "patrolBoat" && orientationShip === "vertical") {

                for (let j = 0; j < positionsPatrol.length; j++) {
                    document.getElementById(positionsPatrol[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    if (arrayIdCelda[i] === idCelda) {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 10], 0) || arrayIdCelda[i + 10] == null) {
                            positionsPatrol = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsPatrol = [arrayIdCelda[i], arrayIdCelda[i + 10]];
                        }
                    }
                }

                if (positionsPatrol.length === 2) {
                    if (positionsPatrol[0].split("")[1] === positionsPatrol[1].split("")[1]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsPatrol.length; j++) {
                            document.getElementById(positionsPatrol[j]).setAttribute("style", "background-color: black;");
                        }
                    } else {
                        positionsPatrol = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if (typeShip === "AircraftCarrier" && orientationShip === "horizontal") {

                for (let j = 0; j < positionsAircraft.length; j++) {
                    document.getElementById(positionsAircraft[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    if (arrayIdCelda[i] === idCelda) {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 1], 0) || allPositions.includes(arrayIdCelda[i + 2], 0)
                            || allPositions.includes(arrayIdCelda[i + 3], 0) || allPositions.includes(arrayIdCelda[i + 4], 0) || arrayIdCelda[i + 1] == null
                            || arrayIdCelda[i + 2] == null || arrayIdCelda[i + 3] == null || arrayIdCelda[i + 4] == null) {
                            positionsAircraft = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsAircraft = [];
                            positionsAircraft = [arrayIdCelda[i], arrayIdCelda[i + 1], arrayIdCelda[i + 2], arrayIdCelda[i + 3], arrayIdCelda[i + 4]];
                        }
                    }
                }

                if (positionsAircraft.length === 5) {
                    if (positionsAircraft[0].split("")[0] === positionsAircraft[1].split("")[0] && positionsAircraft[0].split("")[0] === positionsAircraft[2].split("")[0]
                        && positionsAircraft[0].split("")[0] === positionsAircraft[3].split("")[0] && positionsAircraft[0].split("")[0] === positionsAircraft[4].split("")[0]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsAircraft.length; j++) {
                            document.getElementById(positionsAircraft[j]).setAttribute("style", "background-color: green;");
                        }
                    } else {
                        positionsAircraft = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if (typeShip === "AircraftCarrier" && orientationShip === "vertical") {

                for (let j = 0; j < positionsAircraft.length; j++) {
                    document.getElementById(positionsAircraft[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    if (arrayIdCelda[i] === idCelda) {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 10], 0) || allPositions.includes(arrayIdCelda[i + 20], 0)
                            || allPositions.includes(arrayIdCelda[i + 30], 0) || allPositions.includes(arrayIdCelda[i + 40], 0) || arrayIdCelda[i + 10] == null
                            || arrayIdCelda[i + 20] == null || arrayIdCelda[i + 30] == null || arrayIdCelda[i + 40] == null) {
                            positionsAircraft = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsAircraft = [];
                            positionsAircraft = [arrayIdCelda[i], arrayIdCelda[i + 10], arrayIdCelda[i + 20], arrayIdCelda[i + 30], arrayIdCelda[i + 40]];
                        }
                    }
                }

                if (positionsAircraft.length === 5) {
                    if (positionsAircraft[0].split("")[1] === positionsAircraft[1].split("")[1] && positionsAircraft[0].split("")[1] === positionsAircraft[2].split("")[1]
                        && positionsAircraft[0].split("")[1] === positionsAircraft[3].split("")[1] && positionsAircraft[0].split("")[1] === positionsAircraft[4].split("")[1]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsAircraft.length; j++) {
                            document.getElementById(positionsAircraft[j]).setAttribute("style", "background-color: green;");
                        }
                    } else {
                        positionsAircraft = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if (typeShip === "Battleship" && orientationShip === "horizontal") {

                for (let j = 0; j < positionsBattleShip.length; j++) {
                    document.getElementById(positionsBattleShip[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    if (arrayIdCelda[i] === idCelda) {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 1], 0) || allPositions.includes(arrayIdCelda[i + 2], 0)
                            || allPositions.includes(arrayIdCelda[i + 3], 0) || arrayIdCelda[i + 1] == null
                            || arrayIdCelda[i + 2] == null || arrayIdCelda[i + 3] == null) {
                            positionsBattleShip = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsBattleShip = [];
                            positionsBattleShip = [arrayIdCelda[i], arrayIdCelda[i + 1], arrayIdCelda[i + 2], arrayIdCelda[i + 3]];
                        }
                    }
                }

                if (positionsBattleShip.length === 4) {
                    if (positionsBattleShip[0].split("")[0] === positionsBattleShip[1].split("")[0] && positionsBattleShip[0].split("")[0] === positionsBattleShip[2].split("")[0]
                        && positionsBattleShip[0].split("")[0] === positionsBattleShip[3].split("")[0]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsBattleShip.length; j++) {
                            document.getElementById(positionsBattleShip[j]).setAttribute("style", "background-color: red;");
                        }
                    } else {
                        positionsBattleShip = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }

            if (typeShip === "Battleship" && orientationShip === "vertical") {

                for (let j = 0; j < positionsBattleShip.length; j++) {
                    document.getElementById(positionsBattleShip[j]).setAttribute("style", "");
                }

                for (let i = 0; i < arrayIdCelda.length; i++) {
                    if (arrayIdCelda[i] === idCelda) {
                        if (allPositions.includes(arrayIdCelda[i], 0) || allPositions.includes(arrayIdCelda[i + 10], 0) || allPositions.includes(arrayIdCelda[i + 20], 0)
                            || allPositions.includes(arrayIdCelda[i + 30], 0) || arrayIdCelda[i + 1] == null
                            || arrayIdCelda[i + 20] == null || arrayIdCelda[i + 30] == null) {
                            positionsBattleShip = [];
                            document.getElementById(typeShip).disabled = false;
                        } else {
                            positionsBattleShip = [];
                            positionsBattleShip = [arrayIdCelda[i], arrayIdCelda[i + 10], arrayIdCelda[i + 20], arrayIdCelda[i + 30]];
                        }
                    }
                }

                if (positionsBattleShip.length === 4) {
                    if (positionsBattleShip[0].split("")[1] === positionsBattleShip[1].split("")[1] && positionsBattleShip[0].split("")[1] === positionsBattleShip[2].split("")[1]
                        && positionsBattleShip[0].split("")[1] === positionsBattleShip[3].split("")[1]) {
                        document.getElementById(typeShip).disabled = true;

                        for (let j = 0; j < positionsBattleShip.length; j++) {
                            document.getElementById(positionsBattleShip[j]).setAttribute("style", "background-color: red;");
                        }
                    } else {
                        positionsBattleShip = [];
                        document.getElementById(typeShip).disabled = false;
                    }
                }
                allPositions = [];
                allPositions = [].concat(positionsSubmarine, positionsDestroyer, positionsPatrol, positionsAircraft, positionsBattleShip);
            }
            console.log(positionsDestroyer);
            console.log(positionsSubmarine);
            console.log(positionsPatrol);
            console.log(positionsAircraft);
            console.log(positionsBattleShip);


            if (allPositions.length === 17) {
                let buttonStart = document.getElementById("start");
                buttonStart.disabled = false;
                let destroyer = {type: "destroyer", location: positionsDestroyer};
                let submarine = {type: "submarine", location: positionsSubmarine};
                let patrol = {type: "patrol", location: positionsPatrol};
                let aircraft = {type: "aircraft", location: positionsAircraft};
                let battlesShip = {type: "battlesShip", location: positionsBattleShip};
                allShips = [destroyer, submarine, patrol, aircraft, battlesShip];
                console.log(allShips);
            }
        }
    }
}
let allSalvos = [];
let salvoLocations = [];

function implementSalvos(idCeldaSalvos) {
    let turn = 1;
    console.log("implementSalvos");
    return function lazy() {
        //let checkStyle = document.getElementById(idCeldaSalvos).style;
       // console.log(checkStyle);
        if (salvoLocations.length < 5 && !salvoLocations.includes(idCeldaSalvos)) {
            document.getElementById(idCeldaSalvos).setAttribute("style", "background-color: brown;");
            salvoLocations.push(idCeldaSalvos);
            if (salvoLocations.length === 5) {
                allSalvos = {turn: turn, location: salvoLocations};
                }
            console.log(salvoLocations);
            //console.log(allSalvos);
        }
    }

}

function setShips() {

    fetch("/api/games/players/" + idGp + "/ships", {

        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(allShips)

    }).then(function () {
        window.location.reload();
    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });

}

function setSalvos() {

    fetch("/api/games/players/" + idGp + "/salvos", {

        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(allSalvos)

    }).then(function () {
        window.location.reload();
        //document.getElementById("buttonsShips").style.display = "none";
    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });

}

if (dataShips.length === 5) {
    document.getElementById("buttonsShips").style.display = "none";
    console.log(dataShips.length)
}

getData();
createTable();
createTableSalvos();