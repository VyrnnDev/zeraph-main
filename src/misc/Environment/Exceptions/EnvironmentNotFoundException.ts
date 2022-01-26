import { Exception } from 'Exceptions/Exception';

export class EnvironmentNotFoundException extends Exception {
  constructor(
    message: string = 'environment not found exception',
    status: number = 404,
  ) { super(message, status); }
}
