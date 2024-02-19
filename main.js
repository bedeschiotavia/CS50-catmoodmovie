
// API
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

const moodButtons = document.querySelectorAll('.mood-btn');
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedMoodGenre = button.getAttribute('data-genre');
        const selectedMoodSimilar = button.getAttribute('data-similar');//Stopped here!
        const moodURL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${selectedMoodGenre}&api_key=${API_KEY}---${selectedMoodSimilar}`;
        getMovies(moodURL);
        console.log(moodURL);
    });
});

// Data from TMDB
function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                showMovies(data.results);
                console.log(data.results);
            } else {
                console.error("No results found");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Show results
function showMovies(data) {
    const main = document.getElementById('main');
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" >
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average.toFixed()}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieElement);
    });
    
}

// Change color vote average
function getColor(vote) {
    if (vote.toFixed() >= 7) {
        return 'green';
    } else if (vote.toFixed() >= 4) {
        return 'yellow';
    } else {
        return 'red';
    }
}

// Search for name
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
});
