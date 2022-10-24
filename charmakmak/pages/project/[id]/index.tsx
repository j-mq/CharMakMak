import Meta from '../../../components/Meta';
import Link from 'next/link';
import ProjectDisplay from '../../../components/ProjectDisplay';
import ProjectEditor from '../../../components/ProjectEditor';

type ProjectProps = {
  project: any;
};

const Project = ({ project }: ProjectProps) => {
  return (
    <>
      <ProjectDisplay>
        <Meta title={'project'} description={'project description'} />
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
