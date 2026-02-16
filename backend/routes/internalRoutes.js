import express from 'express';
import {getSyncTargets} from '../controllers/userSyncController.js';
import {addExternalExp} from '../controllers/addExpController.js';
import authInternal from '../middleware/authInternalMiddleware.js';

const router = express.Router();

router.get('/userSync', authInternal, getSyncTargets);
router.post('/addExp', authInternal, addExternalExp);


router.use((req, res, next) => {
    console.log('Żądanie przyszło do routera oprogramowania zewnętrznego.');
    next();
});

export default router;