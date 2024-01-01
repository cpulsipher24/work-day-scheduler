// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Display current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

    // Function to update time block colors based on current time
    function updateTimeBlocks() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }

      // Update time block colors on page load
  updateTimeBlocks();

    // Click event for save button
  $(".saveBtn").on("click", function () {
    var hourId = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    localStorage.setItem(hourId, description);
  });

  // Load saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var hourId = $(this).attr("id");
      var savedDescription = localStorage.getItem(hourId);

      if (savedDescription !== null) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }
  // Load saved events on page load
  loadSavedEvents();
});
