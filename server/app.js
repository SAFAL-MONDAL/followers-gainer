const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');

// Load environment variables FIRST
dotenv.config({ path: './.env' });

// Create Express app
const app = express();

// =======================
// SECURITY MIDDLEWARE
// =======================
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// =======================
// CORS CONFIGURATION
// =======================
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Explicitly set your frontend origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10kb' }));

// =======================
// DATABASE CONNECTION
// =======================
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000 // Close sockets after 45s of inactivity
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// =======================
// ROUTES
// =======================
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// // API routes
// app.use('/api/v1/services', serviceRoutes);
// app.use('/api/v1/orders', orderRoutes);
// app.use('/api/v1/admin', adminRoutes);
// app.use('/api/v1/auth', authRoutes);
const servicesRouter = require('./routes/services');
app.use('/services', servicesRouter);
// =======================
// ERROR HANDLING
// =======================
// 404 handler
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error for debugging
  console.error(err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Only show stack in development
  });
});

// =======================
// SERVER INITIALIZATION
// =======================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`🔒 CORS configured for origin: ${corsOptions.origin}`);
});

// =======================
// PROCESS HANDLERS
// =======================
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});