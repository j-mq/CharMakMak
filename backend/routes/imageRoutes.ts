import express from 'express';
import {
  getImage,
  setImage,
  // setGoal,
  // updateGoal,
  // deleteGoal,
} from '../controllers/imageController';
import { upload } from '../middleware/uploadMiddleware';

//import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getImage);
router.route('/').post(upload.single('image'), setImage);

//router.route('/').get(protect, getProject);
//.post(protect, setGoal);
//router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
