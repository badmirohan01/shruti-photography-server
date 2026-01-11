import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.NEXT_PUBLIC_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: process.env.NEXT_PUBLIC_ORIGIN || "http://localhost:3000"
}));
app.use(express.json());

app.post("/notify", (req, res) => {
    io.emit("image_uploaded");
    res.sendStatus(200);
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(4000, () => {
    console.log("Socket notify server running on port 4000");
});
