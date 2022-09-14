import { Schema, model } from 'mongoose';

interface IProject {
  user: Schema.Types.ObjectId;
  name: string;
  nftAllowed: boolean;
  // imageParts: Schema.Types.ObjectId[];
  selectionParts: Schema.Types.ObjectId[];
  // descriptionParts: Schema.Types.ObjectId[];
}

const goalSchema = new Schema<IProject>(
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
    selectionParts: {
      type: [Schema.Types.ObjectId],
      ref: 'SelectionPart',
    },
    // descriptionParts: {
    //   type: [Schema.Types.ObjectId],
    //   ref: 'DescriptionPart',
    // },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', goalSchema);
