import express from 'express';
import {
  getImages,
  //setImage,
  setImages,
  // setGoal,
  // updateGoal,
  // deleteGoal,
} from '../controllers/imageController';
import { upload } from '../middleware/uploadMiddleware';

//import { protect } from '../middleware/authMiddleware';

const router = express.Router();

//router.route('/:projectId').post(upload.single('image'), setImage);
router
  .route('/:projectId')
  .get(getImages)
  .post(upload.array('images'), setImages);

//router.route('/').get(protect, getProject);
//.post(protect, setGoal);
//router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
