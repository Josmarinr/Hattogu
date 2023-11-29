const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/user.route');
const stampedRoutes = require('./routes/stamped.route');
const tshirtsRoutes = require('./routes/tshirt.route');
const ordersRoutes = require('./routes/order.route');
const methodPaymentsRoutes = require('./routes/methodPayment.route');
const paymentsRoutes = require('./routes/payment.route');
const authRoutes = require('./routes/auth.route');



//Settings
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use('/api', usersRoutes);
app.use('/api', stampedRoutes);
app.use('/api', tshirtsRoutes);
app.use('/api', ordersRoutes);
app.use('/api', methodPaymentsRoutes);
app.use('/api', paymentsRoutes);
app.use('/api', authRoutes);   

const server = app.listen(port, () => {
  console.log('Server is listening on port http://localhost:' + port);
});

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

module.exports = {app, server};