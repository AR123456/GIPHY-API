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


//all buttons get gifs from web site
//javascript, jQuery
// //the way from the website javascript 
// var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });

//the way using jquery ajax  
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + add-giphy +"ryan+gosling&api_key=dc6zaTOxFJmzC&limit=5";

$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log("the jquery ajax call", response);
  });

// ----------

// *********
//this code will load the gif paused and on click play it 
// $(".gif").on("click", function() {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
//   });