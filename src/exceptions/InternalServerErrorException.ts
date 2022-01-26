import { Exception } from 'Exceptions/Exception';

export class InternalServerErrorException extends Exception {
  constructor(
    message: string = 'internal server error',
    status: number = 500,
  ) { super(message, status); }
}
