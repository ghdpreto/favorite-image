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

  if (positionRemove != -1) {
    favorites.splice(positionRemove, 1);
  } else {
    favorites.push(imgSrc);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
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
getExternalImage();
