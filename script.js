"use strict";

let movieData = [];

function loadJSON() {
  fetch("potterfilms.json")
    .then(e => e.json())
    .then(data => {
      movieData = data;
      //console.log(movieData);
    });
}

function loadSVG() {
  fetch("final_timeline.svg")
    .then(e => e.text())
    .then(svg => {
      document.querySelector("div.timeline").innerHTML = svg;
      addingEvents();
    });

  fetch("final_infobox.svg")
    .then(e => e.text())
    .then(svg => {
      document.querySelector("div.infoboxContainer").innerHTML = svg;
    });
}

function addingEvents() {
  let circles = document.getElementsByClassName("movie");
  for (let item of circles) {
    item.addEventListener("click", e => {
      popUpShow(item.id);
      console.log(e.target.cx.baseVal.value);
      console.log(e.target.cy.baseVal.value);
    });
  }
}

function popUpShow(movie) {
  document.querySelector("#infoboxes").style.display = "block";
  let movienumber = parseInt(movie) - 1;
  let myMovie = movieData[movienumber];
  document.querySelector("#title").textContent = myMovie.title.original;
  document.querySelector("#danish_title").textContent = myMovie.title.danish;
  document.querySelector("#release_date").textContent = myMovie.year;
  document.querySelector("#duration").textContent = myMovie.lenght;
  document.querySelector("#director").textContent = myMovie.direcetor;
  document.querySelector("#screenplay").textContent =
    myMovie.writers.screenplay;
  document
    .querySelector("#poster")
    .setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "href",
      `images/${myMovie.poster}`
    );

  let xdif = 10;
  let ydif = 10;
}

loadSVG();
loadJSON();
