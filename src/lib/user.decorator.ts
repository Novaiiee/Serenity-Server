import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "../modules/user/user.entity";

export const CurrentUser = createParamDecorator<UserDocument>((data: unknown, context: ExecutionContext) => {
	const req = context.switchToHttp().getRequest();
	return req.user;
});
