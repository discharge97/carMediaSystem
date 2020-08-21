const { io } = require("./socket.io");

document.onkeypress = handleMenu;
let socket = io('http://localhost');
let index = 0;
const menuItems = {};
initMenu();


// TODO: rewrite logic for 

socket.on("next", () => {
    handleMenu(1);
});

socket.on("prev", () => {
    handleMenu(-1);
});

socket.on("choose", () => {
    chooseCurrentMenuItem();
});

function handleMenu(val) {
    index += val;
    if (menuItems.items == undefined || menuItems.panels == undefined) initMenu();

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