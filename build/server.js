"use strict";

// src/app.ts
var import_fastify = require("fastify");
var app = (0, import_fastify.fastify)();

// src/server.ts
var PORT = 3333;
app.listen({
  host: "0.0.0.0",
  port: PORT
}).then(() => {
  console.log(`HTTP Server Running on PORT ${PORT}`);
});
