/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the game data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// The GAMES_DATA is now already an array of objects, no parsing needed
const GAMES_JSON = GAMES_DATA;

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Clear the container first
    deleteChildElements(gamesContainer);

    // Show message if no games match the search
    if (games.length === 0) {
        const noGamesMsg = document.createElement('p');
        noGamesMsg.textContent = 'No Food Trucks found matching your search.';
        noGamesMsg.style.textAlign = 'center';
        noGamesMsg.style.padding = '20px';
        gamesContainer.appendChild(noGamesMsg);
        return;
    }

    // loop over each item in the data
    for (const game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");
        
        // set the inner HTML using a template literal to display info about each game
               // set the inner HTML using a template literal to display info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <button class="view-menu-btn">View Menu</button>`;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games initially
addGamesToPage(GAMES_JSON);

// Show all games function
function showAllGames() {
    addGamesToPage(GAMES_JSON);
}

// Handle buttons
const unfundedBtn = document.getElementById("unfunded-btn");
if (unfundedBtn) unfundedBtn.remove();

const fundedBtn = document.getElementById("funded-btn");
if (fundedBtn) fundedBtn.remove();

const allBtn = document.getElementById("all-btn");
if (allBtn) {
    allBtn.addEventListener('click', showAllGames);
    allBtn.textContent = "Refresh Food Trucks";
}

// Update the description container
const descriptionContainer = document.getElementById("description-container");

// Clear existing description
if (descriptionContainer) {
    deleteChildElements(descriptionContainer);
    
    // Add new description
    const description = `Our company showcases independent games. We've been in operation for 12 years, featuring ${GAMES_JSON.length} unique game titles.`;
    const p = document.createElement('p');
    p.textContent = description;
    descriptionContainer.appendChild(p);
}

// Add search functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        // Get lowercase search term
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter games that match search term in name or description
        const filteredGames = GAMES_JSON.filter(game => 
            game.name.toLowerCase().includes(searchTerm) || 
            game.description.toLowerCase().includes(searchTerm)
        );
        
        // Display filtered results
        addGamesToPage(filteredGames);
    });
}

// Show all games initially
showAllGames();
