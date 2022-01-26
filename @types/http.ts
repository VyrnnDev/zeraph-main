declare module '@vyrnn:Zeraph/Main/Http' {
  import { FastifyReply, FastifyRequest } from 'fastify';

  export interface IHttpServer {
    registerMiddleware: (...middlewares: IMiddleware[]) => void

    listen: (port: number, callback?: () => void) => Promise<void>
  }

  export interface IMiddleware {
    handle: (
      request: FastifyRequest,
      response: FastifyReply,
    ) => Promise<void>;
  }
}
