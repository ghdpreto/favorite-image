// array para armazenar os favoritos
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const imgContainer = document.querySelector(".c-image");
const button = document.querySelector(".js-random");
//criando o elemento img
const img = document.createElement("img");

//clicar no random, pegar a img externa
button.onclick = () => {
  updateImage();
  getExternalImage();
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
  if (favorites.length !== 0) {
    favorites.forEach((url) => {
      imgItem = `
        <div class="c-list__item">
        <img class="c-list__img" src="${url}" alt="" />
        <button class="c-button c-button--remove" onclick="removeFavoriteImage()">Remover</button>
        </div>`;
      listFavorite.innerHTML += imgItem;
    });
  }
}

function removeFavoriteImage() {
  const { positionRemove } = getState();
  const infoImg = document.querySelectorAll(".c-list__img");
  //verificar como remover a imagem do btn selecionado
  console.log(infoImg);
}

function init() {
  getExternalImage();
  loadFavoriteImage(favorites);
}

init();
