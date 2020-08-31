const socket = io();
var index = 0;
var menuItems = {};
initMenu();

socket.on('connect', () => {
    console.log("hit");
});

socket.on("next", () => {
    console.log("next");
    handleMenu(1);
});

socket.on("prev", () => {
    console.log("prev");
    handleMenu(-1);
});

socket.on("choose", () => {
    chooseCurrentMenuItem();
});

socket.on("youtube", data => {
    playVideo(data);
});

//  ========== YOUTUBE LOGIC ==========

// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        stopYTVideo();
    }
}

function stopYTVideo() {
    player.stopVideo();
}

function playVideo(urlOrID = "") {
    if (urlID.startsWith("http")) {
        urlOrID = getYouTubeID(urlOrID);
    }

    player.loadVideoById(urlOrID);
    player.playVideo();
}

function getYouTubeID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}
//  ========== YOUTUBE LOGIC ==========


function handleMenu(val) {
    if (!menuItems || !menuItems.items || !menuItems.panels) initMenu();
    index += val;

    if (index >= menuItems.items.length) {
        index = 0;
    }

    if (index < 0) {
        index = menuItems.items.length;
    }

    selectMenuItem();

}

function selectMenuItem() {
    if (menuItems.items == undefined || menuItems.panels == undefined) initMenu();

    for (let i = 0; i < menuItems.items.length; i++) {
        if (i == index) {
            menuItems.items[i].classList.add("active");
            // menuItems.panels[i].style.display = "block";
        } else {
            menuItems.items[i].classList.remove("active");
            // menuItems.panels[i].style.display = "none";
        }

    }
}

function chooseCurrentMenuItem(forceSelect = false) {

    switch (index) {
        case 2:
            // TODO: stop YT player 
            stopYTVideo();
            stopVi
            break;

        default:
            for (let i = 0; i < menuItems.items.length; i++) {
                if (i == index) {
                    if (forceSelect) {
                        menuItems.items[i].classList.add("active");
                    }
                    menuItems.panels[i].style.display = "block";
                } else {
                    if (forceSelect) {
                        menuItems.items[i].classList.remove("active");
                    }
                    menuItems.panels[i].style.display = "none";
                }
            }
            break;
    }

}

function initMenu() {
    menuItems.items = document.getElementsByClassName("menuItem");
    menuItems.panels = document.getElementsByClassName("menuItemPanel");
    index = 0;
}