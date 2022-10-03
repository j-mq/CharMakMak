import asyncHandler from 'express-async-handler';
import path from 'path';
import { Image } from '../models/imageModel';
import { Project } from '../models/projectModel';
import fs from 'fs';

//@desc   Get images
//@route  GET /api/image
//@access Private
export const getImages = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }
  const images = await Image.find({ projectId: req.params.projectId });
  res.status(200).json(images);
});

//@desc   Set images
//@route  POST /api/image
//@access Private
export const setImages = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project || !req.files || !req.files.length) {
    res.status(400);
    throw new Error('Project not found');
  }

  const files = req.files as Express.Multer.File[];

  const allImages = files.map((file) => {
    return {
      name: file.originalname,
      img: {
        data: fs.readFileSync(
          path.join(__dirname, '..', 'uploads', file.filename)
        ),
        contentType: file.mimetype,
      },
      projectId: project.id,
    };
  });

  const newImagesIds = [];

  for (let index = 0; index < allImages.length; index++) {
    const newImage = await Image.create(allImages[index]);
    newImagesIds.push(newImage.id);
  }

  console.log('the new images ids', newImagesIds);

  // const newImages = await Image.find({ projectId: project.id });
  // const newImagesIds = newImages.map((image) => image._id.toString());

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.projectId,
    {
      allImages: [...project.allImages, ...newImagesIds],
    },
    { new: true }
  );

  res.status(200).json({ updatedProject });
});
