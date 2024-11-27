let cardPlayer = document.getElementById("playerReserve");
const urlJson = "../../My_Backend/package.json"

fetch(urlJson)
.then(response => response.json())
.then(res=>{
    const data = res.players;
    let cardPlayer = '';
    data.forEach(player=>{
        cardPlayer+=`<div id="cards" style="width: 500px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background-image: url(/My_Frontend/src/assets/images/Borde1.png);
                            background-size: 100%;
                            background-repeat: no-repeat;
                            color: white;
                            font-size: 10px;
                            text-align: center;
                            font-family: sans-serif;margin-top:10px">
                            <p>${player.position}</p>
                            <img
                                src="${player.photo}"
                                alt="" style="width: 60px;margin-top:16px">
                            <div class="playerName" style="color: white;font-size: 10px;text-align: center;font-family: sans-serif;font-size: 6px;display: flex;flex-direction: column;
                            justify-content: center;">
                                <p style="margin-top:5px;margin-bottom: 25px;font-size: 13px;">${player.name}</p>
                                <img src="${player.flag}" alt="" style="width: 30px; position: relative; left: 60px;">
                                <div class="properTitle" style="margin-top: 2px;font-size: 6px; width: 150px;display: flex;justify-content: space-evenly;">
                                    <span>RAT</span>
                                    <span>PAC</span>
                                    <span>SHO</span>
                                    <span>PAS</span>
                                    <span>DRI</span>
                                    <span>DEF</span>
                                    <span>PHY</span>
                                </div>
                                <div class="properNum" style="width: 150px;
                                display: flex;
                                justify-content: space-evenly;">
                                    <span>${player.rating}</span>
                                    <span>${player.pace}</span>
                                    <span>${player.shooting}</span>
                                    <span>${player.passing}</span>
                                    <span>${player.dribbling}</span>
                                    <span>${player.defending}</span>
                                    <span>${player.physical}</span>
                                </div>
                            </div>
                        </div>`;
    })
    document.getElementById('playerReserve').innerHTML=cardPlayer;


})
 
    

function displayPlayersFunction(displayPlayers) {
cardPlayer.innerHTML = "";
  displayPlayers.forEach((onePlayer) => {
    let playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.innerHTML = `
      <div id="cards" class="card"
                            style="position: relative;top: 190px;left: 130px;">
                            <p>${onePlayer.position}</p>
                            <img src="${onePlayer.image}" alt>
                            <div class="playerName">
                                <p>${onePlayer.name}</p>
                                <div class="properTitle">
                                    <span>RAT</span>
                                    <span>PAC</span>
                                    <span>SHO</span>
                                    <span>PAS</span>
                                    <span>DRI</span>
                                    <span>DEF</span>
                                    <span>PHY</span>
                                </div>
                                <div class="properNum">
                                    <span>${onePlayer.rating}</span>
                                    <span>${onePlayer.pace}</span>
                                    <span>${onePlayer.shooting}</span>
                                    <span>${onePlayer.passing}</span>
                                    <span>${onePlayer.dribbling}</span>
                                    <span>${onePlayer.defending}</span>
                                    <span>${onePlayer.physical}</span>
                                </div>
                            </div>
                        </div>`;
    
     cardPlayer.appendChild(playerDiv);
  });
}
