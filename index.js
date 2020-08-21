var robot = require("robotjs");
const express = require('express');
const Gpio = require('onoff').Gpio;
// const button = new Gpio(6, 'in', 'rising', { debounceTimeout: 0 });
// const button = new Gpio(7, 'in', 'rising', { debounceTimeout: 0 });
// const button = new Gpio(7, 'in', 'rising', { debounceTimeout: 10 }); // encoder button, add debounce because it's a real push button
const app = new express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// TODO: setup encoder with code got GPIO pin (not 4)

app.use(express.static(`${process.env.PWD}/public`));
server.listen(8080);

function selectNext() {
    io.emit("next", { next: true });
}

function selectPrevious() {
    io.emit("prev", { prev: true });
}

function chooseOption() {
    io.emit("choose", { choose: true });
}