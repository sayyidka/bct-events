const http = require('http');
const config = require('./Utils/config');
const express = require('./express');

const server = http.createServer(express);
const port = config.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
