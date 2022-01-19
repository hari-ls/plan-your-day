// initialise an empty object for data management
var data = {};

// select the target elements
var currentDay = $("#currentDay");
var textarea = $("textarea");
var saveBtn = $(".saveBtn");
var currentHour = moment().format("H");

// initialise required operators and variables
var localData = JSON.parse(localStorage.getItem("todays-plan"));
var setData = function () {
  localStorage.setItem("todays-plan", JSON.stringify(data));
};
var getData = function () {
  data = localData;
};

// show today's date on the document
$(currentDay).append(moment().format("dddd, MMMM Do"));

// update the colors for past, present, and future textareas
var updateTimeblockColor = function (el) {
  var attr = $(el).data("hour");
  // compare the data attribute value
  if (attr < currentHour) {
    $(el).addClass("past");
  } else if (attr == currentHour) {
    $(el).addClass("present");
  } else if (attr > currentHour) {
    $(el).addClass("future");
  }
};
// update color for each timeblock textarea
for (var i = 0; i < textarea.length; i++) {
  updateTimeblockColor(textarea[i]);
}

// listen to click event on save button and update the data in the local storage
$(saveBtn).click(function () {
  // get the button clicked
  var slot = $(this).data("hour");
  // get the value from the coresponding textarea
  var value = $("textarea[data-hour='" + slot + "']").val();
  data[slot] = value;
  setData();
});

// check is data is available and update the textarea values likewise
if (localData) {
  getData();
} else {
  setData();
}
for (var i = 0; i < textarea.length; i++) {
  var block = $(textarea[i]);
  var blockHour = $(textarea[i]).data("hour");
  var checkData = data[blockHour];
  // set the textarea value to data value if not null
  if (checkData) {
    $(block).val(checkData);
  }
}
