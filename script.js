var user = prompt('Nombre: ');
var socket = io();

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var color = Math.floor(Math.random() * 16777215).toString(16);
var cursors = [];

canvas.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    let coor = "User " + user + " -> Coordinates: (" + x + "," + y + ")";
    socket.emit('coordinates', { coordinateX: x, coordinateY: y, color: color, username: user });
});

socket.on('coordinates', function (coord) {
    cursors[coord.id] = coord;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    renderCursors(cursors);
});

function renderCursors(cursors) {
    for (let i = 0; i < cursors.length; i++) {
        if (cursors[i] != undefined) {
            context.beginPath();
            context.fillStyle = "#" + cursors[i].color;
            context.ellipse(cursors[i].coordinateX, cursors[i].coordinateY, 10, 10, 0, 0, Math.PI * 2);
            context.fill();
            context.closePath();

            context.fillRect(cursors[i].coordinateX, cursors[i].coordinateY, -10, -10);
            context.fillStyle = "white";
            context.strokeRect(cursors[i].coordinateX - 2, cursors[i].coordinateY - 11, 50, -15);

            context.beginPath();
            context.fillStyle = "black";
            texto = cursors[i].username;
            context.fillText(texto, cursors[i].coordinateX, cursors[i].coordinateY - 15);
            context.closePath();
        }
    }

}