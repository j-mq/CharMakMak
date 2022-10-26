import Meta from '../../../components/Meta';
import Link from 'next/link';
import ProjectDisplay from '../../../components/ProjectDisplay';
import ProjectEditor from '../../../components/ProjectEditor';
import ItemSelection, {
  ItemSelectionData,
} from '../../../components/ItemSelection';

type ProjectProps = {
  project: any;
};

const Project = ({ project }: ProjectProps) => {
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

  return (
    <>
      <ProjectDisplay>
        <Meta title={'project'} description={'project description'} />

        <ItemSelection
          data={dummyData}
          type='selection'
          placeholder='please select'
        />
        <ItemSelection
          data={dummyData}
          type='image'
          placeholder='please select'
        />
        <h1>My First Project</h1>
        <p>Project Body</p>
        <br />
        <Link href='/'>Go Back</Link>
      </ProjectDisplay>
      <ProjectEditor></ProjectEditor>
    </>
  );
};

export default Project;
