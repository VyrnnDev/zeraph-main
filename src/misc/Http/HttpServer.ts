/// <reference path="../../../@types/index.ts" />

import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { IHttpServer, IMiddleware } from '@vyrnn:Zeraph/Main/Http';

import { Router } from 'Misc/Http/Router';

import { Exception } from '../../exceptions/Exception';

export class HttpServer implements IHttpServer {
  protected instance!: FastifyInstance;

  constructor() {
    /**
     * Create instance of fastify
     */

    this.instance = Fastify();

    /**
     * Change default error handler
     */

    this.instance.setErrorHandler((
      error: Error,
      _request: FastifyRequest,
      response: FastifyReply,
    ) => {
      response.status(error instanceof Exception ? error.status : 500).send({
        message: error.message,
      });
    });
  }

  public registerMiddleware = (...middlewares: IMiddleware[]) => {
    for (const { handle } of middlewares) {
      this.instance.addHook(
        'onRequest',
        handle,
      );
    }
  };

  public listen = async (port: number, callback?: () => void) => {
    /**
     * Prepare router
     */

    Router.prepare(this.instance).then(() => {
      /**
       * Start server and serve on port @port
       */

      this.instance.listen(port, () => (callback ? callback() : {}));
    });
  };
}
