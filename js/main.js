let itschristmas;

$(document).ready(function () {
  // days countdown
  let today = new Date();
  let month = today.getMonth() + 1; // 0 based
  let day = today.getDate();

  let christmas = new Date();
  if (month == 12 && day > 25) { // next year
    let year = today.getFullYear();
    christmas.setFullYear(year + 1);
  }
  christmas.setMonth(11); // december
  christmas.setDate(25); // day

  const conversion_factor = 1000 * 60 * 60 * 24; // ms in a day
  let delta = Math.floor((christmas - today) / conversion_factor); // days until christmas

  let text;
  if (delta < 1) {
    text = "Buon Natale!";
    $(".container").text(text);
    itschristmas = true;
  } else if (delta === 1) {
    text = "Domani è Natale!";
    $(".container").text(text);
    itschristmas = false;
  }
  else {
    text = `Mancano ${delta} giorni a natale!`;
    $(".container").text(text);
    itschristmas = false;
  }
  document.title = text;

  $(document).click(function () {
    $(".mobile").fadeOut(2500);
  })

  $(document).mousemove(function() {
    if ($(".desktop").is(":visible")) {
      $(".desktop").fadeOut(5000);
    }
  })
})
