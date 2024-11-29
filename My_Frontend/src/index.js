let cardPlayer = document.getElementById("playerReserve");
const urlJson = "../../My_Backend/package.json"
const playersNenber = JSON.parse(localStorage.getItem('players')) || [];

fetch(urlJson)
.then(response => response.json())
.then(res=>{
    const data = res.players;
    let cardPlayer = '';
    data.forEach(player=>{
        cardPlayer+=`<div id="draggable" style="width: 500px;
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
                            <img src="${player.photo}" alt="" style="width: 60px;margin-top:16px" class="md:w-32 lg:w-48">
                            <div class="playerName" style="color: white;font-size: 10px;text-align: center;font-family: sans-serif;font-size: 6px;display: flex;flex-direction: column;
                            justify-content: center;">
                                <p style="margin-top:5px;margin-bottom: 25px;font-size: 13px;">${player.name}</p>
                                <img src="${player.flag}" alt="" style="width: 30px; position: relative; left: 60px;" class="md:w-32 lg:w-48">
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
 

// ____________validation_______________


function toValidate(ex) {
    let isValid = true;
    let errorSpan = ex.parentElement.querySelector('.errorMessage');
    if (!ex.value.trim()) {
        isValid = false;
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('errorMessage');
            errorSpan.style.color = 'rgb(255, 0, 0)';
            errorSpan.style.fontSize = '0.875rem';
            ex.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = "This field is required.";
    } else {
        if (errorSpan) {
            errorSpan.textContent = "";
        }
    }
    return isValid;
}
function validatePlayerForm(form) {

    let isFormValid = true;

    const nameField = form.querySelector("input[name='name']");
    if (!toValidate(nameField)) {
        isFormValid = false;
    }

    const photoField = form.querySelector("input[name='pictureUpload']");
    if (!toValidate(photoField).length) {
        isFormValid = false;
    } else if (toValidate(photoField).files[0].size / 1024 / 1024 > 10) {
        isFormValid = false;
    }

    const positionField = form.querySelector('input[name="position"]');
    if (!toValidate(positionField)) {
        isFormValid = false;
    }

    const nationalityField = form.Nationality.value;
    if (toValidate(nationalityField) === "") {
        isFormValid = false;
    }

    const flagField = form.querySelector("input[name='flagUpload']");
    if (!toValidate(flagField).length) {
        isFormValid = false;
    } else if (toValidate(flagField).files[0].size / 1024 / 1024 > 10) {
        isFormValid = false;
    }

    const clubField = form.querySelector("input[name='club']");
    if (!toValidate(clubField)) {
        isFormValid = false;
    }

    const ratingFields = ['#Rating', '#Diving', '#Handling', '#Kicking', '#Reflexes', '#spped', '#positioning'];
    for (let fieldSelector of ratingFields) {
        const ratingField = form.querySelector(fieldSelector);
        if (ratingField && (ratingField.value < 1 || ratingField.value > 100)) {
            isFormValid = false;
            break;
        }
    }
    return isFormValid;
}


// -------------drag & drop---------------



// const draggableItem = document.getElementById('draggable');
// const dropZone = document.getElementById('dropzone');

//         draggableItem.addEventListener('dragstart', (event) => {

//             event.dataTransfer.setData('text/plain', event.target.id);
//             event.target.style.opacity = '1';

//         });

//         draggableItem.addEventListener('dragend', (event) => {

//             event.target.style.opacity = '1';

//         });

//         dropZone.addEventListener('dragover', (event) => {
//             event.preventDefault();

//             dropZone.classList.add('over');
//         });

//         dropZone.addEventListener('dragleave', (event) => {
//             event.preventDefault();

//             dropZone.classList.remove('over');
//         });

//         dropZone.addEventListener('drop', (event) => {
//             event.preventDefault();


//             dropZone.classList.remove('over');

//             const draggedId = event.dataTransfer.getData('text/plain');
//             const draggedElement = document.getElementById(draggedId);

//             dropZone.appendChild(draggedElement);
//         });



// ----------------- show image in form-------------------



function updateImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const previewDiv = document.getElementById(previewId);
    input.addEventListener('input', () => {
        const imageUrl = input.value;
        previewDiv.innerHTML = '';

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Preview Image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';

            previewDiv.appendChild(img);
        } else {
            previewDiv.innerHTML = '<span class="text-sm">No photo</span>';
        }
    });
}
updateImagePreview('pictureURL', 'picturePreview');
updateImagePreview('flagURL', 'flagPreview');



// ---------------Local Storage----------------


function addToLocal(){
    const player = {
        name: document.getElementById('nameR').value,
        photo: document.getElementById('pictureURL').value,
        position: document.getElementById('positionR').value,
        nationality: document.getElementById('Nationality').value,
        flag: document.getElementById('flagURL').value,
        club: document.getElementById('club').value,
        rating: document.getElementById('Rating').value,
        pace: document.getElementById('Pace').value,
        shooting: document.getElementById('Shooting').value,
        passing: document.getElementById('Passing').value,
        dribbling: document.getElementById('Dribbling').value,
        defending: document.getElementById('Defending').value,
        physical: document.getElementById('Physical').value
    };
    playersNenber.push(player)
localStorage.setItem('players', JSON.stringify(playersNenber));
getFromLocal();

}

getFromLocal();

function getFromLocal() {
    const placementDiv = document.getElementById('placement'); 
    placementDiv.innerHTML=''
    playersNenber.forEach((player) => {
        placementDiv.innerHTML += `<div id="drag" style="width: 160px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background-image: url(/My_Frontend/src/assets/images/Borde1.png);
                            background-size: 100%;
                            background-repeat: no-repeat;
                            color: white;
                            font-size: 10px;
                            text-align: center;
                            font-family: sans-serif;margin-top: 3px;">
                            <p>${player.position}</p>
                            <img src="${player.photo}" alt="" style="width: 60px;margin-top:16px" class="md:w-32 lg:w-48">
                            <div class="playerName" style="color: white;font-size: 10px;text-align: center;font-family: sans-serif;font-size: 6px;display: flex;flex-direction: column;
                            justify-content: center;">
                                <p style="margin-top:5px;margin-bottom: 35px;font-size: 13px;">${player.name}</p>
                                <img src="${player.flag}" alt="" style="width: 30px; position: relative; left: 60px;" class="md:w-32 lg:w-48">
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
                            <div style="">
                            <button class="edit-button" style="margin-top: 10px; padding: 5px 10px; background-color: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;" data-player-id="${player.name}">
                                Edit
                            </button>
                            <button class="delete-button" style="margin-top: 5px; padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;" data-player-id="${player.name}">
                                Delete
                            </button>
                            </div>
                        </div>`;
                        document.querySelector(`.edit-button[data-player-id="${player.name}"]`).addEventListener('click', () => {
                            openEditForm(player);
                        });
                        document.querySelector(`.delete-button[data-player-id="${player.name}"]`).addEventListener('click', () => {
                            deletePlayer(player.name);
                        });
                    });
}


// // -----------Edit card player-----------



function openEditForm(player) {
    const editFormContainer = document.getElementById('editFormContainer');
    editFormContainer.style.display = 'block';
    document.getElementById('editName').value = player.name;
    document.getElementById('editPhoto').value = player.photo;
    document.getElementById('editPosition').value = player.position;
    document.getElementById('editNationality').value = player.nationality;
    document.getElementById('editFlag').value = player.flag;
    document.getElementById('editClub').value = player.club;
    document.getElementById('editRating').value = player.rating;
    document.getElementById('editPace').value = player.pace;
    document.getElementById('editShooting').value = player.shooting;
    document.getElementById('editPassing').value = player.passing;
    document.getElementById('editDribbling').value = player.dribbling;
    document.getElementById('editDefending').value = player.defending;
    document.getElementById('editPhysical').value = player.physical;
    document.getElementById('saveEditButton').onclick = () => saveEditedPlayer(player.name);
    document.getElementById('cancelEditButton').onclick = () => {
        editFormContainer.style.display = 'none';
    };
}
function saveEditedPlayer(playerName) {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const playerIndex = players.findIndex((p) => p.name === playerName);
    if (playerIndex !== -1) {
        players[playerIndex] = {
            ...players[playerIndex],
            name: document.getElementById('editName').value,
            photo: document.getElementById('editPhoto').value,
            position: document.getElementById('editPosition').value,
            nationality: document.getElementById('editNationality').value,
            flag: document.getElementById('editFlag').value,
            club: document.getElementById('editClub').value,
            rating: document.getElementById('editRating').value,
            pace: document.getElementById('editPace').value,
            shooting: document.getElementById('editShooting').value,
            passing: document.getElementById('editPassing').value,
            dribbling: document.getElementById('editDribbling').value,
            defending: document.getElementById('editDefending').value,
            physical: document.getElementById('editPhysical').value,
        };

        localStorage.setItem('players', JSON.stringify(players));

        renderPlayers();
        document.getElementById('editFormContainer').style.display = 'none';
    }
}
function renderPlayers() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const container = document.getElementById('playerContainer');
    container.innerHTML = '';
    players.forEach((player) => lwskh(player));
}
renderPlayers();


// ---------------delete card player------------------


function deletePlayer(playerName) {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const updatedPlayers = players.filter((player) => player.name !== playerName);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    renderPlayers();
}
function renderPlayers() {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    const container = document.getElementById('playerContainer');
    container.innerHTML = '';
    players.forEach((player) => lwskh(player));
}
renderPlayers();


// -------------------------------------