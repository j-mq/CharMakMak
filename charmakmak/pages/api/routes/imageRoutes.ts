import express from 'express';
import {
  deleteImages,
  getProjectImages,
  setImages,
} from '../controllers/imageController';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

router
  .route('/:projectId')
  .get(getProjectImages)
  .post(upload.array('images'), setImages)
  .delete(deleteImages);

module.exports = router;
