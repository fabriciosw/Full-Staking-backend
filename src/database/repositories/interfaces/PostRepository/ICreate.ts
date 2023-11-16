import IPost from '../../../../models/post.model';

export interface ICreate extends Pick<IPost, 'title' | 'content'> {
  authorId: string;
  categoryId: string;
}
