import { LoaderFunction, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './screens/home';
import Id from './screens/id';

// Used a generic type since it only needs the 'id' param
async function loadData<D extends { params: { id: number } }>(data: D) {
  const { id } = data.params;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 2000);
  });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/new',
        element: <div>New</div>,
      },
      {
        path: '/:id',
        loader: loadData as LoaderFunction,
        element: <Id />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Error</div>,
    errorElement: <div>Error page</div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
