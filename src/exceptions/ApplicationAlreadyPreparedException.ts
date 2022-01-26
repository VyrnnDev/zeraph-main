import { Exception } from 'Exceptions/Exception';

export class ApplicationAlreadyPreparedException extends Exception {
  constructor(
    message: string = 'application is already prepared',
    status: number = 500,
  ) { super(message, status); }
}
