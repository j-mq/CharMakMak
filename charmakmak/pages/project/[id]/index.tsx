import Meta from '../../../components/Meta';
import Link from 'next/link';
import ProjectDisplay from '../../../components/ProjectDisplay';
import ProjectEditor from '../../../components/ProjectEditor';
import ItemSelection, {
  ItemSelectionData,
} from '../../../components/ItemSelection';
import TextInput from '../../../components/TextInput';
import { useState } from 'react';

type ProjectProps = {
  project: any;
};

const Project = ({ project }: ProjectProps) => {
  const [textInput, setTextInput] = useState('');

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

  return (
    <>
      <Meta title={'project'} description={'project description'} />
      <ProjectDisplay>
        <ItemSelection
          label='Item Title'
          data={dummyData}
          type='selection'
          placeholder='please select'
        />
        <ItemSelection
          label='Item Title Images Item Title ImagesItem Title ImagesItem Title ImagesItem Title Images'
          data={imagesDummyData}
          type='image'
          placeholder='please select'
        />
        <TextInput
          value={textInput}
          onChange={(value) => setTextInput(value)}
          label='Item Input Text Item Input TextItem Input TextItem Input TextItem Input TextItem Input TextItem Input TextItem Input Text'
          data={imagesDummyData}
          type='image'
          placeholder='please select'
        />
        <Link href='/'>Go Back</Link>
      </ProjectDisplay>
      <ProjectEditor></ProjectEditor>
    </>
  );
};

export default Project;
