const APOD_URL = "https://api.nasa.gov/planetary/apod";
const NASA_KEY = "pK6FNZNUOqux2Rcm4o4wX6YLvascd311qVd5KLZ8";

var card = new Howl({src: ['sounds/card-flip.mp3']});
var btn = new Howl({src: ['sounds/btn-click.mp3']});

function getJSONFromAPOD(date, callback) {
  const JSON = {
    url: APOD_URL,
    data: { api_key: NASA_KEY, date: date },
    dataType: "json",
    type: "GET",
    success: callback
  };
  $.ajax(JSON);
}

function renderJSON(data) {
  $(".js-result").attr("aria-hidden", "false");
  if (data.media_type == "image") {
    $(".js-result").html(
      `<div class="result"><p class="inst">click the image to flip card!</p><div class="card"><div class="front"><img class="apod-img" src="${
        data.url
      }" alt="${data.title}"></div><div class="back"><p>${
        data.title
      }</p><time>${data.date}</time><p class="details">${
        data.explanation
      }</p></div></div></div>`
    );
  } else if (data.media_type == "video") {
    $(".js-result").html(
      `<div class="result"><p class="inst">click the bottom to flip card!</p><div class="card"><div class="front"><iframe class="apod-vid" src="${
        data.url
      }" height="200" width="200"></iframe></div><div class="back"><p>${
        data.title
      }</p><time>${data.date}</time><p class="details">${
        data.explanation
      }</p></div></div></div>`
    );
  }
}

//handle max date so user will not input more than today's date in the input field
function handleMaxDate() {
  let today = new Date();
  dd = today.getDate();
  mm = today.getMonth() + 1;
  yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
    if (mm < 10) {
      mm = "0" + mm;
    }
  }
  today = yyyy + "-" + mm + "-" + dd;
  $("#date").attr("max", today);
}

function handleDate() {
  $(".js-form").submit(event => {
    event.preventDefault();
    let date = new Date($("#date").val());
    day = date.getUTCDate();
    month = date.getUTCMonth() + 1;
    year = date.getUTCFullYear();
    date = `${year}-${month}-${day}`;
    getJSONFromAPOD(date, renderJSON);
  });
}

function handleBTNSounds() {
	$('#get-btn').click(() => btn.play());
	$('#play-btn').click(() => btn.play());
	$('#pause-btn').click(() => btn.play());
}

function handleFlip() {
  $(".js-result").on("click", ".card", () => {
    card.play();
    $(".card").toggleClass("flipped");
  });
}

function handler() {
  handleMaxDate();
  handleDate();
  handleFlip();
  handleBTNSounds();
}

$(handler);
