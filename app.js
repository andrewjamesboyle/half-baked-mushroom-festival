// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    let newFriendName = friendInputEl.value;
    if (friendInputEl.value === '') {
        newFriendName = `Friend # ${Math.ceil(Math.random() * 1000)}`;
    }
    
    const myNewFriend = {
        name: newFriendName,
        satisfaction: 1
    };

    friendData.push(myNewFriend);

    displayFriends();

    friendInputEl.value = '';

    // get the name from the input
    // create a new friend object
    // push it into the friends state array, passed in as an argument
    // reset the input
    // display all the friends (use a function here)
});

function displayFriends() {
    friendsEl.textContent = '';
    // clear out the friends in DOM

    // for each friend in state . . .
    for (let friend of friendData) {
        const myNewFriendEl = renderFriend(friend);
        myNewFriendEl.addEventListener('click', () => {
            if (friend.satisfaction < 3 && mushroomCount > 0) {
                friend.satisfaction++;
                mushroomCount--;
                displayMushrooms();
            } else if (mushroomCount === 0) {
                alert('Time to go foraging!');
            } else {(friend.satisfaction > 3);
                friend.satisfaction++;
                mushroomCount--;
                displayMushrooms();
                alert(`Oh no! You over fed your friend ${friend.name}!!`);
            }
            displayFriends();
        });
        
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        
        friendsEl.append(myNewFriendEl);
        // append the friendEl to the friends list in DOM
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';

    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const newMushroomEl = renderMushroom(mushroomsEl);
        mushroomsEl.append(newMushroomEl);
    }
}

displayFriends();
displayMushrooms();
