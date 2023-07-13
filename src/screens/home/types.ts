export type CardType = {
  id: string;
  title: string;
  description: string;
};

export type ListType = {
  id: string;
  title: string;
  cards: CardType[];
};
