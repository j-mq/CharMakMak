import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { Project } from '../models/projectModel.js';
import { Image } from '../models/imageModel.js';
// import { User } from "../models/userModel";

//@desc   Get project
//@route  GET /api/projects/:id
//@access Private
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  } else {
    res.status(200).json(project);
  }
});

//@desc   Set project
//@route  POST /api/project
//@access Private
export const setProject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please provide a text value');
  }
  const project = await Project.create({
    name: req.body.name,
    nftAllowed: req.body.nftAllowed || false,
  });

  res.status(200).json(project);
});

//@desc   Update project
//@route  PUT /api/projects/:id
//@access Private
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  await Project.findByIdAndUpdate(req.params.id, {
    name: req.body.name || project.name,
    nftAllowed: req.body.nftAllowed || project.nftAllowed,
  });

  const updatedProject = await Project.findById(req.params.id);

  res.status(200).json(updatedProject);
});

//@desc   Update selectionParts
//@route  PUT /api/projects/:id/selection-parts/
//@access Private
export const updateSelectionParts = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  if (req.body.partId) {
    const partId = new mongoose.Types.ObjectId(req.body.partId);

    if (req.body.delete) {
      await Project.updateOne(
        { _id: req.params.id },
        {
          $pull: { selectionParts: { _id: partId } },
        }
      );
    } else {
      await Project.updateOne(
        { _id: req.params.id, 'selectionParts._id': partId },
        {
          $set: {
            'selectionParts.$.name': req.body.name,
            'selectionParts.$.options': req.body.options,
          },
        }
      );
    }
  } else {
    await Project.findByIdAndUpdate(req.params.id, {
      selectionParts: [
        ...project.selectionParts,
        { name: req.body.name, options: req.body.options },
      ],
    });
  }
  const updatedProject = await Project.findById(req.params.id);
  res.status(200).json(updatedProject);
});

//@desc   Update descriptionParts
//@route  PUT /api/projects/:id/description-parts/
//@access Private
export const updateDescriptionParts = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  if (req.body.partId) {
    const partId = new mongoose.Types.ObjectId(req.body.partId);

    if (req.body.delete) {
      await Project.updateOne(
        { _id: req.params.id },
        {
          $pull: { descriptionParts: { _id: partId } },
        }
      );
    } else {
      await Project.updateOne(
        { _id: req.params.id, 'descriptionParts._id': partId },
        {
          $set: {
            'descriptionParts.$.name': req.body.name,
          },
        }
      );
    }
  } else {
    await Project.findByIdAndUpdate(req.params.id, {
      descriptionParts: [...project.descriptionParts, { name: req.body.name }],
    });
  }
  const updatedProject = await Project.findById(req.params.id);
  res.status(200).json(updatedProject);
});

//@desc   Update imageParts
//@route  PUT /api/projects/:id/image-parts
//@access Private
export const updateImageParts = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  const images = req.body.images;

  /** Check Images Exist inside Project */
  for (let i = 0; i < images.length; i++) {
    const existingImage = await Image.findById(images[i]);
    if (!existingImage || existingImage.projectId.toString() !== project.id) {
      res.status(400);
      throw new Error('Image not found');
    }
  }

  if (req.body.partId) {
    const partId = new mongoose.Types.ObjectId(req.body.partId);

    if (req.body.delete) {
      await Project.updateOne(
        { _id: req.params.id },
        {
          $pull: { imageParts: { _id: partId } },
        }
      );
    } else {
      await Project.updateOne(
        { _id: req.params.id, 'imageParts._id': partId },
        {
          $set: {
            'imageParts.$.name': req.body.name,
            'imageParts.$.images': req.body.images,
          },
        }
      );
    }
  } else {
    await Project.findByIdAndUpdate(req.params.id, {
      imageParts: [
        ...project.imageParts,
        { name: req.body.name, images: req.body.images },
      ],
    });
  }

  const updatedProject = await Project.findById(req.params.id);
  res.status(200).json(updatedProject);
});

//@desc   Delete project
//@route  GET /api/projects/:id
//@access Private
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  await Project.findByIdAndDelete(req.params.id);

  const images = await Image.find({ projectId: req.params.id });

  for (let i = 0; i < images.length; i++) {
    await Image.findByIdAndDelete(images[i].id);
  }

  res.status(200).json({ message: 'Project deleted' });
});
