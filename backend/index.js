const http = require("http");
const fs = require("fs");

const myServer = http.createServer();

myServer.listen(5001, () => console.log("Server is running!"));
