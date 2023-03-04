const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
  grabCursor: true,
});

const cubeSwiper = new Swiper(".cube-swiper", {
  effect: "cube",
  cubeEffect: {
    shadow: false,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    snapOnRelease: true,
  },
  autoplay: true,
  grabCursor: true,
});

const apiKey = "api_key=e63a90bff45eac4026bd03f0b3dee4fd";
const baseUrl = "https://api.themoviedb.org/3";
const movieUrl = baseUrl + "/movie/top_rated?" + apiKey;
const seriesUrl = baseUrl + "/tv/top_rated?" + apiKey;
const artistUrl = baseUrl + "/person/popular?" + apiKey;
const nowShowingUrl = baseUrl + "/movie/now_playing?" + apiKey;
const tvSeriesTodayUrl = baseUrl + "/tv/airing_today?" + apiKey;
const upcomingMoviesUrl = baseUrl + "/movie/upcoming?" + apiKey;
const tvSeriesOnAirUrl = baseUrl + "/tv/on_the_air?" + apiKey + "&page=2";
const trendingMoviesUrl = baseUrl + "/trending/movie/day?" + apiKey;
const trendingSeriesUrl = baseUrl + "/trending/tv/day?" + apiKey;
const trendingPeopleUrl = baseUrl + "/trending/person/day?" + apiKey;
const movieTrailerUrl = baseUrl + "/movie/772071/videos";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const moviesHome = document.getElementById("movies-home");
const seriesHome = document.getElementById("series-home");
const artistHome = document.getElementById("artist-home");
const nowShowingMovies = document.getElementById("now-showing");
const tvSeriesToday = document.getElementById("series-today");
const upcomingMovies = document.getElementById("upcoming-movies");
const tvSeriesOnAir = document.getElementById("series-on-air");
const trendingMovies = document.getElementById("trending-movies");
const trendingSeries = document.getElementById("trending-series");
const trendingPeople = document.getElementById("trending-people");
document.querySelector("#header").style.backgroundImage =
  "url('https://source.unsplash.com/1600x900/?movie ')";

getMovies(movieUrl);
getSeries(seriesUrl);
getArtist(artistUrl);
getNowShowing(nowShowingUrl);
getTvSeriesToday(tvSeriesTodayUrl);
getUpcomingMovies(upcomingMoviesUrl);
getTvSeriesOnAir(tvSeriesOnAirUrl);
getTrendingMovies(trendingMoviesUrl);
getTrendingSeries(trendingSeriesUrl);
getTrendingPeople(trendingPeopleUrl);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMoviesHome(data.results);
    });
}

function getSeries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showSeriesHome(data.results);
    });
}

function getArtist(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showArtistHome(data.results);
    });
}

function getNowShowing(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showNowShowingMovies(data.results);
    });
}

function getTvSeriesToday(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTvSeriesToday(data.results);
    });
}

function getUpcomingMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showUpcomingMovies(data.results);
    });
}

function getTvSeriesOnAir(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTvSeriesOnAir(data.results);
    });
}

function getTrendingMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrendingMovies(data.results);
    });
}

function getTrendingSeries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrendingSeries(data.results);
    });
}

function getTrendingPeople(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrendingPeople(data.results);
    });
}

function showMoviesHome(data) {
  moviesHome.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movieElementHome = document.createElement("div");
    movieElementHome.classList.add("swiper-slide");
    movieElementHome.innerHTML = `
    <div class="card card-height">
      <img
        src="${
          poster_path
            ? imgUrl + poster_path
            : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
        }"
        class="card-img-top"
        alt="${title}"
        />
        <div class="card-body d-flex flex-column justify-content-center">
          <h6 class="card-title fw-bold text-center">${title}</h6>
          <div class="d-flex justify-content-between">
            <p>
              <i class="bi bi-star-fill"></i>
              <span class="fw-bold ms-2">${vote_average}</span>
              </p>
              <small class="d-block text-muted">${release_date}</small>
          </div>
        </div>
        
    </div>
    `;

    moviesHome.appendChild(movieElementHome);
  });
}

function showSeriesHome(data) {
  seriesHome.innerHTML = "";
  data.forEach((movie) => {
    const { name, poster_path, vote_average, first_air_date } = movie;
    const seriesElementHome = document.createElement("div");
    seriesElementHome.classList.add("swiper-slide");
    seriesElementHome.innerHTML = `
    <div class="card card-height">
      <img
        src="${
          poster_path
            ? imgUrl + poster_path
            : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
        }"
        class="card-img-top"
        alt="${name}"
        />
        <div class="card-body d-flex flex-column justify-content-center">
          <h6 class="card-title fw-bold text-center">${name}</h6>
          <div class="d-flex justify-content-between">
            <p>
              <i class="bi bi-star-fill"></i>
              <span class="fw-bold ms-2">${vote_average}</span>
              </p>
              <small class="d-block text-muted">${first_air_date}</small>
          </div>
        </div>
    </div>`;

    seriesHome.appendChild(seriesElementHome);
  });
}

