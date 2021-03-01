const MAIN = document.getElementById('main')
const FORM = document.getElementById('form')
const MEDIA = document.getElementsByName('media')
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
let searchBar = document.getElementById('search')

function getMediaType() {
  if (MEDIA[0].checked) {
    return ('tv')
  } else if (MEDIA[1].checked) {
    return ('movie')
  }
}

async function getMovies(route, mediaType, searchedItem) {
  const DISCOVER = `https://tmdb-movies-backend.herokuapp.com/discover?type=${mediaType}`
  const SEARCH = `https://tmdb-movies-backend.herokuapp.com/search?type=${mediaType}&query=${searchedItem}`

  if (route === 'search') {
    const res = await fetch(SEARCH)
    let data = await res.json()

    showMovies(data.data.results)
  } else if (route === 'discover') {
    const res = await fetch(DISCOVER)
    let data = await res.json()

    showMovies(data.data.results)
  }
}

getMovies('discover', 'movie')

FORM.addEventListener('submit', (e) => {
  e.preventDefault()
  let searchTerm = searchBar.value
  if (searchTerm && searchBar !== '') {
    let searchedMedia = getMediaType()
    getMovies('search', searchedMedia, searchTerm)

    searchTerm.value = ''
  }
})

function showMovies(movies) {
  MAIN.innerHTML = ''

  movies.forEach((movie) => {
    console.log(movie)
    const { title, name, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')

    movieEl.classList.add('movie')

    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title || name}"
        />
        <div class="movie-info">
          <h3>${title || name}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      `

    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}
