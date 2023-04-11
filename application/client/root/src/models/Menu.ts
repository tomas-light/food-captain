import { Dish } from './Dish';
import { User } from './User';

export interface Menu {
	id: string;
	name?: string;
	createDate: Date;
	lastUpdate: Date;
	author?: User;
	dishes?: Dish[];
}

type MenuForConstructor =
	| Menu
	| (Omit<Menu, 'createDate' | 'lastUpdate'> & {
			createDate: string;
			lastUpdate: string;
	  });

export class MenuInstance implements Menu {
	id: string;
	name?: string;
	createDate: Date;
	lastUpdate: Date;
	author?: User;
	dishes?: Dish[];

	constructor(menu: MenuForConstructor) {
		this.id = menu.id;
		this.name = menu.name;
		this.createDate = new Date(menu.createDate);
		this.lastUpdate = new Date(menu.lastUpdate);
		this.author = menu.author;
		this.dishes = menu.dishes;
	}
}

type MenuForConstructor =
  | Menu
  | (
    Omit<Menu, 'createDate' | 'lastUpdate'>
    & {
      createDate: string;
      lastUpdate: string;
    }
  );

export class MenuInstance implements Menu {
  id: number;
  name?: string;
  createDate: Date;
  lastUpdate: Date;
  author?: User;
  dishes?: Dish[];

  constructor(menu: MenuForConstructor) {
    this.id = menu.id;
    this.name = menu.name;
    this.createDate = new Date(menu.createDate);
    this.lastUpdate = new Date(menu.lastUpdate);
    this.author = menu.author;
    this.dishes = menu.dishes;
  }
}
