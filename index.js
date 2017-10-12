const express = require("express"),
  app = express(),
  http = require("http").Server(app),
  path = require("path"),
  engines = require("consolidate"),
  io = require("socket.io")(http),
  zmq = require("zeromq"),
  sock = zmq.socket("req"),
  logger = require('./src/logger')
  commande = require("./src/commande");

let socketIsReady = true;
sock.connect("tcp://192.168.1.25:3000");

app.use("/public", express.static("public"));
app.use(
  "/pixi.js",
  express.static(__dirname + "/node_modules/pixi.js/dist/pixi.js")
);
app.use(
  "/socket.io",
  express.static(__dirname + "/node_modules/socket.io-client/dist/")
);
app.use(
  "/sound.js",
  express.static(
    __dirname + "/node_modules/createjs-soundjs/lib/soundjs-0.6.2.min.js"
  )
);

app.engine("html", engines.mustache);

app.set("view engine", "html");
app.set("views", __dirname + "/public/html");

app.get("/", function(req, res) {
  res.render("index");
});

io.on("connection", function(socket) {
  logger.info("a user connected");
  setInterval(function() {
    if (socketIsReady) socketIsReady = false; else return;
    logger.info("sending work");
    sock.send("identify|#0x01");
    sock.identity = "#0x01";
    sock.send(commande.forward);
  }, 500);
  socket.on("disconnect", function() {
    logger.info("user disconnected");
  });
});

sock.on("message", function(msg) {
  socketIsReady = true;
  logger.info(`work: ${msg.toString()}`);
});

http.listen(8000, function() {
  logger.info("listening on *:8000");
});
