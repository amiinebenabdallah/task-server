import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data) {
      if (user.attributes && data in user.attributes) {
        return user.attributes[data];
      }
      return user[data];
    }

    return user;
  },
);
