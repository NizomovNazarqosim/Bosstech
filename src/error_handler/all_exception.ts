import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  import { Response, Request } from 'express';
  import {
    CustomHttpExceptionResponse,
    HttpExceptionResponse,
  } from './models/http_exception_response.interface';
  import * as fs from 'fs';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status: HttpStatus;
      let errorMessage: string;
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const errorResponse = exception.getResponse();
  
        errorMessage =
          (errorResponse as HttpExceptionResponse).error || exception.message;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = 'Critical internal server error';
      }
  
      const errorResponse = this.getErrorResponse(status, errorMessage, request);
      const errorLog: string = this.getErrorLog(
        errorResponse,
        request,
        exception,
      );
      this.writeErrorLogToFile(errorLog);
      response.status(status).json(errorResponse);
    }
  
    private getErrorResponse = (
      status: HttpStatus,
      errorMessage: string,
      request: Request,
    ): CustomHttpExceptionResponse => ({
      statusCode: status,
      error: errorMessage,
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
    });
  
    private getErrorLog = (
      errorResponse: CustomHttpExceptionResponse,
      request: Request,
      exception: unknown,
    ): string => {
      const { statusCode, error } = errorResponse;
      const { method, url } = request;
      const errorLog = `Response code: ${statusCode} - Method: ${
        request.method
      } - URL: ${url}\n\n
          ${JSON.stringify(errorResponse)}
          User: ${JSON.stringify(request.user ?? 'Not signed in')}\n\n
          // ${exception instanceof HttpException ? exception.stack : error}\n\n`;
      return errorLog;
    };
  
    private writeErrorLogToFile = (errorLog: string): void => {
      fs.appendFile('error.log', errorLog, 'utf-8', (err) => {
        if (err) throw err;
      });
    };
  }
  