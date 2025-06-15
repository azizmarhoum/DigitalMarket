import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is available
    if (product.status !== 'available') {
      return res.status(400).json({ message: 'Product is not available' });
    }

    // Check if user is not buying their own product
    if (product.sellerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot buy your own product' });
    }

    // Create order
    const order = await Order.create({
      buyerId: req.user._id,
      sellerId: product.sellerId,
      productId: product._id,
      price: product.price
    });

    // Update product status
    product.status = 'sold';
    await product.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user's bought items
// @route   GET /api/orders/bought
// @access  Private
export const getBoughtItems = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id })
      .populate('productId', 'name description image')
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user's sold items
// @route   GET /api/orders/sold
// @access  Private
export const getSoldItems = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .populate('productId', 'name description image')
      .populate('buyerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('productId', 'name description image')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is either buyer or seller
    if (order.buyerId._id.toString() !== req.user._id.toString() && 
        order.sellerId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the seller
    if (order.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Deliver Google Drive link
// @route   POST /api/orders/:id/deliver
// @access  Private
export const deliverOrder = async (req, res) => {
  try {
    const { googleDriveLink } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the seller
    if (order.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to deliver this order' });
    }

    // Check if order is pending
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order is not in pending status' });
    }

    order.googleDriveLink = googleDriveLink;
    order.status = 'completed';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 