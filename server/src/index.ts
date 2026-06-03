import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import queueRoutes from "./routes/queue.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "QFlow Backend Running",
  });
});

app.use("/auth", authRoutes);
app.use("/queue", queueRoutes);
app.use("/dashboard", dashboardRoutes);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});