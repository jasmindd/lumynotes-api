const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) 
    return res.status(401).json({ message: 'Token no proporcionado' });

  // El formato esperado es "Bearer token"
  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') 
    return res.status(401).json({ message: 'Formato de token inválido' });

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  console.log('🔐 Header recibido:', req.headers.authorization);

};
