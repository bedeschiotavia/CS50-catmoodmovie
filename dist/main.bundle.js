/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (() => {

eval("\n// API\nconst API_KEY = \"0de926224136493ac1649576d602030e\";\nconst BASE_URL = 'https://api.themoviedb.org/3';\nconst API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&api_key=${API_KEY}`;\nconst IMG_URL = \"https://image.tmdb.org/t/p/w500\";\nconst searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;\n\nconst main = document.getElementById('main');\nconst form = document.getElementById('form');\nconst search = document.getElementById('search');\n\nconst scrollElement = document.getElementById('main');\n\nconst prev = document.getElementById('previous');\nconst next = document.getElementById('next');\nconst current = document.getElementById('current');\n\n\nvar currentPage = 1;\nvar nextPage = 2;\nvar prevPage = 3;\nvar lastUrl = '';\nvar totalPages = 100;\n\n\n\ngetMovies(API_URL);\n\nconst moodButtons = document.querySelectorAll('.mood-btn');\nmoodButtons.forEach(button => {\n    button.addEventListener('click', () => {\n        const selectedMoodGenre = button.getAttribute('data-genre');\n        const selectedMoodKeyword = button.getAttribute('data-keyword');\n        const selectedMoodGenreExcluded = button.getAttribute('data-genre-exclude');\n        const moodURL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${selectedMoodGenre}&with_keywords=${selectedMoodKeyword}&without_genres=${selectedMoodGenreExcluded}&api_key=${API_KEY}`;\n        getMovies(moodURL);\n        scrollElement.scrollIntoView({behavior: 'smooth'});\n    });\n});\n\n// Data from TMDB\nfunction getMovies(url) {\n    lastUrl = url;\n    fetch(url)\n        .then(res => res.json())\n        .then(data => {\n            if (data.results) {\n                showMovies(data.results);\n                console.log(data.results);\n                currentPage = data.page;\n                nextPage = currentPage + 1;\n                prevPage = currentPage -1;\n                totalPages = data.total_pages;\n\n                current.innerText = currentPage;\n\n                if(currentPage <=1) {\n                    prev.classList.add('disabled');\n                    next.classList.remove('disabled');\n                }else if(currentPage>=totalPages) {\n                    prev.classList.remove('disabled');\n                    next.classList.add('disabled');\n                }else {\n                    prev.classList.remove('disabled');\n                    next.classList.remove('disabled');\n                }\n\n                scrollElement.scrollIntoView({behavior: 'smooth'});\n\n            } else {\n                console.error(\"No results found\");\n            }\n        })\n        .catch(error => {\n            console.error(\"Error fetching data:\", error);\n        });\n}\n\n// Show results\nfunction showMovies(data) {\n    const main = document.getElementById('main');\n    main.innerHTML = '';\n\n    data.forEach(movie => {\n        const { title, poster_path, vote_average, overview } = movie;\n        const movieElement = document.createElement('div');\n        movieElement.classList.add('movie');\n        movieElement.innerHTML = `\n            <img src=\"${IMG_URL + poster_path}\" alt=\"${title}\" >\n            <div class=\"movie-info\">\n                <h3>${title}</h3>\n                <span class=\"${getColor(vote_average)}\">${vote_average.toFixed()}</span>\n            </div>\n            <div class=\"overview\">\n                <h3>Overview</h3>\n                ${overview}\n            </div>\n        `;\n        main.appendChild(movieElement);\n    });\n    \n}\n\n// Change color vote average\nfunction getColor(vote) {\n    if (vote.toFixed() >= 7) {\n        return 'green';\n    } else if (vote.toFixed() >= 4) {\n        return 'yellow';\n    } else {\n        return 'red';\n    }\n}\n\n/*Search for name\nform.addEventListener('submit', (e) => {\n    e.preventDefault();\n\n    const searchTerm = search.value;\n\n    if (searchTerm) {\n        getMovies(searchURL + '&query=' + searchTerm);\n    } else {\n        getMovies(API_URL);\n    }\n});*/\n\n// Pagination functions\n\nprev.addEventListener('click', () => {\n    if(prevPage > 0){\n        pageCall(prevPage);\n    }\n})\n\nnext.addEventListener('click', () => {\n    if(nextPage <= totalPages){\n        pageCall(nextPage);\n        \n    }\n})\n\nfunction pageCall(page){\n    let urlSplit = lastUrl.split('?');\n    let queryParams = urlSplit[1].split('&');\n    let key = queryParams[queryParams.length -1].split('=');\n    if(key[0] != 'page') {\n        let url = lastUrl + '&page='+page;\n        getMovies(url);\n    }else {\n        key[1] = page.toString();\n        let joinA = key.join('=');\n        queryParams[queryParams.length -1] = joinA;\n        let joinB = queryParams.join('&');\n        let url = urlSplit[0] +'?'+joinB;\n        getMovies(url);\n    }\n\n}\n\n\n//# sourceURL=webpack://catmoodmovie/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./main.js"]();
/******/ 	
/******/ })()
;