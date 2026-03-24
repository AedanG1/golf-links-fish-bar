export type Category = 'From the Sea' | 'Chips' | 'Sides' | 'Burgers';

export interface MenuItem {
  category: Category;
  name: string;
  desc: string;
  price: number;
};