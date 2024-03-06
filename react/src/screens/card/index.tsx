import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import localforage from 'localforage';

import { ListType } from '../home/types';
import TextInput from '../../components/textInput';

type ParamsType = {
  lists: ListType[],
  refresh: () => void,
};

export default function Card() {
  const { lists, refresh } = useOutletContext<ParamsType>();
  const { listId, cardId } = useParams();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Save the index of current list and card from their arrays
  const [objectIndexes, setObjectIndexes] = useState([-1, -1]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadData = useCallback(() => {
    if (!listId || !cardId || lists.length === 0) return;

    // Since the data is structured as an array of cards inside an array of list objects,
    // first find the corresponding list and the the card using the ids provided
    const listIndex = lists.findIndex((list) => list.id === listId);
    if (listIndex === -1) {
      navigate('/');
      return;
    }

    let cardIndex = -1;
    const card = lists[listIndex].cards.find((c, i) => {
      cardIndex = i;
      return c.id === cardId;
    });
    if (card) {
      setObjectIndexes([listIndex, cardIndex]);
      setTitle(card.title);
      setDescription(card.description);
      return;
    }
    navigate('/');
  }, [listId, cardId, lists, navigate]);

  const newListArray = lists.slice();

  async function deleteCard() {
    newListArray[objectIndexes[0]].cards.splice(objectIndexes[1], 1);
    await localforage.setItem('lists', newListArray);
    refresh();
    navigate('/');
  }

  async function saveContent(newValue: string, field: 'title' | 'description') {
    if (!cardId) return;
    newListArray[objectIndexes[0]].cards[objectIndexes[1]] = {
      id: cardId,
      title: field === 'title' ? newValue : title,
      description: field === 'description' ? newValue : title,
    };
    await localforage.setItem('lists', newListArray);
    refresh();
  }

  useEffect(() => {
    const dialogRefCopy = dialogRef.current;
    if (dialogRef.current) {
      loadData();
      dialogRef.current.showModal();
    }

    return () => {
      if (dialogRefCopy) dialogRefCopy.close();
    };
  }, [loadData]);

  return (
    <dialog
      ref={dialogRef}
      className="bg-transparent p-0 outline-none"
      onClick={() => navigate('/')}
      role="presentation"
    >
      <section
        className="rounded border-none bg-white dark:bg-sky-950 outline-none p-5 max-w-3xl min-w-[20rem] md:min-w-[50rem]"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <header>
          <h1>
            <strong>
              {
                title && (
                  <TextInput
                    initialValue={title}
                    onSaveTitle={(newTitle) => saveContent(newTitle, 'title')}
                    placeholder="Card title"
                  />
                )
              }
            </strong>
          </h1>
          <button
            className="absolute right-5 top-5 px-1 dark:text-white"
            onClick={() => navigate('/')}
            type="button"
          >
            <strong>X</strong>
          </button>
        </header>
        <div className="my-5">
          {
            description && (
              <TextInput
                initialValue={description}
                onSaveTitle={(newDescription) => saveContent(newDescription, 'description')}
                placeholder="Card description"
              />
            )
          }
        </div>
        <footer className="pb-8">
          <button
            type="button"
            className="rounded bg-red-400 px-2 py-1 text-white right-5 absolute"
            onClick={deleteCard}
          >
            Delete Card
          </button>
        </footer>
      </section>
    </dialog>
  );
}
