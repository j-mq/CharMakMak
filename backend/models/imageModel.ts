import { Schema, model } from 'mongoose';

interface IImage {
  name: string;
  desc: string;
  image: any;
}

const imageSchema = new Schema<IImage>(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    desc: {
      type: String,
      required: [true, 'Please add a boolean value'],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    // descriptionParts: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'DescriptionPart',
    // },
  },
  { timestamps: true }
);

export const Image = model<IImage>('Image', imageSchema);
