import { useEffect, useState } from 'react';
import localforage from 'localforage';
import { ListType } from '../../screens/home/types';

type OptionsMenuType = {
  elementId: string;
  elementType: 'card' | 'list';
  list: ListType[];
  refresh: () => void;
  handleCreateCard: () => void;
};

export default function OptionsMenu({
  elementId, elementType, list, refresh, handleCreateCard,
}: OptionsMenuType) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (isMenuVisible) {
      window.addEventListener('click', () => {
        setIsMenuVisible(false);
      });
    } else {
      window.removeEventListener('click', () => { });
    }

    return () => {
      window.removeEventListener('click', () => { });
    };
  }, [isMenuVisible]);

  async function handleDelete() {
    if (elementType === 'list') {
      const newList = await localforage.setItem('lists', list.filter((item) => item.id !== elementId));
      if (newList) refresh();
    }
  }

  const ACTIONS = [
    { title: 'Create Card', action: handleCreateCard },
    { title: 'Delete', action: handleDelete },
  ];

  return (
    <>
      <button
        className="absolute right-0 top-0 w-8 h-8"
        onClick={(event) => {
          event.stopPropagation();
          setIsMenuVisible(true);
        }}
        type="button"
      >
        <strong>⋮</strong>
      </button>
      {isMenuVisible && (
        <ul className="options-menu">
          {ACTIONS.map(({ title, action }) => (
            <li
              className="dark:bg-slate-600 dark:hover:bg-slate-500 hover:bg-slate-100"
              key={title}
            >
              <button
                onClick={() => action()}
                className="p-2 w-full"
                type="button"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
