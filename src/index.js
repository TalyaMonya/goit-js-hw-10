import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader-text'),
    errorText: document.querySelector('.error'),
    container: document.querySelector('.cat-info')
}



fetchBreeds()
    .then((data) => {
        refs.select.insertAdjacentHTML('beforeend', createSelect(data))
        refs.select.classList.remove('is-hidden')
        refs.loader.classList.add('is-hidden')
    })
    .catch(() => {
        refs.loader.classList.add('is-hidden')
        refs.select.classList.remove('is-hidden')
        refs.errorText.classList.remove('is-hidden')
    })

function createSelect(arr) {
    return arr.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('')
}

refs.select.addEventListener('change', getIdBreed);


function getIdBreed(evt) {
    refs.container.classList.add('is-hidden')
    refs.select.classList.remove('is-hidden')
    refs.loader.classList.remove('is-hidden')
    const { value } = evt.target;
    
    fetchCatByBreed(value)
        .then((data) => {
            refs.container.innerHTML = createCatCard(data)
            refs.container.classList.remove('is-hidden')
            refs.loader.classList.add('is-hidden')
            refs.errorText.classList.add('is-hidden')
        })
        .catch((err) => {
        console.log(err)
            refs.errorText.classList.remove('is-hidden')
            refs.loader.classList.add('is-hidden')
    })
}


function createCatCard(data) {
    return `<img class="img-cat" src="${data.url}" alt="${data.breeds[0].name}">
      <div class="about-cat"><h2 class="title">${data.breeds[0].name}</h2>
      <p class="description">${data.breeds[0].description}</p>
      <p class="temperament"><span class="temp-title">Temperament:</span> ${data.breeds[0].temperament}</p></div>`
}
