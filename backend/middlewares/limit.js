const { rateLimit } =require("express-rate-limit");
const postLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 10, // Limit each IP to 10 posts per day
    keyGenerator: (req) => {
        return req.body.userId; // Adjust based on how you send the user ID in the request
      },
    handler: (req, res) => {
      res.status(429).json({ error: 'Too many requests, please try again later.' });
    },
  });


module.exports=postLimiter;