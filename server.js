const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 1000, 
    max: 5,
    message: { success: false, message: "Rate limit exceeded" }
});
app.use('/server/incoming_data', limiter);

mongoose.connect('mongodb://127.0.0.1:27017/datapusher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("DB Connection Failed", err))
mongoose.set('strictQuery', false);

app.use('/api/accounts', require('./src/routes/accountRoutes'));
app.use('/api/destinations', require('./src/routes/destinationRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/members', require('./src/routes/accountMemberRoutes.js'));
app.use('/api/logs', require('./src/routes/logRoutes.js'));
app.use('/server', require('./src/routes/dataRoutes')); 



const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port 3000`));
