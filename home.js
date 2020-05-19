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
};

function set_bg_image () {
    var bgImages = ['external/img/bg1.jpeg',
                    'external/img/bg2.jpeg',
                    'external/img/bg3.jpeg',
                    'external/img/bg4.jpeg',
                    'external/img/bg5.jpeg',
                    'external/img/bg6.jpeg',
                    'external/img/bg7.jpeg',
                    'external/img/bg8.jpeg',
                    'external/img/bg9.jpeg',
                    'external/img/bg10.jpeg',
                    'external/img/bg11.jpeg',
                    'external/img/bg12.jpeg',
                    'external/img/bg13.jpeg',
                    'external/img/bg14.jpeg',
                    'external/img/bg15.jpeg',
                    'external/img/bg16.jpeg',
                    'external/img/bg17.jpeg',
                    'external/img/bg18.jpeg',
                    'external/img/bg19.jpeg',
                    'external/img/bg20.jpeg',
                    'external/img/bg21.jpeg',
                    'external/img/bg22.jpeg',
                    'external/img/bg23.jpeg',
                    'external/img/bg24.jpeg',
                    'external/img/bg25.jpeg',
                    'external/img/bg26.jpeg',
                    'external/img/bg27.jpeg',
                    'external/img/bg28.jpeg',
                    'external/img/bg29.jpeg',
                    'external/img/bg30.jpeg']
    selectBG = bgImages[Math.floor(Math.random() * bgImages.length)];

    $('body').css('background', 'url(' + selectBG + ')');
    $('body').css('background-position', 'center');
    $('body').css('background-repeat', 'no-repeat');
    $('body').css('background-size', 'cover');
};

function on_update_link_button_click () {
    var flink = document.getElementById("gformLink").value;
    chrome.storage.sync.set({'form_link': flink}, function() {
      location.reload(true);
    });
}

function isEmptyOrSpaces (str) {
    return str === undefined || str === null || str.match(/^ *$/) !== null;
}

function load_form_or_input () {
    chrome.storage.sync.get(['form_link'], function(result) {
        var flink = result.form_link;
        if (!isEmptyOrSpaces(flink)) {
            if (flink.indexOf("viewform?") != -1) {
                flink = flink + "&embedded=true";
            } else {
                flink = flink + "?embedded=true";
            }
            document.getElementById("form_frame").src = flink;   
        } else {
            $('#formLinkModal').modal('show');
        }
    });
}

var load = 0;
function form_frame_loaded () {
    load++;
    console.log("Load increased to " + load);
    if (load > 1) {
        document.location = "https://www.google.com/";
        var today = Number(formatDate(new Date()));
        chrome.storage.sync.set({'form_submitted': today}, function() {
        });
    }
}

$(document).ready(function() {
    set_bg_image();

    load_form_or_input();

    load = 0;
    var frame_ele = document.getElementById("form_frame");
    frame_ele.addEventListener("load", form_frame_loaded);

    var formLinkButton = document.getElementById("gformLinkUpdate");
    formLinkButton.addEventListener("click", on_update_link_button_click);
});
