function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

function new_tab_handling (tab) {
  chrome.storage.sync.get(['form_submitted'], function(result) {
    var today = Number(formatDate(new Date()));
    var hour = Number((new Date()).getHours());
    var minute = Number((new Date()).getMinutes());
    var ts = (hour*100) + minute;
    var submit_day = result.form_submitted;
    chrome.storage.sync.get(['remind_time'], function(result) {
      var rtime = Number(result.remind_time);
      if ((submit_day === undefined || submit_day != today) && (!rtime || ts >= rtime)) {
        chrome.tabs.update(tab.id, {
          url: chrome.extension.getURL("home.html")
        });
      }
    });
  });
};

chrome.tabs.onUpdated.addListener(function(tid, chIngo, tab) {
  if (tab.url === "chrome://newtab/") {
    new_tab_handling(tab);
  }
});
