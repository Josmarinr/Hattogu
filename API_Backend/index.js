const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/order.route');
const stripeRouter = require('./routes/stripe.route');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", stripeRouter);

app.listen(port, () => {
    console.log('Server is listening on port http://localhost:' + port);
  });

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));