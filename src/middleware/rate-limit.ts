import rateLimit from "express-rate-limit";

export const mintRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many mint requests. Please try again later."
  }
});
