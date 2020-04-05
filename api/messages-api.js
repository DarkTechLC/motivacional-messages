const messages = require('./messages.json');

module.exports = (req, res) => {
  res.send(messages);
}