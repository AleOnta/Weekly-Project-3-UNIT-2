const toFetch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const quotedAlbums = [];
const quotedSongs = [];

const myFetcher = async function (request) {
  try {
    let myRes = await fetch(request);

    if (myRes.ok) {
      let resJSON = await myRes.json();
      quotedAlbums.push(resJSON.data[0].album.title);
      quotedSongs.push(resJSON.data[0].title);
      return resJSON.data;
    }
  } catch (err) {}
};

const singerDisplayer = async function (url) {
  let song = await myFetcher(url);
  let myFirstSection = document.querySelector("#mySinger");

  myFirstSection.innerHTML += `
  <div class="col d-flex justify-content-center">
    <div class="card bg-dark-subtle" id="myCard" style="max-width: 20rem">
          <img src=${song[0].album.cover_big} class="card-img-top" alt="image of ${song[0].album.title}" />
          <div class="card-body">
            <h5 class="card-title" deezRank=${song[0].rank}>${song[0].title}</h5>
          </div>
          <ul class="list-group list-group-flush bg-body-secondary">
            <li class="list-group-item bg-secondary-subtle">Album: ${song[0].album.title}</li>
          </ul>
          <div class="card-body p-2 d-flex justify-content-center">
            <button type="button" class="btn cardButton d-flex align-items-center">
              <a class="text-light" href=${song[0].link} target="_blank">
                Listen Now
              </a>
            </button>
          </div>
      </div>
  </div>
    `;
};

const myFavDisplayer = async function (url) {
  let song = await myFetcher(url);
  let myFavSection = document.querySelector("#myFav");

  myFavSection.innerHTML = `
  <div class="col-12 d-flex justify-content-center my-5">
    <div class="card mb-3 bg-dark-subtle" id="favCard">
      <div class="row g-0">
        <div class="col-md-4">
          <img src=${song[0].album.cover_big} class="img-fluid rounded-start" alt="image of ${song[0].album.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body d-md-flex flex-column justify-content-around " id="favText">
            <h5 class="card-title" deezRank=${song[0].rank}>${song[0].title}</h5>
            <p class="card-text" id="songDesc">
            "When the Levee Breaks" was re-worked by English rock group Led Zeppelin as the last 
            song on their untitled fourth album. Singer Robert Plant used many of the original lyrics and the songwriting 
            is credited to Memphis Minnie and the individual members of Led Zeppelin. Many other artists have performed 
            and recorded versions of the song.
            Led Zeppelin recorded "When the Levee Breaks" for their untitled fourth album. When considering material for the 
            group to record, singer Robert Plant suggested the Kansas Joe McCoy and Memphis Minnie song. Jimmy Page 
            commented that while Plant's lyrics identified with the original, he developed a new guitar riff that set it apart.
            However, it is John Bonham's drumming that is usually noted as the defining characteristic of the song.
            </p>
            <p class="card-text" id="update"><small class="text-muted">Last updated 1971</small></p>
          </div>
        </div>
      </div>
    </div>
</div>
    `;
};

const innerCarousel = async function (url1, url2, url3) {
  let song1 = await myFetcher(url1);
  let song2 = await myFetcher(url2);
  let song3 = await myFetcher(url3);

  // pick the element to innerHTML the album pics
  let carousel = document.querySelector("#innerCarousel");
  carousel.innerHTML = `
    <div class="carousel-item active" data-bs-interval="3000">
      <img src=${song1[0].album.cover_xl} class="d-block w-100" alt="photo of ${song1[0].album.title}">
      <div class="carousel-caption d-none d-md-block">
        <h2>${song1[0].album.title}</h2>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src=${song2[0].album.cover_xl} class="d-block w-100" alt="photo of ${song2[0].album.title}">
      <div class="carousel-caption d-none d-md-block">
        <h2>${song2[0].album.title}</h2>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src="${song3[0].album.cover_xl}" class="d-block w-100" alt="photo of ${song3[0].album.title}">
      <div class="carousel-caption d-none d-md-block">
        <h2>${song3[0].album.title}</h2>
      </div>
    </div>
    `;

  // call function to create the array for the ranking alert
  const rankArray = await myAlertRank();
  await sortedRank(rankArray);
};

const myAlertRank = async function () {
  const mySongsTitle = document.querySelectorAll("h5");
  const rankArray = [];
  mySongsTitle.forEach((item) => {
    rankArray.push({
      title: item.innerText,
      rank: parseInt(item.getAttribute("deezRank")),
    });
  });
  return rankArray;
};

const sortedRank = async function (arr) {
  let ordered = arr.sort((a, b) => {
    return b.rank - a.rank;
  });

  // get the reference to the alert ol
  const alertRank = document.querySelector("#rankList");
  ordered.forEach((song) => {
    alertRank.innerHTML += `
    <li class="d-flex align-items-center songRanked">${song.title} with a score of <i class="bi bi-arrow-right mx-3"></i> ${song.rank} <i class="bi bi-headphones mx-3"></i></li>
    `;
  });
};

// create a variable storing the reference to the button for the ranking
const rankButton = document.getElementById("myRank");
// create a function to add / remove opacity to the alert depending on it's value
const rankDisplayer = function () {
  const alertDiv = document.getElementById("alertContainer");
  alertDiv.classList.toggle("shown");
};

// add event listener to the button, on click invoke function
rankButton.onclick = rankDisplayer;

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

const modalConstructor = function () {
  const albums = removeDuplicates(quotedAlbums);
  const songs = quotedSongs;

  const albumList = document.getElementById("albumsRecap");
  albumList.innerHTML = "";
  albums.forEach((album) => {
    albumList.innerHTML += `
      <li>${album}</li>
      `;
  });

  const songList = document.getElementById("songsRecap");
  songList.innerHTML = "";
  songs.forEach((song) => {
    songList.innerHTML += `
      <li>${song}</li>
      `;
  });
};

const modalReference = document.getElementById("mySongList");
modalReference.addEventListener("click", modalConstructor);

const firstSectionFetcher = function () {
  singerDisplayer(toFetch + lzToFetch[randomFetch[0]]);
  singerDisplayer(toFetch + lzToFetch[randomFetch[1]]);
  singerDisplayer(toFetch + lzToFetch[randomFetch[2]]);
  singerDisplayer(toFetch + lzToFetch[randomFetch[3]]);
};

// I've used this method because i realized i just love too many Led Zeppelin's songs...
const lzToFetch = [
  "BringItOnHome",
  "SinceI'veBeenLovingYou",
  "DazedAndConfused",
  "AchillesLastStand",
  "StairwayToHeaven",
  "WholeLottaLove",
  "RambleOn",
  "D'yerMak'er",
];

let randomFetch = [];
while (randomFetch.length < 4) {
  let r = Math.floor(Math.random() * 7) + 1;
  if (randomFetch.indexOf(r) === -1) randomFetch.push(r);
}

const stackingFunctions = function () {
  firstSectionFetcher();
  myFavDisplayer(toFetch + "WhenTheLeveeBreaks");
  innerCarousel(toFetch + "LedZeppelinIV", toFetch + "LetThereBeRock", toFetch + "StartMeUp");
};

window.onload = stackingFunctions();
