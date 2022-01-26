import { Exception } from 'Exceptions/Exception';

export class EnvironmentNotLoadedException extends Exception {
  constructor(
    message: string = 'environment file not loaded exception',
    status: number = 503,
  ) { super(message, status); }
}
