import { Exception } from 'Exceptions/Exception';

export class InsufficientPermissionException extends Exception {
  constructor(
    message: string = 'insufficient permissions exception',
    status: number = 403,
  ) { super(message, status); }
}
