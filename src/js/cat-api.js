import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_BBfXGN7w6pRvw5HIbE1eCkAhoZAThllS2PyBaLFSFfKpABQ7uh9L1uaaJBc2MKQd";


function fetchBreeds() {
      return axios.get('https://api.thecatapi.com/v1/breeds')
          .then((response) => response.data)
        .catch((error) => error.message)
}

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
         .then((response) => response.data[0])
        .catch((error) => error.message)
}


export {fetchBreeds, fetchCatByBreed}


