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

export type DecodedImage = {
  mimeType: string;
  b64: string;
};

export type ProjectImages = {
  _id: string;
  name: string;
  img: DecodedImage;
};

export type Project = {
  _id: string;
  selectionParts: SelectionPart[];
  descriptionParts: DescriptionPart[];
  imageParts: ImagePart[];
  allImages: string[];
  name: string;
  nftAllowed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const MAX_DESCRIPTION_INPUT = 500;
