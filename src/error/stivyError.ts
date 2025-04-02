export class StivyError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
  
    constructor(
      message: string,
      statusCode: number = 400,
      isOperational: boolean = true
    ) {
      super(message);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }