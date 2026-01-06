import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Endpointy związane z uwierzytelnianiem

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera Auth.');
    next();
});

export default router;