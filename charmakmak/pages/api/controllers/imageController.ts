import asyncHandler from 'express-async-handler';
import path from 'path';
import { Image } from '../models/imageModel.js';
import { Project } from '../models/projectModel.js';
import fs from 'fs';

//@desc   Get images from Project
//@route  GET /api/image/:projectId
//@access Private
export const getProjectImages = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }
  const images = await Image.find({ projectId: req.params.projectId });
  res.status(200).json(images);
});

//@desc   Get images from ids
//@route  GET /api/image/
//@access Private
export const getImages = asyncHandler(async (req, res) => {
  const images = await Image.find({ _id: { $in: req.body.ids } });
  res.status(200).json(images);
});

//@desc   Set images
//@route  POST /api/image/:projectId
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

  await Project.findByIdAndUpdate(
    req.params.projectId,
    {
      allImages: [...project.allImages, ...newImagesIds],
    },
    { new: true }
  );

  const updatedProject = await Project.findById(req.params.projectId);
  res.status(200).json({ updatedProject });
});

//@desc   Update images
//@route  DELETE /api/image/:projectId
//@access Private
export const deleteImages = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project || !req.body.ids || !req.body.ids.length) {
    res.status(400);
    throw new Error('Project not found');
  }

  for (let index = 0; index < req.body.ids.length; index++) {
    const image = await Image.findById(req.body.ids[index]);
    if (image) {
      await Image.findByIdAndDelete(req.body.ids[index]);
    }
  }

  //Delete from Image parts
  if (project.imageParts.length) {
    const imagePartsToEdit = project.imageParts.filter((part) => {
      return (
        part.images.filter((image) => {
          return (
            req.body.ids.find((id: string) => id === image.toString()) ===
            undefined
          );
        }).length > 0
      );
    });

    if (imagePartsToEdit.length) {
      for (let index = 0; index < imagePartsToEdit.length; index++) {
        const filteredImages = imagePartsToEdit[index].images.filter(
          (image) =>
            req.body.ids.find((id: string) => id === image.toString()) ===
            undefined
        );

        await Project.updateOne(
          { _id: req.params.id, 'imageParts._id': imagePartsToEdit[index]._id },
          {
            $set: {
              'imageParts.$.images': filteredImages,
            },
          }
        );
      }
    }
  }

  //Delete from project allImages
  const filteredImages = project.allImages.filter(
    (image) =>
      req.body.ids.find((id: string) => id === image.toString()) === undefined
  );

  await Project.findByIdAndUpdate(req.params.projectId, {
    allImages: filteredImages,
  });

  const updatedImages = await Image.find({ projectId: req.params.projectId });

  res.status(200).json(updatedImages);
});
