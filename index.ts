
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("Hello word!")
})

app.use(express.json());
app.use("/api/auth", productRoutes);

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
	
});