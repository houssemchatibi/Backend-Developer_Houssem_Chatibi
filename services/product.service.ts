import { Request, Response } from 'express';
import { products } from '../dummyjson';  // Import the mock data

// Implement the functions using the mock data

export const getAllProducts = async (req: Request, res: Response) => {
  // Return the list of all products
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: `Product with ID ${id} not found` });
  }

  res.json(product);
};

export const searchProducts = async (req: Request, res: Response) => {
  const { query } = req.params;
  // Filter products based on search query (case insensitive)
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredProducts);
};

export const filterProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  // Dummy category filter logic (you can modify it based on your needs)
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(category.toLowerCase()));

  res.json(filteredProducts);
};
