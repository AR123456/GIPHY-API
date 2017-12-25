// make an array of giphs 
var topic = ["aardvark", "bunny", "cat", "dog", "emu", "fox", "giraffe"," hippo", "impala" ," kangaroo", "lion", "manatee" ,'narwhal' ];
console.log("this is giphys:  "+ topic);
//function to display giphy buttons 
function renderButtons(){
      //remove repeats 
      $("#giphy-view").empty();
    //loop array to add movies 
    for (var i = 0; i < topic.length; i++) {
    //generate buttons 
    var a =$("<button>");
    //add class
    a.addClass("gif");
    //use data-name attribute for giphy search 
    a.attr("data-name", topic[i]);
    //add button text from input box
    a.text(topic[i]);
    //add the button to the html
    $("#giphy-view").append(a);
           }
        };
// call the render buttons function to process the array 
  renderButtons();
  //***** ******** 
  //function for adding user created button 
  $("#add-giphy").on("click",function(event){
    //stop form from submitting itself
    event.preventDefault();
    //get text from imput box 
    var giphy = $("#giphy-input").val().trim();
    $(giphy).addClass("gif");
       //add var giphy to the topic array
    topic.push(giphy);
  
    //call the renderButtons function to display the orginal array of topics
  renderButtons();
//********* */
//create a function to query ajax and present gif with rating on the rendered Buttons 
 // Adding click event listen listener to all buttons
 $(".gif").on("click", function() {
   
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
          console.log(queryURL);
          console.log(response);
          // storing the data from the AJAX request in the results variable
          // var results = response.data;
          // Looping through each result item
          for (var i = 0; i < response.data.length; i++) {
            // Creating and storing a div tag
            var gifDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + response.data[i].rating);
            // Creating and storing an image tag, adding class to activate animatoin 
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
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr('data-state');
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
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

});
