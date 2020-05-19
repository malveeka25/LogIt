function on_load_form_button_click () {
  console.log("Button clicked.");
  chrome.tabs.create({ url: chrome.extension.getURL('home.html') });
};

function on_form_link_button_click () {
  var flink = $("#formLinkInput").val().toString();
  if (flink) {
    chrome.storage.sync.set({'form_link': flink}, function() {
      chrome.tabs.create({ url: chrome.extension.getURL('home.html') });
    });
  }
};

function on_time_change () {
  console.log("Changed");
  var x = $("#timepicker").val().toString();
  var ts = x.substr(0, x.length-3);
  var components = ts.split(":");
  var hour = Number(components[0]), minute = Number(components[1]);
  var section = x.substr(x.length - 2);
  if (section === "PM" && hour != 12) {
    hour += 12;
  }
  var store_time = (hour*100) + minute;
  if (store_time !== undefined) {
    chrome.storage.sync.set({'remind_time': store_time}, function() {});
  }
};

function load_timepicker () {
  chrome.storage.sync.get(['remind_time'], function(result) {
    var rtime = 600;
    if (result.remind_time === undefined) {
      chrome.storage.sync.set({'remind_time': rtime}, function() {});
    } else {
      rtime = Number(result.remind_time);
    }
    $('.timepicker').timepicker({
      timeFormat: 'hh:mm p',
      interval: 60,
      minTime: '00:00am',
      maxTime: '23:00pm',
      defaultTime: rtime.toString(),
      startTime: '00:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true,
      change: on_time_change
    });
  });
};

$(document).ready(function() {
  load_timepicker();
  var loadFormButton = document.getElementById("loadForm");
  loadFormButton.addEventListener("click", on_load_form_button_click);
  var formLinkButton = document.getElementById("formLink");
  formLinkButton.addEventListener("click", on_form_link_button_click);
});
