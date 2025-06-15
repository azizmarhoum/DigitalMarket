
import React from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with orders, products, or general questions',
      contact: 'support@digitalmarket.com',
      available: '24/7 Response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our customer service team',
      contact: '+1 (555) 123-4567',
      available: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant help for urgent questions and issues',
      contact: 'Available on website',
      available: 'Mon-Fri 9AM-8PM EST'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit our headquarters',
      contact: '123 Digital Ave, San Francisco, CA 94102',
      available: 'By appointment only'
    }
  ];

  const faqs = [
    {
      question: 'How do I download my purchased products?',
      answer: 'After completing your purchase, you\'ll receive an email with download links. You can also access your downloads from your account dashboard under "Purchases".'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and other secure payment methods. All transactions are protected with industry-standard encryption.'
    },
    {
      question: 'Can I get a refund for digital products?',
      answer: 'We offer a 30-day money-back guarantee for all digital products if they don\'t meet your expectations or have technical issues.'
    },
    {
      question: 'How do I sell my products on DigitalMarket?',
      answer: 'Simply create a seller account, upload your products with detailed descriptions and previews, and set your prices. We handle payments and delivery for you.'
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our platform? Need help with an order? 
                We're here to help you succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>
                    <p className="font-medium text-gray-900 mb-1">
                      {method.contact}
                    </p>
                    <p className="text-sm text-gray-500">
                      {method.available}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>General Question</option>
                      <option>Order Support</option>
                      <option>Technical Issue</option>
                      <option>Seller Inquiry</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Check out our comprehensive help center for detailed guides and tutorials.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Visit Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
