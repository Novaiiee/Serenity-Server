import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "@user/user.entity";
import { UserService } from "@user/user.service";

@Injectable()
export class FriendService {
	constructor(private userService: UserService) {}

	async getAll(user: UserDocument) {
		const friends = await this.userService.getUsersWithID(user.friends);

		return friends.map((doc) => ({
			avatar: doc.avatar,
			username: doc.username,
			userID: doc.userID,
		}));
	}

	async isYourFriend(username: string, userID: string) {
		const user: User = await this.userService.getUserWithUsername(username);
		if (!user) throw new NotFoundException("User not found");

		const friends = user.friends.includes(userID);
		return friends;
	}

	async addFriend(username: string, userID: string) {
		
	}
}
