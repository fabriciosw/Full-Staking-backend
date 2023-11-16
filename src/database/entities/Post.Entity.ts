import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Category from './PostCategory.Entity';
import User from './User.Entity';
import Base from './Base.Entity';

@Entity('posts')
export default class Post extends Base {
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;
}
