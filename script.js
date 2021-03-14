// array para armazenar os favoritos
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const imgContainer = document.querySelector(".c-image");
const button = document.querySelector(".js-random");
const btnClearAll = document.querySelector(".c-button--delete-all");
const wrapper = document.querySelector(".c-title-wrapper");

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

  wrapper.classList.add("c-title-wrapper--hidden");

  if (positionRemove != -1) {
    imgContainer.classList.add("fav");
    wrapper.classList.remove("c-title-wrapper--hidden");
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

  if (favorites.length > 0) {
    wrapper.classList.remove("c-title-wrapper--hidden");

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
}

//remove favoritos da lista de imagem
function removeFavoriteImage(index) {
  const listFavorite = document.querySelector(".c-list");

  //remove do array
  favorites.splice(index, 1);
  //salva o novo array no localstorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
  //limpa a tela
  listFavorite.innerHTML = "";
  //carrega os novo array
  loadFavoriteImage(favorites);

  if (favorites.length == 0) {
    wrapper.classList.add("c-title-wrapper--hidden");
    listFavorite.innerHTML = "";
  }
}

function clearLocalStorage() {
  const hidden = wrapper.classList.contains("c-title-wrapper--hidden");

  if (!hidden) {
    wrapper.classList.add("c-title-wrapper--hidden");
  }

  const listFavorite = document.querySelector(".c-list");
  //limpa o localstorage
  localStorage.clear();
  //pega o novo array (vazio)
  favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  //atualiza o icone de favorito (estrela)
  updateClasses();

  //atualiza a tela
  listFavorite.innerHTML = "";
}

//inicia a aplicação
function init() {
  getExternalImage();
  loadFavoriteImage(favorites);
}

init();
