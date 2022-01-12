import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	content: string;

	@ApiProperty({ type: () => [String] })
	tags: string[];
}
