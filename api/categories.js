module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const categories = [
      "Strength Training",
      "Fitness Accessories", 
      "Cardio Equipment",
      "Apparel"
    ];
    
    res.status(200).json({
      categories: categories.sort()
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
