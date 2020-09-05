const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const app = express();


const user = require('./routes/user');
const posts = require('./routes/posts');


connectDB();

app.use(express.json({ extended: false }));

app.use('/auth', user);
app.use('/posts', posts);


const PORT = config.get("PORT") || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
