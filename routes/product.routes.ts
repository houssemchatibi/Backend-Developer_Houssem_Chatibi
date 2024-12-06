import { Router } from 'express';
import { getAllProducts, getProductById, searchProducts, filterProductsByCategory } from '../services/product.service';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/search/:query', searchProducts);
router.get('/category/:category', filterProductsByCategory);

export default router;