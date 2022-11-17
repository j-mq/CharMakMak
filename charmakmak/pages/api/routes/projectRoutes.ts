import express from 'express';
import {
  deleteProject,
  getProject,
  setProject,
  updateDescriptionParts,
  updateImageParts,
  updateProject,
  updateSelectionParts,
} from '../controllers/projectController';

//import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(setProject);
router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);
router.route('/:id/selection-parts').put(updateSelectionParts);
router.route('/:id/description-parts').put(updateDescriptionParts);
router.route('/:id/image-parts').put(updateImageParts);

export default router;
