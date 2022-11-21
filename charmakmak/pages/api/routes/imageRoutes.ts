import express from 'express';
import {
  deleteImages,
  getProjectImages,
  setImages,
} from '../controllers/imageController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/:projectId')
  .get(getProjectImages)
  .post(upload.array('images'), setImages)
  .delete(deleteImages);

export default router;
