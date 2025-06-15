import { Product } from '../models/Product.js';

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Seller only)
export const createProduct = async (req, res) => {
  try {
    console.log('Create product request body:', req.body);
    console.log('Create product request file:', req.file);
    console.log('User:', req.user);

    const { name, description, price, category, googleDriveLink } = req.body;
    const image = req.file?.buffer;

    if (!image) {
      console.log('No image provided');
      return res.status(400).json({ message: 'Please provide a product image' });
    }

    if (!name || !description || !price || !category || !googleDriveLink) {
      console.log('Missing required fields:', { name, description, price, category, googleDriveLink });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = await Product.create({
      sellerId: req.user._id,
      name,
      description,
      price,
      image,
      category,
      googleDriveLink
    });

    console.log('Product created successfully:', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, search, status = 'available' } = req.query;
    const query = { status };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .select('-image') // Don't send image in list view
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('sellerId', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Seller only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the seller
    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const { name, description, price, category, googleDriveLink } = req.body;
    const image = req.file?.buffer;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        image: image || product.image,
        category: category || product.category,
        googleDriveLink: googleDriveLink || product.googleDriveLink
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Seller only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the seller
    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get seller's products
// @route   GET /api/products/seller/:sellerId
// @access  Public
export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      sellerId: req.params.sellerId,
      status: 'available'
    })
      .select('-image')
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get product image
// @route   GET /api/products/:id/image
// @access  Public
export const getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || !product.image) {
      return res.status(404).json({ message: 'Product or image not found' });
    }

    res.set('Content-Type', 'image/jpeg');
    res.send(product.image);
  } catch (error) {
    console.error('Error getting product image:', error);
    res.status(500).json({ message: 'Error getting product image' });
  }
}; 