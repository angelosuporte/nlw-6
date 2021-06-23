import express from "express";

import "./database";

// @types/express
const app = express();

app.get("/test", (request, response) => {
    return response.send("Hello World!")
});

app.post("/test-post", (request, response) =>{
    return response.send("--------->Post");
});

// http://localhost:3000
app.listen(3000, () => console.log ("Server is running"));