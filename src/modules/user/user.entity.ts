import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@post/post.entity";
import { Document } from "mongoose";

export class Socials {
	@ApiProperty()
	discord: string;

	@ApiProperty()
	instagram: string;
}

@Schema({ collection: "serenity-users" })
export class User {
	@ApiProperty()
	@Prop()
	username: string;

	@ApiProperty()
	@Prop({ required: true })
	email: string;

	@ApiProperty()
	@Prop({ required: true })
	userID: string;

	@ApiProperty()
	@Prop()
	provider: string;

	@ApiProperty()
	@Prop()
	bio: string;

	@ApiProperty()
	@Prop()
	pronouns: string;

	@ApiProperty()
	@Prop()
	avatar: string;

	@ApiProperty()
	@Prop()
	completed: boolean;

	@ApiProperty({ type: () => [String] })
	@Prop({ type: () => [String], required: true })
	friends: string[];

	@ApiProperty({ type: () => [String] })
	@Prop({ type: () => [String], required: true })
	followedTags: string[];

	@ApiProperty({ type: () => Socials })
	@Prop({ type: () => Socials, required: true })
	socials: Socials;

	@ApiProperty({ type: () => [Post] })
	@Prop({ type: () => [Post], required: true })
	posts: Post[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
