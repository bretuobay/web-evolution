import rateLimit from "express-rate-limit";

export const apiRateLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests, please slow down",
  },
});
