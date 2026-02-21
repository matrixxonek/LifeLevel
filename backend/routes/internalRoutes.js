import express from 'express';
import {getSyncTargets} from '../controllers/userSyncController.js';
import {addExternalExp} from '../controllers/addExpController.js';
import authInternal from '../middleware/authInternalMiddleware.js';
import {getDashboardStats} from '../controllers/statsController.js';
import authMiddleware from '../middleware/authTokenMiddleware.js';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera oprogramowania zewnętrznego.');
    next();
});

router.get('/userSync', authInternal, getSyncTargets);
router.post('/addExp', authInternal, addExternalExp);

router.get('/stats', authMiddleware, getDashboardStats);

export default router;