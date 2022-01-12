import { ApiProperty } from "@nestjs/swagger";

export class PostsQueryDTO {
	@ApiProperty({ required: false })
	page: number;

	@ApiProperty({ required: false })
	limit: number;

	@ApiProperty({ required: false })
	tag?: string;

	@ApiProperty({ required: false })
	query?: string;
}
