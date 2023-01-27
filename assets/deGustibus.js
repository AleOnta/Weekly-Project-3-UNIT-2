const toFetch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

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
            <h5 class="card-title" deezRank=${song[0].rank}>${song[0].title}</h5>
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
            <h5 class="card-title" deezRank=${song[0].rank}>${song[0].title}</h5>
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

  // call function to create the array for the ranking alert
  const rankArray = await myAlertRank();
  await sortedRank(rankArray);
};

const myAlertRank = async function () {
  const mySongsTitle = document.querySelectorAll("h5");
  console.log(mySongsTitle);
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
    return a.rank - b.rank;
  });
  console.log("ordered", ordered);

  // get the reference to the alert ol
  const alertRank = document.querySelector("#rankList");
  console.log(alertRank);
  ordered.forEach((song) => {
    alertRank.innerHTML += `
    <li>${song.title} with a score of: ${song.rank}</li>
    `;
  });
  alertRank.style.display = "block";
};

const firstSectionFetcher = function () {
  singerDisplayer(toFetch + "BringItOnHome");
  singerDisplayer(toFetch + "SinceI'veBeenLovingYou");
  singerDisplayer(toFetch + "D'yerMak'er");
  singerDisplayer(toFetch + "AchillesLastStand");
};

const stackingFunctions = function () {
  firstSectionFetcher();
  myFavDisplayer(toFetch + "WhenTheLeveeBreaks");
  innerCarousel(toFetch + "LedZeppelinIV", toFetch + "LetThereBeRock", toFetch + "StartMeUp");
};

window.onload = stackingFunctions();
