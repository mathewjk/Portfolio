const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 4321;
const root = __dirname;

http
  .createServer((req, res) => {
    let file = decodeURIComponent(req.url.split("?")[0]);
    if (file === "/") file = "/index.html";
    const full = path.join(root, file);
    fs.readFile(full, (err, data) => {
      if (err) {
        fs.readFile(path.join(root, "404.html"), (e2, page) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(e2 ? "Not found" : page);
        });
        return;
      }
      const ext = path.extname(full).toLowerCase();
      const type =
        ext === ".html"
          ? "text/html"
          : ext === ".css"
          ? "text/css"
          : ext === ".js"
          ? "text/javascript"
          : ext === ".svg"
          ? "image/svg+xml"
          : "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    });
  })
  .listen(port, () => console.log(`Portfolio running on http://localhost:${port}`));
