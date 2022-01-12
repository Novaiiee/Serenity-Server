import { SessionGuard } from "@guards/index";
import { Body, Controller, Get, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EditUserDTO, UserProfileDTO } from "@user/dto";
import { CurrentUser } from "../../lib/user.decorator";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("/user")
@ApiTags("User")
export class UserController {
	constructor(private service: UserService) {}

	@Get("/user-data")
	@UseGuards(SessionGuard)
	sessionData(@Req() req) {
		return req.user;
	}

	@Put("/update")
	@UseGuards(SessionGuard)
	async editUser(@Body() data: EditUserDTO, @CurrentUser() user): Promise<User> {
		return this.service.editUser(data, user);
	}

	@Put("/complete")
	@UseGuards(SessionGuard)
	async completeRegistration(@Body() data: UserProfileDTO, @CurrentUser() user) {
		return this.service.completeRegistration(data, user);
	}

	@Get("/user-profile")
	async getUserProfile(@Query("username") username: string) {
		return this.service.getUserProfile(username);
	}
}
