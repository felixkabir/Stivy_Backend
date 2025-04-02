export class StivyError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errorCode: string;
  
    constructor(
      message: string,
      statusCode: number = 400,
      errorCode: string = 'GENERIC_ERROR',
      isOperational: boolean = true
    ) {
      super(message);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errorCode = errorCode;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    toJSON() {
      return {
        error: true,
        statusCode: this.statusCode,
        errorCode: this.errorCode,
        message: this.message
      };
    }
}

export class BadRequestError extends StivyError {
  constructor(message: string = "Requisição inválida", errorCode: string = 'BAD_REQUEST') {
    super(message, 400, errorCode);
  }
}

export class UnauthorizedError extends StivyError {
  constructor(message: string = "Não autorizado", errorCode: string = 'UNAUTHORIZED') {
    super(message, 401, errorCode);
  }
}

export class ForbiddenError extends StivyError {
  constructor(message: string = "Acesso negado", errorCode: string = 'FORBIDDEN') {
    super(message, 403, errorCode);
  }
}

export class NotFoundError extends StivyError {
  constructor(message: string = "Recurso não encontrado", errorCode: string = 'NOT_FOUND') {
    super(message, 404, errorCode);
  }
}

export class ConflictError extends StivyError {
  constructor(message: string = "Conflito", errorCode: string = 'CONFLICT') {
    super(message, 409, errorCode);
  }
}

export class UserAlreadyExistsError extends ConflictError {
  constructor() {
    super("Usuário já cadastrado", 'USER_ALREADY_EXISTS');
  }
}

export class ValidationError extends BadRequestError {
  constructor(message: string = "Erro de validação", errorCode: string = 'VALIDATION_ERROR') {
    super(message, errorCode);
  }
}

export class InternalServerError extends StivyError {
  constructor(message: string = "Erro interno no servidor", errorCode: string = 'INTERNAL_ERROR') {
    super(message, 500, errorCode);
  }
}

export class DatabaseError extends InternalServerError {
  constructor(message: string = "Erro no banco de dados", errorCode: string = 'DATABASE_ERROR') {
    super(message, errorCode);
  }
}

export class FileUploadError extends BadRequestError {
  constructor(message: string = "Erro ao fazer upload do arquivo", errorCode: string = 'FILE_UPLOAD_ERROR') {
    super(message, errorCode);
  }
}