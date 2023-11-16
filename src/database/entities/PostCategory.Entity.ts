import { Column, Entity, OneToMany } from 'typeorm';
import Base from './Base.Entity';
import Post from './Post.Entity';

@Entity('postCategories')
export default class PostCategory extends Base {
  @Column({ length: 50, nullable: false })
  public name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
