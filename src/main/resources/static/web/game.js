var data;
var locations;
var idGp=getParameterByName("gp");
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

        console.log(data);
        console.log(dataGamePlayer[0].player.email + " VS " + dataGamePlayer[1].player.email);
        console.log(dataSalvos);
    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

function createTable() {
    var newThead = document.createElement("thead");
    newThead.setAttribute("id","numberRow");

    var newTbody = document.createElement("tbody");
    newTbody.setAttribute("id","bodyTable");

    var newTr = document.createElement("tr");

    var newTd = document.createElement("td");
    document.getElementById("table1").appendChild(newThead);
    document.getElementById("table1").appendChild(newTbody);
    document.getElementById("numberRow").appendChild(newTd);
    newTd.innerHTML=" ";

    var arrayLetter = ["","A","B","C","D","E","F","G","H","I","J"];
    var num=1;
    for (var i=1;i<11;i++){

        var newTr2 = document.createElement("tr");
        newTr2.setAttribute("id",arrayLetter[i]);

        var newTd = document.createElement("td");


        document.getElementById("table1").appendChild(newTr);
        document.getElementById("numberRow").appendChild(newTd);
        document.getElementById("bodyTable").appendChild(newTr2);
        newTd.innerHTML=i;

        var newTd2 = document.createElement("td");
        newTr2.appendChild(newTd2);
        newTd2.innerHTML = arrayLetter[i];

        for (var j=1;j<arrayLetter.length;j++){
            var newTd3 = document.createElement("td");
            newTd3.setAttribute("id",arrayLetter[i]+num);
            num++;
            document.getElementById(arrayLetter[i]).appendChild(newTd3);
        }
        num=1;

    }


}

function getColorLocation() {

    var locations = [];
    for(var i = 0;i<dataShips.length;i++) {
        for (var j = 0; j < dataShips[i].location.length; j++) {
            locations.push(dataShips[i].location[j])
        }
    }
    for(var i = 0;i<locations.length;i++) {
        document.getElementById(locations[i]).setAttribute("class","shipLocation");
    }
    this.locations=locations;
    console.log(locations);
}


function createTableSalvos() {
    var newThead = document.createElement("thead");
    newThead.setAttribute("id","numberRowSalvo");

    var newTbody = document.createElement("tbody");
    newTbody.setAttribute("id","bodyTableSalvo");

    var newTr = document.createElement("tr");

    var newTd = document.createElement("td");
    document.getElementById("tableSalvo").appendChild(newThead);
    document.getElementById("tableSalvo").appendChild(newTbody);
    document.getElementById("numberRowSalvo").appendChild(newTd);
    newTd.innerHTML=" ";

    var arrayLetter = ["","A","B","C","D","E","F","G","H","I","J"];
    var num=1;
    for (var i=1;i<11;i++){

        var newTr2 = document.createElement("tr");
        newTr2.setAttribute("id",arrayLetter[i]+"s");

        var newTd = document.createElement("td");


        document.getElementById("tableSalvo").appendChild(newTr);
        document.getElementById("numberRowSalvo").appendChild(newTd);
        document.getElementById("bodyTableSalvo").appendChild(newTr2);
        newTd.innerHTML=i;

        var newTd2 = document.createElement("td");
        newTr2.appendChild(newTd2);
        newTd2.innerHTML = arrayLetter[i];

        for (var j=1;j<arrayLetter.length;j++){
            var newTd3 = document.createElement("td");
            newTd3.setAttribute("id",arrayLetter[i]+num+"s");
            num++;
            document.getElementById(arrayLetter[i]+"s").appendChild(newTd3);
        }
        num=1;

    }


}

function getColorLocationSalvo() {

    var currentTurn = [];
    var opponentTurn = [];
    var currentSalvo = [];
    var opponetSalvo = [];

    for(var i = 0;i<dataSalvos.length;i++){

        for(var j = 0; j < dataSalvos[i].salvos.length; j++) {

            for(var k = 0;k<dataSalvos[i].salvos[j].location.length;k++){
                if(dataGamePlayer[i].id == idGp){
                    currentTurn.push(dataSalvos[i].salvos[j].turn);
                    currentSalvo.push(dataSalvos[i].salvos[j].location[k]);
                }else{
                    opponentTurn.push(dataSalvos[i].salvos[j].turn);
                    opponetSalvo.push(dataSalvos[i].salvos[j].location[k]);
                }
            }
        }
    }
    console.log(currentSalvo);
    console.log(currentTurn);
    console.log(opponetSalvo);
    console.log(opponentTurn);
    for(var i = 0;i<currentSalvo.length;i++) {
        var salvo=document.getElementById(currentSalvo[i]+"s");
        salvo.setAttribute("class","locationSalvo");
        salvo.innerHTML = currentTurn[i];
    }
    var hitLocation = [];
    for(var i = 0;i<opponetSalvo.length;i++) {
        for(var j = 0;j<this.locations.length;j++){
            if(opponetSalvo[i]==this.locations[j]) {
                hitLocation.push(opponetSalvo[i])
            }
            var salvo = document.getElementById(opponetSalvo[i]);
            salvo.setAttribute("class", "locationSalvoOpponent");
            salvo.innerHTML = opponentTurn[i];
        }
    }
    for(var i = 0; i<hitLocation.length;i++){
        var hit = document.getElementById(hitLocation[i]);
        hit.setAttribute("class","hit");
    }

    console.log(idGp);
    console.log(hitLocation);

}


function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function showInfoPlayer(){
    var name1="";
    var name2="";

    if(idGp == data.game.gamePlayers[0].id && data.game.gamePlayers[1]!=null){
        console.log("entra")
        name1=data.game.gamePlayers[0].player.email;
        name2=data.game.gamePlayers[1].player.email;
    }
    else if(idGp != data.game.gamePlayers[0].id){
        console.log("entra2")
        name1=data.game.gamePlayers[1].player.email;
        name2=data.game.gamePlayers[0].player.email;
    }
    else if(data.game.gamePlayers[1]==null){
        name1=data.game.gamePlayers[0].player.email;
        name2= " Waitting an opponent";
    }
    console.log(name1);
    console.log(name2);
    console.log(data.game.gamePlayers[0].player.email);
    var newH2=document.createElement("h2");
    document.getElementById("infoPlayers").appendChild(newH2);
    newH2.innerHTML = name1 + " VS " + name2

}

getData();
createTable();
createTableSalvos();