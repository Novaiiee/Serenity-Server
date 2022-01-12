import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostService } from "@post/post.service";
import { EditUserDTO, UserProfileDTO } from "@user/dto";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		private postService: PostService
	) {}

	async create(user: User) {
		return this.userModel.create(user);
	}

	async getUserWithEmail(email: string) {
		return await this.userModel.findOne({ email });
	}

	async getUserWithUsername(username: string) {
		return await this.userModel.findOne({ username });
	}

	async getUserWithID(userID: string) {
		return await this.userModel.findOne({ userID });
	}

	async getUsersWithID(userIDs: string[]) {
		const users: UserDocument[] = await Promise.all(
			userIDs.map((id) => {
				return this.getUserWithID(id);
			})
		);

		return users;
	}

	async getUserProfile(username: string): Promise<Partial<User>> {
		const user: User = await this.getUserWithUsername(username);
		if (!user) throw new NotFoundException("User not found");

		const posts = await this.postService.getPostsByUserID(user.userID);

		return {
			username: user.username,
			userID: user.userID,
			bio: user.bio,
			avatar: user.avatar,
			socials: user.socials,
			posts,
		};
	}

	async getUserWithProvider(provider: string, email: string) {
		return await this.userModel.findOne({ provider, email });
	}

	async editUser(data: EditUserDTO, user: UserDocument): Promise<User> {
		const doesUserExist = await this.getUserWithUsername(data.username);
		if (doesUserExist && user.username !== doesUserExist.username)
			throw new HttpException("User with that username is already exists", 404);

		await this.userModel.updateOne(
			{ userID: doesUserExist.userID },
			{
				username: data.username ?? user.username,
				bio: data.bio ?? user.bio,
				avatar: data.avatar ?? user.avatar,
				pronouns: data.pronouns ?? user.pronouns,
			}
		);

		const updated = await this.getUserWithUsername(data.username);
		return updated;
	}

	async updateDraftUser(data: any, user: UserDocument) {
		await this.userModel.updateOne(
			{ userID: user.userID },
			{
				...data,
				completed: true,
			}
		);

		const updated = await this.getUserWithUsername(user.username);
		return updated;
	}

	async completeRegistration(data: UserProfileDTO, user: UserDocument) {
		if (await this.getUserWithUsername(data.username)) {
			throw new HttpException("Username taken", 400);
		}

		await this.updateDraftUser(data, user);

		const updatedUser = await this.getUserWithID(user.userID);
		return updatedUser;
	}
}
