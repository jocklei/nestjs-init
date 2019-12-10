import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';

import { trim } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ExecutionContext> {

    const signInRegExp: RegExp = new RegExp('signIn', 'i');

    const url: string = context.getArgs()[0].url;

    const authentication: string = trim(context.getArgs()[0].headers.authentication);

    if (!signInRegExp.test(url) && !authentication) {
      throw new UnauthorizedException();
    } else {
      return next.handle().pipe(tap(() => context));
    }
  }
}
