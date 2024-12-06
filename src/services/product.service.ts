import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import { products } from '../dummyjson'; // Mock data for products

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Utility function to handle errors and send responses with appropriate status codes
const handleError = (res: Response, message: string, statusCode: number): Response => {
  return res.status(statusCode).json({ error: message });
};

// Controller function to get all products
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  const cachedProducts = cache.get('allProducts');
  if (cachedProducts) {
    console.log('Returning cached products');
    return res.json(cachedProducts);
  }

  try {
    cache.set('allProducts', products);
    return res.json(products);
  } catch (error) {
    return handleError(res, 'Failed to fetch products', 500);
  }
};

// Controller function to get a product by its ID
export const getProductById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return handleError(res, 'Invalid product ID', 400);
  }

  const cacheKey = `product_${id}`;
  const cachedProduct = cache.get(cacheKey);
  if (cachedProduct) {
    console.log('Returning cached product');
    return res.json(cachedProduct);
  }

  try {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      return handleError(res, `Product with ID ${id} not found`, 404);
    }
    cache.set(cacheKey, product);
    return res.json(product);
  } catch (error) {
    return handleError(res, 'Failed to fetch product', 500);
  }
};

// Controller function to search products based on a query string
export const searchProducts = async (req: Request, res: Response): Promise<Response> => {
  const { query } = req.params;

  if (!query || query.trim() === '') {
    return handleError(res, 'Search query cannot be empty', 400);
  }

  const cacheKey = `search_${query}`;
  const cachedSearchResults = cache.get(cacheKey);
  if (cachedSearchResults) {
    console.log('Returning cached search results');
    return res.json(cachedSearchResults);
  }

  try {
    const filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    cache.set(cacheKey, filteredProducts);
    return res.json(filteredProducts);
  } catch (error) {
    return handleError(res, 'Failed to search products', 500);
  }
};

// Controller function to filter products by category
export const filterProductsByCategory = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.params;

  if (!category || category.trim() === '') {
    return handleError(res, 'Category cannot be empty', 400);
  }

  const cacheKey = `category_${category}`;
  const cachedFilteredProducts = cache.get(cacheKey);
  if (cachedFilteredProducts) {
    console.log('Returning cached filtered products');
    return res.json(cachedFilteredProducts);
  }

  try {
    const filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(category.toLowerCase())
    );
    cache.set(cacheKey, filteredProducts);
    return res.json(filteredProducts);
  } catch (error) {
    return handleError(res, 'Failed to filter products', 500);
  }
};
