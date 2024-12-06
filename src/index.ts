import rateLimit from 'express-rate-limit';
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("Hello word!")
})

// Rate limiter: 200 requests per minute per IP address
const limiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute window
    max: 200,  // Limit each IP to 200 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
  });
  
  // Apply rate limiting to all routes
  app.use(limiter);
app.use(express.json());
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
	
});