import { Exception } from 'Exceptions/Exception';

export class FileNotFoundException extends Exception {
  constructor(
    message: string = 'file not found exception',
    status: number = 404,
  ) { super(message, status); }
}
