// make an array of giphs 
var topic = ["shocked dog", "chihuahua","baby", "puppy", "Ryan Gosling ","Saint Bernard", "Love gnome", "waving", "Llama"," Reaction", "Good Morning ","Happy Dance", "Nope", "Chris Hemsworth","narwhal","Robert Redford" ];
// console.log("this is giphys:  "+ topic);
//function to display giphy buttons 
function renderButtons(){
  //remove repeats 
  $("#giphy-view").empty();
  //loop array to add movies 
  for (var i = 0; i < topic.length; i++) {
    var gifButton = '<button class="gif" data-name="' + topic[i] + '">' + topic[i] +'</button>';
  // //    generate buttons 
   $("#giphy-view").append(gifButton);
  }
};
// call the render buttons function to process the array 
  renderButtons();
//function for adding user created button 
$("#add-giphy").on("click",function(event){
  //stop form from submitting itself
  event.preventDefault();
  //get text from imput box 
  var giphy = $("#giphy-input").val().trim();
  // $(giphy).addClass("gif");
    //add var giphy to the topic array
  topic.push(giphy);
  $("#giphy-input").val("");
  //call the renderButtons function to display the original array of topics
  renderButtons();
});
 // Adding click event listen listener to all buttons
 $("#giphy-view").on("click", ".gif", function() {
  //  console.log("this was clicked");
  $("#giphy-div").empty();
    // Grabbing and storing the data property value from the button
  var searchTerm = $(this).attr("data-name");
  // Constructing a queryURL using the searchTerm name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
        .done(function(response) {
          // Looping through each result item
          for (var i = 0; i < response.data.length; i++) {
            // Creating and storing a div tag
            var gifDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + response.data[i].rating);
            // Creating and storing an image tag, adding class to activate animation
            var gifImage = $("<img class ='gif'>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", response.data[i].images.fixed_height_still.url);
            gifImage.attr({
              // storing multiple  urls to same image, one for animated state, and the other
              // a standard still shot \\
              'data-animate': response.data[i].images.fixed_height.url,
              'data-state': "still",
              'data-still': response.data[i].images.fixed_height_still.url
               })
               // Appending the paragraph and image tag to the gifDiv
               gifDiv.append(p);
             gifDiv.append(gifImage);
            // Prependng the gifDiv to the HTML page in the "#giphys" div
            $("#giphy-div").prepend(gifDiv);
          }
                 // call .gif class to add animation */
                 $(".gif").on("click", function() {
                 // The attr jQuery method to get or set the value of  attribute on HTML 
                var state = $(this).attr('data-state');
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.Then, set the image's data-state to animate,Else set src to the data-still value
                 if (state === "still") {
                 $(this).attr("data-state", "animate");
                 $(this).attr("src", $(this).attr("data-animate"));
                       } else if  (state ==="animate"){
                  $(this).attr("data-state", "still");
                  $(this).attr("src", $(this).attr("data-still"));
                }
                }); 
        });
   });


