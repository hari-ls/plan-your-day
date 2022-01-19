// initialise an empty object for data management
var data = {};
var businessHours = {
  start: 9,
  end: 17,
};

// create the timeblock
var createTimeBlock = function (n) {
  var list = $("tbody");
  var blockRow = $("<tr>");
  var blockHour = $("<th>").addClass("hour");
  var blockContent = $("<td>");
  var contentText = $("<textarea>").addClass("form-control");
  var blockBtn = $("<td>").addClass("saveBtn");
  var btnIcon = $("<i>").addClass("fas fa-save");
  // set attributes
  $(blockHour).attr("scope", "row");
  $(blockHour).text(moment.utc(n * 3600 * 1000).format("hA"));
  $(contentText).attr("rows", "4");
  $(contentText).attr("data-hour", n);
  $(blockBtn).attr("data-hour", n);
  // append elements
  blockContent.append(contentText);
  blockBtn.append(btnIcon);
  blockRow.append(blockHour, blockContent, blockBtn);
  list.append(blockRow);
};
// generate time block for each hour within the business hours
for (var time = businessHours.start; time <= businessHours.end; time++) {
  createTimeBlock(time);
}

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

// listen to click event on save button and update the data in the local storage
$(saveBtn).click(function () {
  // get the button clicked
  var slot = $(this).data("hour");
  // get the value from the coresponding textarea
  var value = $("textarea[data-hour='" + slot + "']").val();
  data[slot] = value;
  setData();
});

// check is data is available and update the data likewise
if (localData) {
  getData();
} else {
  setData();
}

// update the color and value of the timeblock textareas
for (var i = 0; i < textarea.length; i++) {
  updateTimeblockColor(textarea[i]);
  var block = $(textarea[i]);
  var blockHour = $(textarea[i]).data("hour");
  var checkData = data[blockHour];
  // set the textarea value to data value if not null
  if (checkData) {
    $(block).val(checkData);
  }
}
