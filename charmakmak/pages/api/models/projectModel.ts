import { Schema, model } from 'mongoose';

export interface IProject {
  user: Schema.Types.ObjectId;
  name: string;
  nftAllowed: boolean;
  selectionParts: {
    name: string;
    options: string[];
    _id: Schema.Types.ObjectId;
  }[];
  descriptionParts: {
    name: string;
    _id: Schema.Types.ObjectId;
  }[];
  imageParts: {
    name: string;
    images: Schema.Types.ObjectId[];
    _id: Schema.Types.ObjectId;
  }[];
  allImages: Schema.Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
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
    nftAllowed: {
      type: Boolean,
      required: [true, 'Please add a boolean value'],
    },
    selectionParts: [
      {
        name: {
          type: String,
          required: [true, 'Please add a text value'],
        },
        options: {
          type: [String],
          required: [true, 'Please add a text value'],
        },
      },
    ],
    descriptionParts: [
      {
        name: {
          type: String,
          required: [true, 'Please add a text value'],
        },
      },
    ],
    imageParts: [
      {
        name: {
          type: String,
          required: [true, 'Please add a text value'],
        },
        images: [
          {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Image',
          },
        ],
      },
    ],
    allImages: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Image',
      },
    ],
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
