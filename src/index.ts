// src/index.ts
import express from 'express';
import userRouter from './routers/userRouter';

const app = express();
app.use(express.json());

// Use the user router
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});