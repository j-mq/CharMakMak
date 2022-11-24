import Meta from '../../../components/Meta';
import Link from 'next/link';
import ProjectDisplay from '../../../components/ProjectDisplay';
import ProjectEditor from '../../../components/ProjectEditor';
import ItemSelection, {
  ItemSelectionData,
} from '../../../components/ItemSelection';
import TextInput from '../../../components/TextInput';
import { useState } from 'react';
import { server } from '../../../config';
import {
  DescriptionPart,
  MAX_DESCRIPTION_INPUT,
  SelectionPart,
} from '../../../constants/constants';

type ProjectProps = {
  project: {
    selectionParts: SelectionPart[];
    descriptionParts: DescriptionPart[];
    imageParts: [];
    allImages: [];
    name: string;
    nftAllowed: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

const Project = ({ project }: ProjectProps) => {
  const defaultTextInputs = project.descriptionParts.map((part) => {
    return {
      id: part._id,
      text: '',
    };
  });
  const [textInputs, setTextInputs] = useState<
    {
      id: string;
      text: string;
    }[]
  >(defaultTextInputs);

  const dummyData: ItemSelectionData = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
  ];

  const imagesDummyData: ItemSelectionData = [
    {
      label:
        'Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi Usagi',
      value: '1',
      imageUrl:
        'https://3.bp.blogspot.com/-To8tA3yiE0k/VJF_QawmPdI/AAAAAAAAp0w/oihka8c4k90/s400/animalface_usagi.png',
    },
    {
      label: '2',
      value: '2',
      imageUrl:
        'https://3.bp.blogspot.com/-To8tA3yiE0k/VJF_QawmPdI/AAAAAAAAp0w/oihka8c4k90/s400/animalface_usagi.png',
    },
    {
      label: '3',
      value: '3',
      imageUrl:
        'https://3.bp.blogspot.com/-To8tA3yiE0k/VJF_QawmPdI/AAAAAAAAp0w/oihka8c4k90/s400/animalface_usagi.png',
    },
  ];

  const onUpdateProjectName = (newName: string) => {
    if (newName !== project.name) {
      console.log('update name', newName);
    }
  };

  const makeSelectionParts = () => {
    return project.selectionParts.map((part) => {
      const selectionData = part.options.map((option) => {
        return {
          label: option,
          value: `${option}-${part._id}`,
        };
      });
      return (
        <ItemSelection
          key={part._id}
          label={part.name}
          data={selectionData}
          type='selection'
          placeholder='-'
        />
      );
    });
  };

  const onUpdateTextInput = (id: string, text: string) => {
    const newTextInput = textInputs.map((input) => {
      if (input.id === id) {
        return { ...input, text };
      }
      return input;
    });
    setTextInputs(newTextInput);
  };

  const makeDescriptionParts = () => {
    return project.descriptionParts.map((part) => {
      return (
        <TextInput
          key={part._id}
          value={textInputs.find((input) => input.id === part._id)?.text || ''}
          type='multi'
          onChange={(value) => onUpdateTextInput(part._id, value)}
          label={part.name}
          placeholder='...'
          maxCharacters={MAX_DESCRIPTION_INPUT}
        />
      );
    });
  };

  return (
    <>
      <Meta title={'project'} description={'project description'} />
      <ProjectDisplay>
        {makeSelectionParts()}
        <ItemSelection
          label='Item Title Images Item Title ImagesItem Title ImagesItem Title ImagesItem Title Images'
          data={imagesDummyData}
          type='image'
          placeholder='please select'
        />
        {makeDescriptionParts()}
      </ProjectDisplay>
      <ProjectEditor
        projectName={project.name}
        updateProjectName={onUpdateProjectName}
      ></ProjectEditor>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${server}/api/projects/${context.params.id}`);

  const project = await res.json();
  return {
    props: {
      project,
    },
  };
};

export const getStaticPaths = async () => {
  //Should be changed to get projects from database based on user's id
  const availableProjects = [
    '637b48bb92ba5d62877f86d0',
    '637f2ac1644adcedc935fd79',
  ];
  const paths = availableProjects.map((id: any) => ({
    params: { id: id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export default Project;