function showArtistHome(data) {
  artistHome.innerHTML = "";
  data.forEach((artist) => {
    const { name, profile_path, known_for_department } = artist;
    const artistElementHome = document.createElement("div");
    artistElementHome.classList.add("swiper-slide");
    artistElementHome.innerHTML = `
    <div class="card card-height">
      <img
        src="${
          profile_path
            ? imgUrl + profile_path
            : "https://via.placeholder.com/1080x1580.png?text=Image+Coming+Soon"
        }"
        class="card-img-top"
        alt="${name}"
        />
        <div class="card-body text-center d-flex flex-column justify-content-center">
          <h6 class="card-title fw-bold">${name}</h6> 
          <small class="text-muted">${known_for_department}</small>   
        </div>
    </div>`;

    artistHome.appendChild(artistElementHome);
  });
}

function showNowShowingMovies(data) {
  nowShowingMovies.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, release_date } = movie;
    const nowShowingMoviesElement = document.createElement("div");
    nowShowingMoviesElement.classList.add("swiper-slide");
    nowShowingMoviesElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             poster_path
               ? imgUrl + poster_path
               : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${title}</h5>
             <small class="text-muted">${release_date}</small>
           </div>
         </div>
       </div>
     </div>
     `;

    nowShowingMovies.appendChild(nowShowingMoviesElement);
  });
}

function showTvSeriesToday(data) {
  tvSeriesToday.innerHTML = "";
  data.forEach((series) => {
    const { name, poster_path, first_air_date } = series;
    const tvSeriesTodayElement = document.createElement("div");
    tvSeriesTodayElement.classList.add("swiper-slide");
    tvSeriesTodayElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             poster_path
               ? imgUrl + poster_path
               : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${name}</h5>
             <small class="text-muted">${first_air_date}</small>
           </div>
         </div>
       </div>
     </div>
     `;

    tvSeriesToday.appendChild(tvSeriesTodayElement);
  });
}

function showUpcomingMovies(data) {
  upcomingMovies.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path } = movie;
    const upcomingMoviesElement = document.createElement("div");
    upcomingMoviesElement.classList.add("swiper-slide");
    upcomingMoviesElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             poster_path
               ? imgUrl + poster_path
               : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${title}</h5>
           </div>
         </div>
       </div>
     </div>
     `;

    upcomingMovies.appendChild(upcomingMoviesElement);
  });
}

function showTvSeriesOnAir(data) {
  tvSeriesOnAir.innerHTML = "";
  data.forEach((series) => {
    const { name, poster_path, first_air_date } = series;
    const tvSeriesOnAirElement = document.createElement("div");
    tvSeriesOnAirElement.classList.add("swiper-slide");
    tvSeriesOnAirElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             poster_path
               ? imgUrl + poster_path
               : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${name}</h5>
             <small class="text-muted">${first_air_date}</small>
           </div>
         </div>
       </div>
     </div>
     `;

    tvSeriesOnAir.appendChild(tvSeriesOnAirElement);
  });
}

function showTrendingMovies(data) {
  trendingMovies.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, release_date } = movie;
    const trendingMoviesElement = document.createElement("div");
    trendingMoviesElement.classList.add("swiper-slide");
    trendingMoviesElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             poster_path
               ? imgUrl + poster_path
               : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${title}</h5>
              <small class="text-muted">${release_date}</small>
           </div>
         </div>
       </div>
     </div>
     `;

    trendingMovies.appendChild(trendingMoviesElement);
  });
}

function showTrendingSeries(data) {
  trendingSeries.innerHTML = "";
  data.forEach((series) => {
    const { name, poster_path, first_air_date } = series;
    const trendingSeriesElement = document.createElement("div");
    trendingSeriesElement.classList.add("swiper-slide");
    trendingSeriesElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             poster_path
               ? imgUrl + poster_path
               : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${name}</h5>
              <small class="text-muted">${first_air_date}</small>
           </div>
         </div>
       </div>
     </div>
     `;

    trendingSeries.appendChild(trendingSeriesElement);
  });
}

function showTrendingPeople(data) {
  trendingPeople.innerHTML = "";
  data.forEach((person) => {
    const { name, profile_path, known_for_department } = person;
    const trendingPeopleElement = document.createElement("div");
    trendingPeopleElement.classList.add("swiper-slide");
    trendingPeopleElement.innerHTML = `
     <div class="card">
       <div class="row g-0 align-items-center">
         <div class="col-md-4">
           <img src="${
             profile_path
               ? imgUrl + profile_path
               : "https://via.placeholder.com/1080x1580.png?text=Image+Coming+Soon"
           }" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">${name}</h5>
              <small class="text-muted">${known_for_department}</small>
           </div>
         </div>
       </div>
     </div>
     `;

    trendingPeople.appendChild(trendingPeopleElement);
  });
}

const date = new Date();

let year = date.getFullYear();
document.getElementById("year").innerText = year;
