import IPost from '../../../../models/post.model';

interface IReadAllObj extends Pick<IPost, 'id' | 'createdAt' | 'title'> {
  category: {
    name: string;
  };
  author: {
    name: string;
  };
}
export type IReadAll = IReadAllObj[];
