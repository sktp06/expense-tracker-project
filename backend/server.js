const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/expense', require('./routes/expense'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
