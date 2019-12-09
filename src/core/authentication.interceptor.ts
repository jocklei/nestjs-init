import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpException, HttpStatus } from '@nestjs/common';

import { trim } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ExecutionContext> {

    const authentication: string = trim(context.getArgs()[0].headers.authentication);

    if (!authentication) {
      throw new HttpException(`未认证`, HttpStatus.UNAUTHORIZED);
    } else {
      Logger.log(authentication);
      return next.handle().pipe(tap(() => context));
    }
  }
}
