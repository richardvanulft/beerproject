const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
app.use(cors({
  origin: 'http://localhost:5173' // replace with the Vue app's domain
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pao_beer'
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); 

app.use(session({
  secret: 'sush',
  resave: false,
  saveUninitialized: false
}));

app.get('/api/check-login', (req, res) => {
  if (req.session.user) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/registeruser', bodyParser.json(), async (req, res) => {
  const { firstname, lastname, email, password, permissionLevel } = req.body;
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const query = 'INSERT INTO users (firstname, lastname, email, password, permissionLevel) VALUES (?, ?, ?, ?, ?)';
  const values = [firstname, lastname, email, hashedPassword, permissionLevel];
  try {
    console.log('registering user');
    await pool.promise().query(query, values);
    console.log('hier werkt het')
    // Start een sessie en sla de gebruikersnaam op
    req.session.user = email;
    console.log('user:', req.session.user)


    res.status(200).json({ message: 'Registration successful', isLoggedIn: true, user: { email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});



app.route('/login')
    .get((req, res) => {
      // Logica voor het verwerken van GET-verzoeken naar /login (optioneel)
    })

app.post('/loginuser', bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  console.log('Received email on server:', email);
  const query = 'SELECT * FROM users WHERE email = ?';
  console.log('Received email:', email);
  const [rows] = await pool.promise().query(query, [email && email.trim()]);
  console.log('Rows from database:', rows);
  if (rows.length > 0 && (await bcrypt.compare(password, rows[0].password))) {
    console.log('user:', req.session.user)
    const { firstname, lastname, email } = rows[0];
    res.status(200).json({
      message: 'login successful',
      isLoggedIn: true,
      user: { firstname, lastname, email } // Voeg firstname en lastname toe
    });
  } else {
    console.log('couldn\'t log in')
  }
});

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send('This is a secret page');
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  try {
    // Voer eventuele extra stappen uit, zoals het opruimen van sessiegegevens op de serverzijde.

    // Vernietig de sessie
    req.session.destroy((err) => {
      if (err) {
        console.error('Fout tijdens uitloggen:', err);
        res.status(500).json({ error: 'Fout tijdens uitloggen.' });
      } else {
        // Optioneel: Stuur een bevestiging van uitloggen naar de client.
        res.status(200).json({ message: 'U bent uitgelogd' });
      }
    });
  } catch (error) {
    console.error('Fout tijdens uitloggen:', error);
    res.status(500).json({ error: 'Fout tijdens uitloggen.' });
  }
});

app.get('/ShowAllbeers', async (req, res) => {
  try {
    const query = 'SELECT id, name, brewer, type, yeast, perc, purchase_price, created_at, updated_at, like_count FROM beers';
    const [beers] = await pool.promise().query(query);
    res.json(beers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.get('/ShowAllbeers/:id', async (req, res) => {
  try {
    const query = 'SELECT id, name, brewer, type, yeast, perc, purchase_price, created_at, updated_at, like_count FROM beers WHERE id = ?';
    const [beers] = await pool.promise().query(query, [req.params.id]);
    res.json(beers[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.get('/api/get-username', async (req, res) => {
  if (req.session.user) {
    const email = req.session.user;
    try {
      const query = 'SELECT firstname, lastname FROM users WHERE email = ?';
      const [rows] = await pool.promise().query(query, [email]);
      if (rows.length > 0) {
        const { firstname, lastname } = rows[0];
        const username = `${firstname} ${lastname}`;
        res.json({ username });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    res.status(401).json({ error: 'User not logged in.' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  console.log('http://localhost:3000/ShowAllbeers');
  console.log('ctrl + c to stop server');
});
