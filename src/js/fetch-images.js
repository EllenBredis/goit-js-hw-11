// import axios from 'axios'
export { fetchImages }

const fetchImages = async (query, page) => {
    const BASE_URL = 'https://pixabay.com/api/'
    const KEY = '31660475-e0e95705a798a5ec8190a2e9f'
    return await fetch(
      `${BASE_URL}?key=${KEY}&q=${query}&orientation=horizontal&safesearch=true&image_type=photo&per_page=10&page=${page}`
    )
      .then(async response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return await response.json();
      })
      .catch(error => {
        console.error(error);
      });
  };

