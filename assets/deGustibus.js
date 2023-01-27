const myFetcher = async function (request) {
  try {
    let myRes = await fetch(request);

    if (myRes.ok) {
      let resJSON = await myRes.json();

      return resJSON.data;
    }
  } catch (err) {}
};

const singerDisplayer = async function (url) {
  let song = await myFetcher(url);
  let myFirstSection = document.querySelector("#mySinger");

  myFirstSection.innerHTML += `
  <div class="col d-flex justify-content-center">
    <div class="card" id="myCard" style="width: 18rem">
          <img src=${song[0].album.cover_big} class="card-img-top" alt="image of ${song[0].album.title}" />
          <div class="card-body">
            <h5 class="card-title">${song[0].title}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Album: ${song[0].album.title}</li>
          </ul>
          <div class="card-body">
            <a href=${song[0].link} class="card-link">Listen Now</a>
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
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src=${song[0].album.cover_big} class="img-fluid rounded-start" alt="image of ${song[0].album.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${song[0].title}</h5>
            <p class="card-text">"When the Levee Breaks" was re-worked by English rock group Led Zeppelin as the last 
            song on their untitled fourth album. Singer Robert Plant used many of the original lyrics and the songwriting 
            is credited to Memphis Minnie and the individual members of Led Zeppelin.[1] Many other artists have performed 
            and recorded versions of the song.</p>
            <p class="card-text"><small class="text-muted">Last updated 1971</small></p>
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

  // create an object with the rank of the differents albums
  const ranking = {};
  ranking.song1 = song1[0].rank;
  ranking.song2 = song2[0].rank;
  ranking.song3 = song3[0].rank;
  console.log(ranking);
};

const firstSectionFetcher = function () {
  singerDisplayer("https://striveschool-api.herokuapp.com/api/deezer/search?q=BringItOnHome");
  singerDisplayer("https://striveschool-api.herokuapp.com/api/deezer/search?q=SinceI'veBeenLovingYou");
  singerDisplayer("https://striveschool-api.herokuapp.com/api/deezer/search?q=D'yerMak'er");
  singerDisplayer("https://striveschool-api.herokuapp.com/api/deezer/search?q=AchillesLastStand");
};

const stackingFunctions = function () {
  firstSectionFetcher();
  myFavDisplayer("https://striveschool-api.herokuapp.com/api/deezer/search?q=WhenTheLeveeBreaks");
  innerCarousel(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=LedZeppelinIV",
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=LetThereBeRock",
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=StartMeUp"
  );
};

window.onload = stackingFunctions();
