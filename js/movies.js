const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const apiKey = "api_key=e63a90bff45eac4026bd03f0b3dee4fd";
const baseUrl = "https://api.themoviedb.org/3";
const movieUrl = baseUrl + "/discover/movie?" + apiKey;
const searchUrl = baseUrl + "/search/movie?" + apiKey;
const sortMovieUrl =
  baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const mainMovies = document.getElementById("movies");

const form = document.getElementById("form");
const search = document.getElementById("search");
const navbar = document.getElementById("navbar");
const tags = document.getElementById("tags");
const overlayContent = document.getElementById("overlay-content");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const current = document.getElementById("current");
const moviesSection = document.getElementById("movies-section");

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let selectedGenre = [];

setGenre();

function setGenre() {
  tags.innerHTML = "";
  genres.forEach((genre) => {
    const tag = document.createElement("li");
    tag.classList.add("p-2");
    tag.classList.add("tag");
    tag.id = genre.id;
    tag.innerText = genre.name;
    tag.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      getMovies(
        sortMovieUrl + "&with_genres=" + encodeURI(selectedGenre.join(","))
      );
      highlightGenre();
    });
    tags.append(tag);
  });
}

function highlightGenre() {
  const tags = document.querySelectorAll(".tag");

  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
}

let currentPage;
let nextPage;
let previousPage;
let lastUrl;
let totalPages;

getMovies(movieUrl);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        previousPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;
        if (currentPage <= 1) {
          previousButton.classList.add("disabled");
          nextButton.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          previousButton.classList.remove("disabled");
          nextButton.classList.add("disabled");
        } else {
          previousButton.classList.remove("disabled");
          nextButton.classList.remove("disabled");
        }

        navbar.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } else {
        moviesSection.innerHTML = `
        <div class="vh-60">
          <div class="d-flex flex-column align-items-center justify-content-evenly">
            <img src="images/searching.gif" class="w-25" />
            <div class="text-center">
              <h1 class="fw-bold">No Result Found</h1>
              <small class="text-muted d-block">It seems that the movie you're searching for is not yet in our records.</small>
              <small class="text-muted d-block">We did not find any movies related to your search.</small>
            </div>
            <a href="movies.html" class="btn btn-red mt-2">Search Again</a>
          </div>
        </div>
        `;
        setTimeout(() => {
          document.location.reload();
        }, 20000);
      }
    });
}

function showMovies(data) {
  mainMovies.innerHTML = "";
  data.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      id,
      original_language,
    } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("col-lg-3");
    movieElement.classList.add("col-md-4");
    movieElement.innerHTML = `
     <div class="card h-100 mb-3">
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
           <button class="btn btn-red" id="${id}">Read More</button>
         </div>
     </div>`;

    mainMovies.appendChild(movieElement);
    document.getElementById(id).addEventListener("click", () => {
      openNav();
      const content = document.createElement("div");
      content.innerHTML = `
      <div class="content-width">
        <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <img
            src="${
              poster_path
                ? imgUrl + poster_path
                : "https://via.placeholder.com/1080x1580.png?text=Poster+Coming+Soon"
            }"
            class="img-width me-3 mb-3"
            alt="${title}"
            />
          <div class="text-white text-start">
            <h2 class="fw-bold text-center text-lg-start">${title} (${release_date
        .split("-")
        .shift()})
            </h2>    
            <p class="text-center text-lg-start">
              <i class="bi bi-star-fill"></i>
              <span class="fw-bold mx-2">${vote_average}</span>
              <span class="text-uppercase border-start ps-2">${release_date} (${original_language}) </span>
            </p>
            <h5 class="fw-bold text-center text-lg-start">Overview</h5>
            <p>${overview}</p>
          </div>
        </div>
      </div>
      `;
      overlayContent.append(content);
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchUrl + "&query=" + searchTerm);
  } else {
    getMovies(movieUrl);
  }
});

nextButton.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

previousButton.addEventListener("click", () => {
  if (previousPage > 0) {
    pageCall(previousPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParameter = urlSplit[1].split("&");
  let key = queryParameter[queryParameter.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParameter[queryParameter.length - 1] = a;
    let b = queryParameter.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}

const date = new Date();

let year = date.getFullYear();
document.getElementById("year").innerText = year;

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("overlay-content").innerHTML = "";
}
