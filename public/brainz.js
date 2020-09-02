const socket = io();
var index = 0;
var menuItems = {};
window.inactiveSeconds = 0;
window.isMenu = true;
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

setInterval(() => {
    if (player.PlayerState == YT.PlayerState.PLAYING || isMenu) {
        inactiveSeconds = 0;
        return;
    }

    inactiveSeconds++;

    if (inactiveSeconds > 15) {
        showMenu();
    }


}, 1000);

//  ========== YOUTUBE LOGIC ==========

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '260',
        width: '480',
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

    showMenu();
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
            player.PlayerState
            if (player.PlayerState == YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            break;
        case 3:
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

    hideMenu();
}

function initMenu() {
    menuItems.items = document.getElementsByClassName("menuItem");
    menuItems.panels = document.getElementsByClassName("menuItemPanel");
    index = 0;
}

function showMenu() {
    if (menuItems.items == undefined || menuItems.panels == undefined) initMenu();

    document.getElementById("menu").style.display = "block";
    index = 0;
    for (let i = 0; i < menuItems.items.length; i++) {
        menuItems.panels[i].style.display = "none";
        menuItems.items[index].classList.remove("active");
    }
    menuItems.items[index].classList.add("active");
    isMenu = true;

}

function hideMenu() {
    document.getElementById("menu").style.display = "none";

}