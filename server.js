const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'railway_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Book Ticket
app.post('/book', (req, res) => {
  const { name, train, seat } = req.body;
  const sql = 'INSERT INTO bookings (name, train_no, seat_no) VALUES (?, ?, ?)';
  db.query(sql, [name, train, seat], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ ticketId: result.insertId, message: '🎟️ Ticket booked successfully' });
  });
});

// Cancel Ticket
app.post('/cancel', (req, res) => {
  const { ticketId } = req.body;
  const sql = 'DELETE FROM bookings WHERE id = ?';
  db.query(sql, [ticketId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: '❌ Ticket cancelled successfully' });
  });
});

// Seat Availability
app.post('/availability', (req, res) => {
  const { train, seat } = req.body;
  const sql = 'SELECT * FROM bookings WHERE train_no = ? AND seat_no = ?';
  db.query(sql, [train, seat], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ available: result.length === 0 });
  });
});

app.listen(port, () => {
  console.log(`🚂 Server running at http://localhost:${port}`);
});
