const { rateLimit } =require("express-rate-limit");
const commentLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 100, // Limit each user ID to 10 comments per day
    handler: (req, res) => {
      res.status(429).json({ error: 'Too many requests, please try again later.' });
    },
  });


module.exports=commentLimiter;