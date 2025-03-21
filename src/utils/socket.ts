import { io } from "socket.io-client";

const socket = io("http://localhost:7777"); // Replace with your backend URL

socket.on("connect", () => {
  console.log("Connected to WebSocket:", socket.id);
});

socket.on("message", (data) => {
  console.log("Received message:", data);
});

socket.emit("message", "Hello from frontend!");
export default socket;