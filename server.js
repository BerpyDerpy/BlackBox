
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());



//  Root endpoint 
app.get('/', (req, res) => {
  res.send('server started');
});

//  /time endpoint
app.get('/time', (req, res) => {
  // The target date for the countdown
  const targetDate = new Date('Wed Oct 01 2025 04:43:47 GMT');
  const now = new Date();

  const diff = targetDate.getTime() - now.getTime();
  const secondsLeft = Math.floor(diff / 1000);

  
  res.json({ result: Math.max(0, secondsLeft) });
});

//  /fizzbuzz endpoint
app.post('/fizzbuzz', (req, res) => {
  const body = req.body;

  // Validate that the body is an array with exactly two elements
  if (Array.isArray(body) && body.length === 2) {
    // Echo the array back in the result
    res.json({ result: body });
  } else {
    // If validation fails, send a 400 Bad Request error
    res.status(400).json({ error: 'Request body must be a two-element array.' });
  }
});


//  /data endpoint 
app.post('/data', (req, res) => {
  const { input } = req.body;

  
  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Request body must contain an "input" key with a string value.' });
  }
  
  // Encode the input string to Base64
  const base64String = Buffer.from(input).toString('base64');
  res.json({ result: base64String });
});

// 5. /zap endpoint
app.post('/zap', (req, res) => {
  const { input } = req.body;

  // Validate that 'input' exists and is a string
  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Request body must contain an "input" key with a string value.' });
  }

  // Use a regular expression to remove all digits (0-9)
  const zappedString = input.replace(/\d/g, '');
  res.json({ result: zappedString });
});


//  /alpha endpoint
app.post('/alpha', (req, res) => {
  const { input } = req.body;

  // Validate that 'input' exists and is a string
  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Request body must contain an "input" key with a string value.' });
  }

  // Regular expression to check if the string contains ONLY letters (start to finish)
  const isAlpha = /^[a-zA-Z]+$/.test(input);
  res.json({ result: isAlpha });
});

//  /glitch endpoint
app.post('/glitch', (req, res) => {
  const { input } = req.body;

  // Validate that 'input' exists and is a string
  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Request body must contain an "input" key with a string value.' });
  }

  let glitchedString;
  if (input.length % 2 !== 0) {
    // ODD length: reverse the string
    glitchedString = input.split('').reverse().join('');
  } else {
    // EVEN length:  shuffle the string
    const a = input.split('');
    let n = a.length;
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]; // Swap elements
    }
    glitchedString = a.join('');
  }
  res.json({ result: glitchedString });
});


// Start the server
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
