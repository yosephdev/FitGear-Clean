module.exports = (req, res) => {
  res.status(200).json({
    message: 'API root is working!',
    status: 'ok',
    endpoints: [
      '/api/test',
      '/api/health', 
      '/api/products',
      '/api/blog',
      '/api/categories'
    ]
  });
};
