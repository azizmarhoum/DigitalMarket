import express from 'express';
import { 
  createOrder,
  getBoughtItems,
  getSoldItems,
  getOrder,
  updateOrderStatus,
  deliverOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Order routes
router.post('/', createOrder);
router.get('/bought', getBoughtItems);
router.get('/sold', getSoldItems);
router.get('/:id', getOrder);
router.put('/:id/status', updateOrderStatus);
router.post('/:id/deliver', deliverOrder);

export default router; 