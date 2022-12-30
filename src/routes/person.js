import express from 'express';
import personController from "../controllers/person.js";

const router = express.Router({ mergeParams: true });

router.get('/:personId/medias', personController.personMedias);

router.get('/:personId', personController.personDetails);


export default router;
