import Meta from '../../../components/Meta';
import ProjectDisplay from '../../../components/ProjectDisplay';
import ProjectEditor from '../../../components/ProjectEditor';
import ItemSelection, {
  ItemSelectionData,
} from '../../../components/ItemSelection';
import TextInput from '../../../components/TextInput';
import { useState } from 'react';
import { server } from '../../../config';
import {
  MAX_DESCRIPTION_INPUT,
  partTypes,
  Project,
  ProjectImages,
} from '../../../constants/constants';
import { updateProject } from '../fetch';

type ProjectProps = {
  project: Project;
  images: ProjectImages[];
};

const Project = ({ project, images }: ProjectProps) => {
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

  const onAddPart = (partType: partTypes) => {
    console.log('please add', partType);
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

  const makeImageParts = () => {
    return project.imageParts.map((part) => {
      const imagesData: ItemSelectionData = images
        .filter((image) => part.images.includes(image._id))
        .map((image) => {
          return {
            label: image.name,
            value: image._id,
            image: image.img,
          };
        });

      return (
        <ItemSelection
          key={part._id}
          label={part.name}
          data={imagesData}
          type='image'
          placeholder='please select'
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
        {makeImageParts()}
        {makeDescriptionParts()}
      </ProjectDisplay>
      <ProjectEditor
        project={project}
        images={images}
        addPart={onAddPart}
      ></ProjectEditor>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const projectRes = await fetch(`${server}/api/projects/${context.params.id}`);
  const projectImagesRes = await fetch(
    `${server}/api/images/${context.params.id}`
  );

  const project = await projectRes.json();
  const imagesRaw = await projectImagesRes.json();

  const images = imagesRaw.map((image: any) => {
    const buffer = Buffer.from(image.img.data);
    const b64 = buffer.toString('base64');
    const mimeType = image.img.contentType;

    return {
      ...image,
      img: {
        b64,
        mimeType,
      },
    };
  });

  return {
    props: {
      project,
      images,
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
