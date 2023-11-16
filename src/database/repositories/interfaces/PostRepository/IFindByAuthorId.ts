import IPost from '../../../../models/post.model';

interface IFindByAuthorIdObj
  extends Pick<IPost, 'id' | 'title' | 'content' | 'createdAt'> {
  category: {
    name: string;
  };
}

export type IFindByAuthorId = IFindByAuthorIdObj[];
