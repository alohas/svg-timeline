"use strict";

let movieData = [];
let xdif;
let ydif;
let labelHeight;
let labelWidth;

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
      ydif =
        document.querySelector("#infoline > line").y1.baseVal.value -
        document.querySelector("#infoline > line").y2.baseVal.value;
      xdif =
        document.querySelector("#infoline > line").x2.baseVal.value -
        document.querySelector("#infoline > line").x1.baseVal.value;
    });

  fetch("final_infobox.svg")
    .then(e => e.text())
    .then(svg => {
      document.querySelector("div.infoboxContainer").innerHTML = svg;
      let labelStyles = getComputedStyle(
        document.querySelector("#infobox_template > g > rect")
      );
      labelHeight = labelStyles.height;
      labelWidth = labelStyles.width;
    });
}

function addingEvents() {
  let circles = document.getElementsByClassName("movie");
  for (let item of circles) {
    item.addEventListener("click", e => {
      popUpShow(item.id);
      console.log(e.target.cx.baseVal.value);
      console.log(e.target.cy.baseVal.value);
      console.log(`${labelHeight}, ${labelWidth}`);

      console.log();
      if (false == true) {
      } else {
        document.querySelector("#infoline > line").x1.baseVal.value =
          e.target.cx.baseVal.value;
        document.querySelector("#infoline > line").y1.baseVal.value =
          e.target.cy.baseVal.value;

        document.querySelector("#infoline > use").x.baseVal.value =
          e.target.cx.baseVal.value + xdif;

        document.querySelector("#infoline > line").y2.baseVal.value =
          document.querySelector("#infoline > use").y.baseVal.value +
          parseInt(labelHeight);

        document.querySelector("#infoline > line").x2.baseVal.value =
          document.querySelector("#infoline > line").x1.baseVal.value +
          xdif +
          3;
      }
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
}

loadSVG();
loadJSON();
