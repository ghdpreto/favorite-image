// array para armazenar os favoritos
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//criando o elemento img
const img = document.createElement("img");

// ao abrir o programa pegar a imagem externa
async function getExternalImage() {
  //url: source.unsplash.com/random
  // buscando img na api
  const response = await fetch("https://source.unsplash.com/random");

  //criando o elemento img
  img.setAttribute("src", response.url);

  //colocando o img dentro da div
  const cImage = document.querySelector(".c-image");
  cImage.appendChild(img);
}

//clicar no random, pegar a img externa
document.querySelector("button").onclick = () => {
  getExternalImage();
};
//clicar na imagem
document.querySelector(".c-image").onclick = () => {
  const imgContainer = document.querySelector(".c-image");
  const imgSrc = document.querySelector(".c-image img").src;

  let positionRemove = favorites.indexOf(imgSrc);
  if (positionRemove != -1) {
    favorites.splice(positionRemove, 1);
    imgContainer.classList.remove("fav");
  } else {
    favorites.push(imgSrc);
    imgContainer.classList.add("fav");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

//salvar no localstorage ou remover
getExternalImage();
