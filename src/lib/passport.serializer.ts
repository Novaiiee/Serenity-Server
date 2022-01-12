import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@user/user.entity";
import { UserService } from "@user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly userService: UserService) {
		super();
	}

	serializeUser(user: User, done: CallableFunction) {
		done(null, user);
	}

	async deserializeUser(user: User, done: CallableFunction) {
		const userDocument = await this.userService.getUserWithID(user.userID);
		return userDocument ? done(null, userDocument) : done(null, null);
	}
}
