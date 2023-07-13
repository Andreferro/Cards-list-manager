import { createContext } from 'react';
import { ListType } from '../screens/home/types';

export const ListsContext = createContext<ListType[] | null>(null);
