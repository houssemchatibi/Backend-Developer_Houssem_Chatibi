import { Request, Response } from 'express';
import { products } from '../dummyjson'; // Mock data

// Utility function to handle errors
const handleError = (res: Response, message: string, statusCode: number) => {
  res.status(statusCode).json({ error: message });
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    res.json(products);
  } catch (error) {
    handleError(res, 'Failed to fetch products', 500);  // Internal server error
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return handleError(res, 'Invalid product ID', 400);  // Bad request if ID is not a number
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return handleError(res, `Product with ID ${id} not found`, 404);  // Not found
  }

  res.json(product);
};

export const searchProducts = async (req: Request, res: Response) => {
  const { query } = req.params;
  if (!query || query.trim() === '') {
    return handleError(res, 'Search query cannot be empty', 400);  // Bad request if search query is empty
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredProducts);
};

export const filterProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  if (!category || category.trim() === '') {
    return handleError(res, 'Category cannot be empty', 400);  // Bad request if category is empty
  }

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(category.toLowerCase()));

  if (filteredProducts.length === 0) {
    return handleError(res, `No products found in category ${category}`, 404);  // Not found if no products match
  }

  res.json(filteredProducts);
};
