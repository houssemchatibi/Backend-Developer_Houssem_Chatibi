import { Router, Request, Response } from 'express';
import { getAllProducts, getProductById, searchProducts, filterProductsByCategory } from '../services/product.service';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      await getAllProducts(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      await getProductById(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/search/:query', async (req: Request, res: Response) => {
    try {
      await searchProducts(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/category/:category', async (req: Request, res: Response) => {
    try {
      await filterProductsByCategory(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  });


export default router;