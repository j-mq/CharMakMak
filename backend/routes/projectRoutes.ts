import express from 'express';
import {
  getProject,
  setProject,
  updateImageParts,
  updateProject,
  updateSelectionParts,
  // setGoal,
  // updateGoal,
  // deleteGoal,
} from '../controllers/projectController';

//import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(setProject);
router.route('/:id').get(getProject).put(updateProject);
router.route('/:id/selection-parts').put(updateSelectionParts);
router.route('/:id/image-parts').put(updateImageParts);

//router.route('/').get(protect, getProject);
//.post(protect, setGoal);
//router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
