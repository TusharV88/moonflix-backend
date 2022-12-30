import express from 'express';
import userRoute from './user.js';
import mediaRoute from './media.js';
import personRoute from './person.js';
import reviewRoute from './review.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/person', personRoute);
router.use('/reviews', reviewRoute);
router.use('/:mediaType', mediaRoute);


export default router;
