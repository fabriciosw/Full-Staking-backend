import { Column, Entity, OneToMany } from 'typeorm';
import UserPermission from './enums/UserPermission';
import Base from './Base.Entity';
import Post from './Post.Entity';

@Entity('users')
export default class User extends Base {
  @Column({ length: 120 })
  public name: string;

  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.NONE,
    nullable: false,
  })
  public permission: UserPermission;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];
}
