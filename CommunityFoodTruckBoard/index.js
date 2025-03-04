/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the game data about the crowd funded games from the games.js file
// import the food truck data
import GAMES_DATA from './games.js';

// The GAMES_DATA is an array of objects
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
        
        // Get the Instagram handle from the data or create from name if not provided
        const instagramHandle = game.instagram || game.name.toLowerCase().replace(/\s+/g, '_');
        const instagramUrl = `${instagramHandle}/`;
        
        // set the inner HTML using a template literal to display info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <a href="${instagramUrl}" target="_blank" class="view-menu-btn">View Instagram</a>`;

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

// Set up the refresh button
const allBtn = document.getElementById("all-btn");
if (allBtn) {
    allBtn.addEventListener('click', showAllGames);
    allBtn.textContent = "Refresh Food Trucks";
}

// Add search functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    // Update placeholder to match food trucks theme
    searchInput.placeholder = "Search food trucks...";
    
    searchInput.addEventListener('input', (e) => {
        // Get lowercase search term
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter food trucks that match search term in name or description
        const filteredGames = GAMES_JSON.filter(game => 
            game.name.toLowerCase().includes(searchTerm) || 
            game.description.toLowerCase().includes(searchTerm)
        );
        
        // Display filtered results
        addGamesToPage(filteredGames);
    });
}

// Show all food trucks initially
showAllGames();