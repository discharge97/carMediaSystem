const express = require('express');
const Gpio = require('onoff').Gpio;
const app = new express();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
const rotaryEncoder = require('./encoder');

//const myEncoder = rotaryEncoder(5, 6, 7, 0); // Using BCM 5, BCM 6 & BCM 7 on the PI; two for the rotation and one for the push button

// myEncoder.on('rotation', direction => {
//     if (direction > 0) {
//         // console.log('Encoder rotated right; clockwise');
//         selectNext();
//     } else {
//         // console.log('Encoder rotated left; counter clockwise');
//         selectPrevious();
//     }
// });

// myEncoder.on('click', pressState => {
//     switch (pressState) {
//         case 0:
//             chooseOption();
//             break;
//         // case 1:
//         //     console.log('Encoder button released');
//         //     break;
//     }
// });

app.use(cors());
app.use(bodyParser.json());

app.post('/youtube', (req, res) => {
    if (req.body.urlID) {
        playVideo(req.body.urlID);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.use(express.static(`${process.env.PWD}/public`));
server.listen(8080);

io.on("connection", (sock) => {
    console.log(sock.id);
})

function selectNext() {
    io.emit("next", { next: true });
    console.log("next");
}

function selectPrevious() {
    io.emit("prev", { prev: true });
}

function chooseOption() {
    io.emit("choose", { choose: true });
}

function playVideo(urlID) {
    io.emit("youtube", urlID);
}