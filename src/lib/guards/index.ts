import { ExecutionContext, HttpException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

const createGuard = (strategy: string) => {
	const guard = class extends AuthGuard(strategy) {
		async canActivate(context: ExecutionContext) {
			const can = (await super.canActivate(context)) as boolean;
			const request = context.switchToHttp().getRequest();

			await super.logIn(request);
			return can;
		}

		handleRequest(error: any, user: any, info: any, context: any, status: any) {
			const res = context.switchToHttp().getResponse();

			if (error) {
				res.redirect(`${process.env.CLIENT_REGISTER_FAIL_URL}?error=${error}&status=${status}`);
				throw new HttpException(error, error.status);
			}

			return user;
		}
	};

	return guard;
};

export const DiscordAuthGuard = createGuard("discord");
export const GithubAuthGuard = createGuard("github");
export const GoogleAuthGuard = createGuard("google");
export * from "./session.guard";
