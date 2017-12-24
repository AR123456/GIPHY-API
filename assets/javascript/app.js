//psudocode - make an array of giphs  
var giphys = ["aardvark", "bunny", "cat", "dog", "emu", "fox", "giraffe"," hippo", "impala" ," kangaroo", "lion", "manatee" ,'narwhal' ];
console.log("this is giphys:  "+ giphys);
//function to display giphy buttons 
function renderButtons(){
      //remove repeats 
      $("#giphy-view").empty();
    //loop array to add movies 
    for (var i = 0; i < giphys.length; i++) {
    //generate buttons 
    var a =$("<button>");
    //add class
    a.addClass("gif");
    //use data-name attribute for giphy search 
    a.attr("data-name", giphys[i]);
    //add button text from input box
    a.text(giphys[i]);
    //add the button to the html
    $("#giphy-view").append(a);
    }
  }
  //function for adding user created button 
  $("#add-giphy").on("click",function(event){
    //stop form from submitting itself
    event.preventDefault();
    //get text from imput box 
    var giphy = $("#giphy-input").val().trim();
    //add var giphy to the giphys array
    giphys.push(giphy);
    // call the render buttons function to process the array 
    renderButtons();
      });
    //call the renderButtons function to display the orginal array of giphys
  renderButtons();

//create a function to query ajax and present gif with rating on the rendered Buttons 
 // Adding click event listen listener to all buttons
 $("button").on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  var animal = $(this).attr("data-name");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#giphys" div
        $("#giphy-div").prepend(animalDiv);
      }
    });
});









// ----------

