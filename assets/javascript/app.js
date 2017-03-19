
// Initial array of extreme sports
var topics = ["Skateboarding", "Skiing", "Surfing", "Sailing", "Skydiving", "Snowboarding", "Wakeboarding", "Mountain Biking", "Kitesurfing", "Paragliding"];

// displayGiphyInfo function re-renders the HTML to display the correct content
function displayGiphyInfo() {

  // In this case, the "this" keyword refers to the button that was clicked
  var sport = $(this).attr("data-sport");
  // A URL to search Giphy for the name of the sport
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Perform the AJAX request
  $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data comes back from the api
    .done(function(response){
      console.log(queryURL);

      console.log(response);
      // Create variable to store results data
      var results = response.data;

      // Loop through each result
      for (var i = 0; i < results.length; i++) {

        // Create a div to hold the sport in a button
        var sportsDiv = $("<div class='sport'>");

        // Create a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Create an image tag
        var sportImage = $("<img>");

        // Give the image tag an src attribute of a property to pull off the result item
        sportImage.attr("src", results[i].images.fixed_width_still.url);

        sportImage.attr("data-still", results[i].images.fixed_width_still.url);
        sportImage.attr("data-animate", results[i].images.fixed_width.url);

        // Display the rating
        sportsDiv.append(p);
        sportsDiv.append(sportImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the html
        $("#gifs-appear-here").prepend(sportsDiv);
      }
    });

} // closing brace for displayGiphyInfo function


// Function to display movie buttons
function renderButtons() {

  // Delete the movie buttons prior to adding new movie buttons (this) is necessary, otherwise the user will create repeat buttons
  $("#buttons-view").empty();

  // Loop through the array of sportsButtons
  for (var i = 0; i < topics.length; i++) {

    // Dynamically create buttons for each movie in the array
    var a = $("<button>");
    // Adding a class
    a.addClass("sport");
    // Adding a data-attribute with a value of the sport at index i
    a.attr("data-sport", topics[i]);
    // Provide button's text with a value of the sport at index i
    a.text(topics[i]);
    // Add the button to the html
    $("#buttons-view").append(a);
  }
}

// Function is to animate still giphies
function still() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    var animate_url = $(this).attr("data_animate")
    $(this).attr("src", animate_url);
    $(this).attr("data-state", "animate");
  } else {
    var still_url = $(this).attr("data_still")
    $(this).attr("src", still_url);
    $(this).attr("data-state", "still");
  }
};

// Function to handle events where sport button is clicked
$("#add-button").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var sport = $("#new-sport").val().trim();

        // Adding movie from the textbox to our array
        topics.push(sport);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".sport", displayGiphyInfo);
      $(document).on("click", ".sport", still);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


