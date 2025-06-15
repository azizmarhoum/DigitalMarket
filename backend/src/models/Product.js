import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: Buffer,
    required: [true, 'Please provide a product image']
  },
  googleDriveLink: {
    type: String,
    required: [true, 'Please provide a Google Drive link'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

export const Product = mongoose.model('Product', productSchema); 