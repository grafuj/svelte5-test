import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return getRepository(User).find();
  }

  @Mutation(() => User)
  async addUser(
    @Arg('username') username: string,
    @Arg('email') email: string
  ): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    return getRepository(User).save(user);
  }
}