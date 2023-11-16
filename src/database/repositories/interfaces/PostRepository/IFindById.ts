import IPost from '../../../../models/post.model';

export interface IFindById
  extends Pick<IPost, 'id' | 'createdAt' | 'title' | 'content'> {
  category: {
    name: string;
  };
  author: {
    name: string;
  };
}
