import { partTypes } from '../../constants/constants';

type UpdateProject = {
  id: string;
  name: string;
  nftAllowed: boolean;
};

export const updateProject = async ({
  id,
  name,
  nftAllowed,
}: UpdateProject) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, nftAllowed }),
  });

  const json = await response.json();
  return json;
};

type AddPart = {
  id: string;
  partType: partTypes;
};

export const addPart = async ({ id, partType }: AddPart) => {
  if (partType === partTypes.Selection) {
    const newSelectionPart = {
      partId: '',
      name: 'New Selection Part',
      options: ['Option 1', 'Option 2'],
      delete: false,
    };

    const response = await fetch(`/api/projects/${id}/selection-parts/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSelectionPart),
    });

    const json = await response.json();
    return json;
  }

  //TODO: add other parts
};
