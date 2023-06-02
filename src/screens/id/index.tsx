import { useLoaderData } from 'react-router-dom';

export default function Id() {
  const id = useLoaderData() as number;

  return (
    <div>
      {id}
    </div>
  );
}
