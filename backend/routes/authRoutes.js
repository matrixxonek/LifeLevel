import express from 'express';
import { registerUser, loginUser, getMe} from '../controllers/authController.js';
import authTokenMiddleware from '../middleware/authTokenMiddleware.js';

const router = express.Router();

// Endpointy związane z uwierzytelnianiem

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authTokenMiddleware, getMe);

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera Auth.');
    next();
});

export default router;