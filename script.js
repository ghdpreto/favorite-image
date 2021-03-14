// array para armazenar os favoritos
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const imgContainer = document.querySelector(".c-image");
const button = document.querySelector(".js-random");
const btnClearAll = document.querySelector(".c-button--delete-all");

//criando o elemento img
const img = document.createElement("img");

//clicar no random, pegar a img externa
button.onclick = () => {
  updateImage();
  getExternalImage();
};

btnClearAll.onclick = () => {
  clearLocalStorage();
};

//clicar na imagem
imgContainer.onclick = () => {
  updateAll();
};

//metodos
function getState() {
  const imgSrc = document.querySelector(".c-image img").src;
  const positionRemove = favorites.indexOf(imgSrc);

  return { imgSrc, positionRemove };
}

function updateAll() {
  updateStorage();
  updateClasses();
}

function updateStorage() {
  const { imgSrc, positionRemove } = getState();
  const listFavorite = document.querySelector(".c-list");
  if (positionRemove != -1) {
    favorites.splice(positionRemove, 1);
    listFavorite.innerHTML = "";
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavoriteImage(favorites);
  } else {
    favorites.push(imgSrc);
    listFavorite.innerHTML = "";
    loadFavoriteImage(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

function updateClasses() {
  const { positionRemove } = getState();

  imgContainer.classList.remove("fav");

  if (positionRemove != -1) {
    imgContainer.classList.add("fav");
  }
}

async function updateImage() {
  await getExternalImage();
  updateClasses();
}

async function getExternalImage() {
  // buscando img na api
  const response = await fetch("https://source.unsplash.com/random");
  //criando o elemento img
  img.setAttribute("src", response.url);
  img.classList.add("c-image__item");
  //colocando o img dentro da div
  imgContainer.appendChild(img);
}

//exibindo imagens salvas
function loadFavoriteImage(favorites) {
  const listFavorite = document.querySelector(".c-list");

  //criando os itens da lista de favoritos
  for (let i = 0; favorites.length > i; i++) {
    if (favorites.length !== 0) {
      imgItem = `
          <div class="c-list__item">
          <img class="c-list__img" src="${favorites[i]}" data-key="${i}" />
          <button class="c-button c-button--remove" onclick="removeFavoriteImage(${i})" >Remover</button>
          </div>`;
      listFavorite.innerHTML += imgItem;
    }
  }
}

//remove favoritos da lista de imagem
function removeFavoriteImage(index) {
  const listFavorite = document.querySelector(".c-list");

  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  listFavorite.innerHTML = "";
  loadFavoriteImage(favorites);
}

function clearLocalStorage() {
  localStorage.clear();
  updateStorage();
}

//inicia a aplicação
function init() {
  getExternalImage();
  loadFavoriteImage(favorites);
}

init();
