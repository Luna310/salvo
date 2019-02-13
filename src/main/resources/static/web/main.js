var data;

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
    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });
}

    function insertPlay() {

        for(var i=0 ; i < data.games.length ; i++){

            var emailplayer = [];
                 for(var j=0 ; j < data.games[i].gamePlayers.length ; j++){
                     console.log("entra1")
                     var datePlays=data.games[i].create;
                     emailplayer.push(data.games[i].gamePlayers[j].player.email);
        }
            var newDate = new Date(datePlays);
            var newLI=document.createElement("li");
            newLI.setAttribute("class","list-group-item")
            newLI.innerHTML = newDate.getFullYear() + "/" + newDate.getMonth()+1 + "/" + newDate.getDate() + " | " +
                newDate.getHours() + ":" + newDate.getMinutes() + ":"  + newDate.getSeconds()  + " |   " + emailplayer;
            document.getElementById("listPlay").appendChild(newLI);
            var emailplayer = [];
        }


    }

    function insertScores (){
        var arrayThead=["Name","Total","Won","Lost","Tied"];
        var newThead = document.createElement("thead");
        var newTbody = document.createElement("tbody");
        newTbody.setAttribute("id","tbodyScore");
        newThead.setAttribute("id", "theadScore");
        document.getElementById("table1").appendChild(newThead);
        document.getElementById("table1").appendChild(newTbody);

        for(var i=0 ; i < arrayThead.length ; i++){
            console.log(newThead)
            var newTd = document.createElement("td");
            newTd.innerHTML=arrayThead[i];
            newThead.appendChild(newTd);
            }



        for(var i=0 ; i < arrayThead.length ; i++){
            if(data.leaderBoard[i].player!="") {
            var newTr1 = document.createElement("tr");


                newTr1.setAttribute("id", data.leaderBoard[i].player);
                newTbody.appendChild(newTr1);
                for(var j = 0;j<data.leaderBoard.length;j++){
                    var newtd2 = document.createElement("td");
                    var newtd3 = document.createElement("td");
                    var newtd4 = document.createElement("td");
                    var newtd5 = document.createElement("td");
                    var newtd6 = document.createElement("td");
                    newtd2.innerHTML=data.leaderBoard[i].player;
                    newtd3.innerHTML=data.leaderBoard[i].total;
                    newtd4.innerHTML=data.leaderBoard[i].won;
                    newtd5.innerHTML=data.leaderBoard[i].lost;
                    newtd6.innerHTML=data.leaderBoard[i].tied;
                }
                newTr1.appendChild(newtd2);
                newTr1.appendChild(newtd3);
                newTr1.appendChild(newtd4);
                newTr1.appendChild(newtd5);
                newTr1.appendChild(newtd6);
            }
        }
    }


getData();
