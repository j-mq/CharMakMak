import asyncHandler from 'express-async-handler';
import path from 'path';
import { Image } from '../models/imageModel';
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
  if (req.file) {
    const imageObject = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
        data: fs.readFileSync(
          path.join(__dirname, '..', 'uploads', req.file.filename)
        ),
        contentType: 'image/png',
      },
    };
    Image.create(imageObject, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  }
});
