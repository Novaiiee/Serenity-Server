import { SessionGuard } from "@guards/session.guard";
import { Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../lib/user.decorator";
import { FriendService } from "./friend.service";

@Controller("friend")
@ApiTags("Friends")
export class FriendController {
	constructor(private service: FriendService) {}

	@Get("/all")
	@UseGuards(SessionGuard)
	async getAll(@CurrentUser() user) {
		return this.service.getAll(user);
	}

	@Get("/is-your-friend")
	async isYourFriend(@Query("username") username: string, @Query("userID") userID: string) {
		return this.service.isYourFriend(username, userID);
	}

	@Put("/add")
	async addFriend(@Query("username") username: string, @Query("userID") userID: string) {
		return this.service.addFriend(username, userID);
	}
}
