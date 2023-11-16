import IBase from './base.model';

export default interface IPost extends IBase {
  author: string;
  category: string;
  title: string;
  content: string;
}
