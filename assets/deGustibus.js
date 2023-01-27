const myFetcher = async function (request) {
  try {
    let myRes = await fetch(request);
    console.log("response received:", myRes);
    if (myRes.ok) {
      let resJSON = await myRes.json();
      console.log("Json response:", resJSON);
      singerDisplayer(resJSON.data);
      singleDisplayer();
    }
  } catch (err) {}
};

const singerDisplayer = function (obj) {
  let myFirstSection = document.querySelector("#mySinger");

  myFirstSection.innerHTML += `
    <div class="card" id="myCard" style="width: 18rem">
          <img src=${obj[0].album.cover_big} class="card-img-top" alt="image of ${obj[0].album.title}" />
          <div class="card-body">
            <h5 class="card-title">${obj[0].title}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Album: ${obj[0].album.title}</li>
          </ul>
          <div class="card-body">
            <a href=${obj[0].link} class="card-link">Listen Now</a>
          </div>
        </div>
    `;
};

const firstSectionFetcher = function () {
  myFetcher("https://striveschool-api.herokuapp.com/api/deezer/search?q=WhenTheLeveeBreaks");
  myFetcher("https://striveschool-api.herokuapp.com/api/deezer/search?q=WhenTheLeveeBreaks");
  myFetcher("https://striveschool-api.herokuapp.com/api/deezer/search?q=WhenTheLeveeBreaks");
  myFetcher("https://striveschool-api.herokuapp.com/api/deezer/search?q=WhenTheLeveeBreaks");
};
window.onload = firstSectionFetcher();
