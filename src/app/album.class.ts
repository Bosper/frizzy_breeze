import { AlbumCategory } from './category.class';

export class Album {
  id: number;
  title: string;
  desc: string;
  photoId: number[];
  start: boolean;
  category: number;
  order: number;
  active: boolean;
  cover: number;
}