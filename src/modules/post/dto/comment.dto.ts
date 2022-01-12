import { ApiProperty } from "@nestjs/swagger";

export class Comment {
	@ApiProperty()
	userID: string;

	@ApiProperty()
	username: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	avatar: string;

	@ApiProperty({ type: () => [Comment] })
	comments: Comment[];
}
