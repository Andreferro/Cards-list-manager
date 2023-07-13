import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Home from './screens/home';
import Card from './screens/card';
import WaveBackground from './components/waveBackground';

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
        path: '/:listId/:cardId',
        element: <Card />,
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
]);

function App() {
  return (
    <div className="overflow-hidden bg-blue-200 h-screen">
      <WaveBackground />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
