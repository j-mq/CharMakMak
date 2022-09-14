import { Schema, model } from 'mongoose';

interface ISelectionPart {
  name: string;
  options: string[];
}

const goalSchema = new Schema<ISelectionPart>(
  {
    name: {
      required: [true, 'Please add a text value'],
    },
    options: {
      type: [String],
      required: [true, 'Please add a text value'],
    },
  },
  { timestamps: true }
);

export const Goal = model<ISelectionPart>('Project', goalSchema);
