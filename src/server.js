const express = require('express');
const http = require('http');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

app.use('/api/ext/iana/tlds', proxy({
  target: "http://data.iana.org/TLD",
  secure: false,
  pathRewrite: {
    "^/api/ext/iana/tlds": "/tlds-alpha-by-domain.txt"
  },
  changeOrigin: true
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
