import { Injectable } from "@nestjs/common";
import { UserProfileDTO, UserProviderDTO } from "@user/dto";
import { User, UserDocument } from "@user/user.entity";
import { UserService } from "@user/user.service";
import { v4 } from "uuid";

export interface ValidateUser {
	user: User | null;
	error: string | null;
}

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async validateUser({ email, provider, avatar }: UserProviderDTO): Promise<ValidateUser> {
		const providers = ["google", "discord", "github"].filter((p) => p !== provider);

		let user: User = await this.userService.getUserWithProvider(provider, email);
		if (user) return { user, error: null };

		//Check if the user signed in with a different provider
		//If they did, return an error saying you used X provider
		user = await this.userService.getUserWithProvider(providers[0], email);
		if (user) return { user, error: `You logged in with ${providers[0]}` };

		user = await this.userService.getUserWithProvider(providers[1], email);
		if (user) return { user, error: `You logged in with ${providers[1]}` };

		user = await this.createUser({ email, avatar, provider });
		return { user, error: null };
	}

	async createUser({ email, avatar, provider }: UserProviderDTO): Promise<User> {
		const user = await this.userService.create({
			email,
			provider,
			avatar,
			userID: v4(),
			username: "",
			pronouns: "",
			bio: "",
			completed: false,
			friends: [],
			posts: [],
			followedTags: [],
			socials: {
				discord: "",
				instagram: "",
			},
		});

		return user;
	}

	async completeRegistration(data: UserProfileDTO, user: UserDocument): Promise<UserDocument> {
		const updated = this.userService.updateDraftUser(data, user);
		return updated;
	}
}
