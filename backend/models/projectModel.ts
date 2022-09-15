import { Schema, model } from 'mongoose';

interface IProject {
  user: Schema.Types.ObjectId;
  name: string;
  nftAllowed: boolean;
  // imageParts: Schema.Types.ObjectId[];
  selectionParts: {
    name: string;
    options: string[];
  }[];
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
    // imageParts: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'ImagePart',
    // },
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
    // descriptionParts: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'DescriptionPart',
    // },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
