import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class SessionGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const req = context.switchToHttp().getRequest() as Request;
		return req.isAuthenticated();
	}
}
