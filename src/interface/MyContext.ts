import { ParameterizedContext } from 'koa';

export interface MyContext extends ParameterizedContext {
  session?: {
    username: String
  }
}