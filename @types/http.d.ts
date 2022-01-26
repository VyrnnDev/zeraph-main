declare module '@vyrnn:Zeraph/Main/Http' {
  import { FastifyReply, FastifyRequest } from 'fastify';

  interface IHttpServer {
    registerMiddleware: (
      ...middlewares: IMiddleware[]
    ) => void

    listen: (
      port: number,
      callback?: () => void
    ) => Promise<void>
  }

  interface IMiddleware {
    handle: (
      request: FastifyRequest,
      response: FastifyReply,
    ) => Promise<void>;
  }

  interface IRequest {
    // TODO
  }

  interface IResponse {
    // TODO
  }

  interface IRoute<
    Request extends IRequest,
    Response extends IResponse
  > {
    url: string

    method: 'GET' | 'POST' | 'PUT' | 'DELETE';

    handlers: IMiddleware[];
  
    callback: (request: Request, response: Response) => void;

    middleware: (
      ...middlewares: { new(): IMiddleware }[]
    ) => void
  }

  interface IRouter {
    
  }
}
