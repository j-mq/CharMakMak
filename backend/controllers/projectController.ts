import asyncHandler from 'express-async-handler';
import { Project } from '../models/projectModel';
import { Image } from '../models/imageModel';
import mongoose from 'mongoose';
// import { User } from "../models/userModel";

//@desc   Get goals
//@route  GET /api/project/:id
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

//@desc   Set goals
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
//@route  PUT /api/project/:id
//@access Private
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
    name: req.body.name || project.name,
    nftAllowed: req.body.nftAllowed || project.nftAllowed,
  });

  res.status(200).json(updatedProject);
});

//@desc   Update selectionParts
//@route  PUT /api/project/:id/selection-parts/
//@access Private
export const updateSelectionParts = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  if (req.body.partId) {
    const partId = new mongoose.Types.ObjectId(req.body.partId);

    await Project.updateOne(
      { _id: req.params.id, 'selectionParts._id': partId },
      {
        $set: {
          'selectionParts.$.name': req.body.name,
          'selectionParts.$.options': req.body.options,
        },
      }
    );

    const updatedProject = await Project.findById(req.params.id);
    res.status(200).json(updatedProject);
  } else {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
      selectionParts: [
        ...project.selectionParts,
        { name: req.body.name, options: req.body.options },
      ],
    });

    res.status(200).json(updatedProject);
  }
});

//@desc   Update imageParts
//@route  PUT /api/project/:id/image-parts
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
    console.log('The existing image is: ', existingImage?.name);
    if (!existingImage) {
      res.status(400);
      throw new Error('Image not found');
    }
  }

  if (req.body.partId) {
    const partId = new mongoose.Types.ObjectId(req.body.partId);

    await Project.updateOne(
      { _id: req.params.id, 'imageParts._id': partId },
      {
        $set: {
          'imageParts.$.name': req.body.name,
          'imageParts.$.images': req.body.images,
        },
      }
    );

    const updatedProject = await Project.findById(req.params.id);
    res.status(200).json(updatedProject);
  } else {
    await Project.findByIdAndUpdate(req.params.id, {
      imageParts: [
        ...project.imageParts,
        { name: req.body.name, images: req.body.images },
      ],
    });

    const updatedProject = await Project.findById(req.params.id);
    res.status(200).json(updatedProject);
  }
});

//TODO: Delete selectionParts based on id
//TODO: Delete imageParts based on id
//TODO: Delete image based on id

//TODO: Delete project based on id

//TODO Add all of the same for description parts

//@desc   Delete goal
//@route  GET /api/goals/:id
//@access Private
// export const deleteGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id);
//   if (!goal) {
//     res.status(400);
//     throw new Error("Goal not found");
//   }

//   if (req.user) {
//     //Make sure the loged in user matches the goal user
//     if (goal.user.toString() !== req.user.id) {
//       res.status(401);
//       throw new Error("User not authorized");
//     }
//     await goal.remove();
//     res.status(200).json({ id: req.params.id });
//   } else if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }
// });
