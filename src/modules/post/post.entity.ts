import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "@post/dto";
import { Document } from "mongoose";

@Schema({ collection: "serenity-posts" })
export class Post {
	@ApiProperty()
	@Prop()
	userID: string;

	@ApiProperty()
	@Prop()
	postID: string;

	@ApiProperty()
	@Prop()
	createdAt: string;

	@ApiProperty()
	@Prop()
	username: string;

	@ApiProperty()
	@Prop({ index: true,  })
	name: string;

	@ApiProperty()
	@Prop({ index: true })
	content: string;

	@ApiProperty()
	@Prop()
	avatar: string;

	@ApiProperty({ type: () => [Comment] })
	@Prop(() => [Comment])
	comments: Comment[];

	@ApiProperty({ type: () => [String] })
	@Prop(() => [String])
	tags: string[];
}
export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ name: "text", content: "text" });
