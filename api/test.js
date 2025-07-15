export default function handler(req, res) {
  res.status(200).json({
    message: 'Node.js API is working!',
    status: 'ok',
    method: req.method,
    url: req.url
  });
}
