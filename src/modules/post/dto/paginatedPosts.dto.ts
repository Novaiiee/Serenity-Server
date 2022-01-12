import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@post/post.entity";

export class PaginatedPostsDTO {
	@ApiProperty({ type: () => [Post] })
	posts: Post[];

	@ApiProperty()
	totalPages: number;

	@ApiProperty()
	currentPage: number;
}
