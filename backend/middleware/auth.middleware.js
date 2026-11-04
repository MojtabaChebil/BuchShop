const jwt = require('jsonwebtoken');

// Prueft, ob ein gueltiges JWT im "Authorization: Bearer <token>" Header mitgeschickt wurde.
// Bei Erfolg wird req.userId gesetzt, damit die naechste Funktion weiss, wer angefragt hat.
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Kein Zugriffstoken vorhanden. Bitte einloggen.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token ungueltig oder abgelaufen. Bitte erneut einloggen.' });
  }
}

module.exports = authMiddleware;
