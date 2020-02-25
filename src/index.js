document.addEventListener("DOMContentLoaded", () => {
  const allDogs = [];
  const allDogsByChar = {};
  const breedsUl = document.getElementById("dog-breeds");
  const breedDropdown = document.getElementById("breed-dropdown");
  fetchBreeds();
  fetchImages();
  addEventToChangeBackgroundColor(breedsUl);
  addEventToShowDogsByChar(breedDropdown);

  function addEventToShowDogsByChar(sel) {
    sel.addEventListener('change', function (evt) {
      const ch = evt.target.value;
      renderDogsBreeds(ch);
    })
  }

  function clearElementChildren(el) {
    el.innerHTML = '';
  }

  function addEventToChangeBackgroundColor(ul) {
    ul.addEventListener("click", function (evt) {
      if (evt.target.nodeName === "LI") changeColor(evt);
    });
  }

  function randomizeColor() {
    const r = `${getRandomValue()}%`,
      g = `${getRandomValue()}%`,
      b = `${getRandomValue()}%`;
    return `${r}${g}${b}`;
  }

  function getRandomValue() {
    return Math.floor(Math.random() * 100);
  }

  function changeColor(evt) {
    evt.target.style.backgroundColor = `rgb(${randomizeColor()})`;
  }

  function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    return fetch(imgUrl)
      .then(response => response.json())
      .then(json => addImages(json));
  }

  function addImages(json) {
    const container = document.getElementById("dog-image-container");
    json.message.forEach(dogURL => {
      const dogImg = document.createElement("img");
      dogImg.src = dogURL;
      container.appendChild(dogImg);
    });
  }

  function fetchBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
      .then(response => response.json())
      .then(json => {
        setAllDogs(json.message);
        setAllDogsByChar();
        renderDogsBreeds();
        renderDropdownOptions();
      });
  }

  function setAllDogs(json) {
    for (dog in json) {
      allDogs.push(dog)
    }
  }

  function setAllDogsByChar() {
    alphabet().forEach(ch => {
      allDogsByChar[ch] = findDogsByChar(ch)
    });
  }

  function renderDropdownOptions() {
    clearElementChildren(breedDropdown);
    breedDropdown.innerHTML = `<option disabled selected>Select One</option>`
    for (ch in allDogsByChar) {
      if (allDogsByChar[ch].length !== 0) {
        breedDropdown.innerHTML += `<option value="${ch}">${ch}</option>`
      }
    }
  }

  function findDogsByChar(ch) {
    return allDogs.filter(dog => dog[0] == ch);
  }

  function renderDogsBreeds(ch = '') {
    const dogs = (ch !== '' && alphabet().includes(ch)) ?
      allDogsByChar[ch] :
      [...allDogs];

    const breedsUl = document.getElementById("dog-breeds");
    clearElementChildren(breedsUl); // clear defaults

    dogs.forEach(dog => breedsUl.innerHTML += `<li>${dog}</li>`);
  }


  function alphabet() {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }
});