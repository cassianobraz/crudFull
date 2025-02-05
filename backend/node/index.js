import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type",
  })
);

app.use("/user", userRoutes);

app.listen(3000, () =>
  console.log("🚀 Servidor rodando em http://localhost:3000")
);
