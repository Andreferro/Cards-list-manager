import { useCallback, useLayoutEffect, useState } from 'react';
import localforage from 'localforage';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import Home from './screens/home';
import Card from './screens/card';
import WaveBackground from './components/waveBackground';

import LinkedinImg from '../../assets/linkedin.png';
import GithubImg from '../../assets/github.png';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
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
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = useCallback(async () => {
    setDarkMode((prev) => {
      localforage.setItem('darkMode', !prev);
      return !prev;
    });
  }, [setDarkMode]);

  const loadDarkMode = useCallback(async () => {
    const localStorageDarkMode = await localforage.getItem('darkMode');
    if (localStorageDarkMode) toggleDarkMode();
  }, [toggleDarkMode]);

  useLayoutEffect(() => {
    loadDarkMode();
  }, [loadDarkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-blue-200 dark:bg-sky-900 h-[calc(100vh-6rem)] dark:text-white overflow-auto">
        <WaveBackground />
        <RouterProvider router={router} />
      </div>
      <footer className="bg-blue-400 dark:bg-sky-950 h-24 relative z-10 text-white p-6 text-sm shadow-md shadow-black">
        Developed by
        {' '}
        <span className="font-semibold">
          André Ferro
        </span>
        <ul className="flex gap-8 mt-2 font-semibold">
          <li>
            <a className="flex gap-1 items-center" href="https://www.linkedin.com/in/andre-sf" target="_blank" rel="noreferrer">
              <img src={LinkedinImg} alt="Linkedin" className="h-4" />
              LinkedIn
            </a>
          </li>
          <li>
            <a className="flex gap-1 items-center" href="https://github.com/andreferro" target="_blank" rel="noreferrer">
              <img src={GithubImg} alt="Github" className="h-4 invert" />
              Github
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="fixed z-20 right-2 bottom-2 text-base flex items-center gap-1 dark:bg-white bg-slate-700 border-[1px] border-slate-200 dark:border-slate-700 p-1 rounded dark:text-black text-white"
        >
          <span className="text-base">{darkMode ? 'Light' : 'Dark'}</span>
          &#9680;
        </button>
      </footer>
    </div>
  );
}

export default App;
