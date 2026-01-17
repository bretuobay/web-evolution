import cors from "cors";
import express from "express";
import helmet from "helmet";
import productRoutes from "./routes/products";
import categoryRoutes from "./routes/categories";
import { apiRateLimiter } from "./middleware/rateLimit";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiRateLimiter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", startedAt: new Date().toISOString() });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

export default app;
