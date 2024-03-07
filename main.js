
// API
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const scrollElement = document.getElementById('main');

const prev = document.getElementById('previous');
const next = document.getElementById('next');
const current = document.getElementById('current');


var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;



getMovies(API_URL);

const moodButtons = document.querySelectorAll('.mood-btn');
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedMoodGenre = button.getAttribute('data-genre');
        const selectedMoodKeyword = button.getAttribute('data-keyword');
        const selectedMoodGenreExcluded = button.getAttribute('data-genre-exclude');
        const moodURL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${selectedMoodGenre}&with_keywords=${selectedMoodKeyword}&without_genres=${selectedMoodGenreExcluded}&api_key=${API_KEY}`;
        getMovies(moodURL);
        scrollElement.scrollIntoView({behavior: 'smooth'});
    });
});

// Data from TMDB
function getMovies(url) {
    lastUrl = url;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                showMovies(data.results);
                console.log(data.results);
                currentPage = data.page;
                nextPage = currentPage + 1;
                prevPage = currentPage -1;
                totalPages = data.total_pages;

                current.innerText = currentPage;

                if(currentPage <=1) {
                    prev.classList.add('disabled');
                    next.classList.remove('disabled');
                }else if(currentPage>=totalPages) {
                    prev.classList.remove('disabled');
                    next.classList.add('disabled');
                }else {
                    prev.classList.remove('disabled');
                    next.classList.remove('disabled');
                }

                scrollElement.scrollIntoView({behavior: 'smooth'});

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

/*Search for name
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
});*/

// Pagination functions

prev.addEventListener('click', () => {
    if(prevPage > 0){
        pageCall(prevPage);
    }
})

next.addEventListener('click', () => {
    if(nextPage <= totalPages){
        pageCall(nextPage);
        
    }
})

function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page') {
        let url = lastUrl + '&page='+page;
        getMovies(url);
    }else {
        key[1] = page.toString();
        let joinA = key.join('=');
        queryParams[queryParams.length -1] = joinA;
        let joinB = queryParams.join('&');
        let url = urlSplit[0] +'?'+joinB;
        getMovies(url);
    }

}
