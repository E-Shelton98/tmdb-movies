const FORM = document.getElementById('form')
let searchBar = document.getElementById('search')
let mediaType = 'tv'


const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

async function getMovies(route, mediaType, searchedItem) {
  const DISCOVER = `https://tmdb-movies-backend.herokuapp.com/discover?type=${mediaType}`
  const SEARCH = `https://tmdb-movies-backend.herokuapp.com/search?type=${mediaType}&query=${searchedItem}`

 
  if (route === 'search') {
  const res = await fetch(SEARCH)
  let data = await res.json()

  console.log(data.data.results)
  } else if (route === 'discover') {
    const res = await fetch(DISCOVER)
    let data = await res.json()

    console.log(data.data.results)
  }

  
}

FORM.addEventListener('submit', (e) => {
  e.preventDefault()
  let searchTerm = searchBar.value
  if (searchTerm && searchBar !== '') {
    getMovies('search', mediaType, searchTerm)

    searchTerm.value = ''
  }
})
