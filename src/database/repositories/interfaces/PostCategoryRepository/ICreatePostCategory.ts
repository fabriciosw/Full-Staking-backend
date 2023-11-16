import IPostCategory from '../../../../models/postCategory.model';

export interface ICreatePostCategory extends Pick<IPostCategory, 'name'> {}
