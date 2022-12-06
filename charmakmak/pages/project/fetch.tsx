import { Project } from '../../constants/constants';

//const fetcher = (...args: any[]) => fetch(null, args).then((res) => res.json())

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
