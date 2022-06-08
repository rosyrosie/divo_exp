export type reviewType = {
  id: number;
  naverPlace_id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  isChecked: boolean;
  src: 'blog' | 'place';
  url: string;
}