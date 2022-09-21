import { Schema, model } from 'mongoose';

interface IImage {
  name: string;
  desc: string;
  img: any;
}

const imageSchema = new Schema<IImage>(
  {
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    desc: {
      type: String,
      required: [true, 'Please add a boolean value'],
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const Image = model<IImage>('Image', imageSchema);
