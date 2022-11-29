import { fetchImages } from './js/fetch-images.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-input');
const btnSearch = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');


btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', event => {
  event.preventDefault();
  cleanGallery();
  const inputValue = input.value.trim();
  if (inputValue !== '') {
    fetchImages(inputValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        markupImageList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

btnLoadMore.addEventListener('click', () => {
  pageNumber++;
  const inputValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  fetchImages(inputValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
        markupImageList(foundData.hits);
        btnLoadMore.style.display = 'block';
    }
  });
});

function markupImageList(images) {
   const markup = images
    .map(image => {
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
    <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;
}




function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}

