import asyncHandler from 'express-async-handler';
import path from 'path';
import { Image } from '../models/imageModel';
import { IProject, Project } from '../models/projectModel';
import fs from 'fs';

//@desc   Set goals
//@route  POST /api/image
//@access Private
export const getImage = asyncHandler(async (req, res) => {
  Image.find({}, (err: any, items: any) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json({ items });
    }
  });
});

export const setImage = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project || !req.file) {
    res.status(400);
    throw new Error('Project not found');
  }

  const imageObject = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, '..', 'uploads', req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  };

  const newImage = await Image.create(imageObject);

  const newImageParts: IProject['imageParts'] = [
    { name: req.body.partsName, images: [newImage.id] },
  ];

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.projectId,
    {
      imageParts: [...project.imageParts, ...newImageParts],
    },
    { new: true }
  );

  res.status(200).json({ updatedProject });
});
