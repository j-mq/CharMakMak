import { Schema, model } from 'mongoose';

export interface IImage {
  name: string;
  img: any;
  projectId: Schema.Types.ObjectId;
}

const imageSchema = new Schema<IImage>(
  {
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
  },
  { timestamps: true }
);

export const Image = model<IImage>('Image', imageSchema);
