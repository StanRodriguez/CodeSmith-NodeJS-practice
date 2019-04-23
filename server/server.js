const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http
  .createServer((request, response) => {
    if (request.method === "GET" && request.url === "/") {
      // read the index.html file and send it back to the client
      // code here...
      const page = fs.readFileSync("server/index.html");
      response.setHeader("Content-Type", "text/html");
      response.end(page);
    } else if (request.method === "POST" && request.url === "/sayHi") {
      // code here...

      try {
        fs.appendFileSync(
          "hi_log.txt",
          new Date().toLocaleDateString() + " - Somebody said hi.\n"
        );
        response.end("hi back to you!");
      } catch (err) {
        /* Handle the error */
        fs.appendFileSync(
          "hi_log.txt",
          new Date().toLocaleDateString() + " - " + err
        );
      }
    } else if (request.method === "POST" && request.url === "/greeting") {
      // accumulate the request body in a series of chunks
      // code here...
      let body = "";
      request.on("data", chunk => (body += chunk));
      request.on("end", () => {
        fs.appendFileSync("hi_log.txt", body + "\n");
        if (body === "hello") response.end("hello there!");
        else if (body === "what's up") response.end("the sky");
        else response.end("good morning");
      });
    } else if (request.method === "GET" && request.url === "/style.css") {
      // accumulate the request body in a series of chunks
      // code here...

      response.setHeader("Content-Type", "text/css");
      const page = fs.readFileSync("server/style.css");

      response.end(page);
    } else if (request.method === "PUT" && request.url === "/update") {
      // accumulate the request body in a series of chunks
      // code here...
      let body = "";
      request.on("data", chunk => (body += chunk));
      request.on("end", () => {
        fs.writeFile("hi_log.txt", body, err => {
          if (err) throw err;
        });
      });
    } else if (request.method === "DELETE" && request.url === "/delete") {
      // accumulate the request body in a series of chunks
      // code here...
      fs.unlink("hi_log.txt", err => {
        let message = "";
        if (err) {
          console.error(err);
          response.statusCode = 500;
          message = "The file could not be deleted";
        } else {
          message = "file was deleted";
          response.statusCode = 200;
          console.log(message);
        }
        response.end(message);
      });
    } else {
      // Handle 404 error: page not found
      response.statusCode = 404;
      response.end("404: Page Not found");
      // code here...
    }
  })
  .listen(3000);

module.exports = server;
