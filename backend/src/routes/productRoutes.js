import express from 'express';
import multer from 'multer';
import { 
  createProduct, 
  getProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct,
  getSellerProducts,
  getProductImage
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/:id/image', getProductImage);
router.get('/seller/:sellerId', getSellerProducts);

// Protected routes (seller only)
router.post('/', protect, authorize('seller'), upload.single('image'), createProduct);
router.put('/:id', protect, authorize('seller'), upload.single('image'), updateProduct);
router.delete('/:id', protect, authorize('seller'), deleteProduct);

export default router; 