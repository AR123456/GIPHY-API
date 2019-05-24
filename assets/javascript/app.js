const topic = [
  "shocked dog",
  "chihuahua",
  "baby",
  "puppy",
  "Ryan Gosling ",
  "Saint Bernard",
  "Love gnome",
  "waving",
  "Llama",
  " Reaction",
  "Good Morning ",
  "Happy Dance",
  "Nope",
  "narwhal",
  "Robert Redford"
];

function renderButtons() {
  $("#giphy-view").empty();

  for (let i = 0; i < topic.length; i++) {
    let gifButton =
      '<button class="gif" data-name="' +
      topic[i] +
      '">' +
      topic[i] +
      "</button>";

    $("#giphy-view").append(gifButton);
  }
}

renderButtons();

$("#add-giphy").on("click", function(event) {
  event.preventDefault();

  let giphy = $("#giphy-input")
    .val()
    .trim();

  topic.push(giphy);
  $("#giphy-input").val("");

  renderButtons();
});

$("#giphy-view").on("click", ".gif", function() {
  $("#giphy-div").empty();

  let searchTerm = $(this).attr("data-name");

  const queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    // "&api_key=dc6zaTOxFJmzC&limit=10";
    "&api_key=dwjvshF3IN3EJz7nNgFu7c9FeTZggQL7&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (let i = 0; i < response.data.length; i++) {
      let gifDiv = $("<div>");

      let p = $("<p>").text("Rating: " + response.data[i].rating);

      let gifImage = $("<img class ='gif'>");

      gifImage.attr("src", response.data[i].images.fixed_height_still.url);
      gifImage.attr({
        "data-animate": response.data[i].images.fixed_height.url,
        "data-state": "still",
        "data-still": response.data[i].images.fixed_height_still.url
      });

      gifDiv.append(p);
      gifDiv.append(gifImage);

      $("#giphy-div").prepend(gifDiv);
    }

    $(".gif").on("click", function() {
      let state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
      } else if (state === "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
      }
    });
  });
});
