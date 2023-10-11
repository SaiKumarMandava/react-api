const express = require('express');
const axios = require('axios');   
const cors=require('cors')
const app = express();
const port = 3009;
app.use(cors())
app.use(express.json())
app.use(express.static('build'));
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
