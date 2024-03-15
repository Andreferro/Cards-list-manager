import { useCallback, useEffect, useState } from 'react';
import localforage from 'localforage';
import { Link, Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { CardType, ListType } from './types';
import OptionsMenu from '../../components/optionsMenu';
import TextInput from '../../components/textInput';

function BlueButton({
  children,
  onClick,
}: {
  children: string,
  onClick: () => void,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded w-full text-white bg-blue-400 hover:bg-blue-500 dark:bg-sky-700 dark:hover:bg-sky-600 py-2 text-xs"
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [listsArray, setListsArray] = useState<ListType[]>([]);

  const loadData = useCallback(async () => {
    const value: ListType[] | null = await localforage.getItem('lists');
    if (value) setListsArray(value);
  }, []);

  async function saveListTitle(newTitle: string, paramListId: string) {
    await localforage.setItem('lists', listsArray.map((list) => (
      { ...list, title: paramListId === list.id ? newTitle : list.title }
    )));
    loadData();
  }

  const createList = useCallback(async () => {
    await localforage.setItem('lists', [...listsArray, {
      id: uuidv4(),
      title: '',
      cards: [],
    }]);
    loadData();
  }, [listsArray, loadData]);

  const createCard = useCallback(async (
    listIdentifier: string,
    listTitle: string,
    cards: CardType[],
  ) => {
    const currentList: ListType = {
      id: listIdentifier,
      title: listTitle,
      cards: [
        ...cards,
        {
          id: uuidv4(),
          title: 'My new card!',
          description: 'Click here to change the description!',
        },
      ],
    };
    const newListArray = await localforage.setItem('lists', [...listsArray.map((list) => {
      if (list.id === listIdentifier) return currentList;
      return list;
    })]);
    setListsArray(newListArray);
  }, [listsArray]);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <div className="w-full h-full z-10 relative">
      <div className="p-5 w-full h-full flex gap-5 overflow-x-auto snap-x">
        {listsArray.map(({ title, cards, id }) => (
          <div
            className="list"
            key={id}
          >
            <div className="relative w-52">
              <TextInput
                initialValue={title}
                onSaveTitle={(newTitle) => saveListTitle(newTitle, id)}
                placeholder="List title"
              />
              <OptionsMenu
                elementId={id}
                elementType="list"
                list={listsArray}
                refresh={loadData}
                handleCreateCard={() => createCard(id, title, cards)}
              />
            </div>
            {cards.map((card) => (
              <Link key={card.id} to={`/${id}/${card.id}`}>
                <div className="list-card">
                  <strong>{card.title}</strong>
                </div>
              </Link>
            ))}
            <BlueButton onClick={() => createCard(id, title, cards)}>
              New Card
            </BlueButton>
          </div>
        ))}

        <div className="list">
          <div className="w-52">
            <BlueButton onClick={createList}>
              New List
            </BlueButton>
          </div>
        </div>

        <Outlet context={{ lists: listsArray, refresh: loadData }} />
      </div>
    </div>
  );
}
