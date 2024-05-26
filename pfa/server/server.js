const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user')
const UserVerification=require('./models/UserVerification')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const nodemailer=require("nodemailer")
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})



require("dotenv").config()

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user:process.env.AUTH_EMAIL,
    pass:process.env.AUTH_PASS,
  },
});


const generateToken = (user) => {
  // Extract user data
  const { _id, email } = user;

  // Create a payload containing user data
  const payload = {
    user: {
      id: _id,
      email: email,
    },
  };

  // Generate a JWT token
  const token = jwt.sign(payload, process.env.SECRET_TOKEN_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

  return token;
};



  
  mongoose.connect("mongodb+srv://medaminkraiem101:pgCSGAWxm7qRXUbv@cluster0.uevako8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    
    
  }) .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
  
 
 


  app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.verified) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
  
      if (existingUser && !existingUser.verified) {
        await User.findByIdAndDelete(existingUser._id);
      }
  
      // Generate unique verification code
      const verificationCode = Math.floor(1000 + Math.random() * 9000);
  
      // Create a new user
      
      const newUser = await User.create({ username, email, password: hashedPassword });
  
      // Create a new UserVerification document
      const expirationTime = Date.now() + 3600000; // 1 hour from now
      await UserVerification.create({ userId: newUser._id, uniqueString: verificationCode, expiresAt: expirationTime });
  
      // Send email verification code
      await transporter.sendMail({
        from: '"PlanGenie" mouhamedaminkraiem09@gmail.com',
        to: email,
        subject: 'Email Verification Code',
        text: `Your email verification code is: ${verificationCode}`,
      });
  
      // Send verification code back to the client
      res.status(201).json({ message: 'User registered successfully. Email verification code sent.', verificationCode });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });q
    }
  });




  
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      // Check if password matches
      if (!isMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      // Check if user is verified
      if (!user.verified) {
        return res.status(403).json({ error: 'Account not verified' });
      }
  
      const token = generateToken(user);
  
      // If credentials are correct and user is verified, return success message
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  app.post('/verify', async (req, res) => {
    try {
      const { email, verificationCode } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If user not found, return error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if verification code matches
      const userVerification = await UserVerification.findOne({ userId: user._id, uniqueString: verificationCode });
      if (!userVerification || userVerification.expiresAt < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired verification code' });
      }
  
      // Update user's verified field to true
      await User.findOneAndUpdate({ _id: user._id }, { $set: { verified: true } });
  
      // If verification code is correct, return success message
      res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  