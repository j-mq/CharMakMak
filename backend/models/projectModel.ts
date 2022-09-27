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
  imageParts: {
    name: string;
    images: Schema.Types.ObjectId[];
    _id: Schema.Types.ObjectId;
  }[];
  allImages: Schema.Types.ObjectId[];
  // descriptionParts: Schema.Types.ObjectId[];
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
    allImages: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Image',
      },
    ],
    // descriptionParts: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'DescriptionPart',
    // },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
