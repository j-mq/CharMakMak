export enum partTypes {
  Image = 'image',
  Selection = 'selection',
  Description = 'description',
}

export type SelectionPart = {
  name: string;
  options: string[];
  _id: string;
};

export type DescriptionPart = {
  name: string;
  _id: string;
};

export type ImagePart = {
  name: string;
  images: string[];
  _id: string;
};

export const MAX_DESCRIPTION_INPUT = 500;
