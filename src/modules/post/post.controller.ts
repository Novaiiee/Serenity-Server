import { SessionGuard } from "@guards/index";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePostDTO } from "@post/dto";
import { CurrentUser } from "../../lib/user.decorator";
import { PostService } from "./post.service";

@Controller("/posts")
@ApiTags("Posts")
export class PostController {
	constructor(private readonly service: PostService) {}

	@Post("/create")
	@UseGuards(SessionGuard)
	async createPost(@Body() data: CreatePostDTO, @CurrentUser() user) {
		const post = await this.service.create(data, user);
		return post;
	}

	@Get("/my")
	@UseGuards(SessionGuard)
	async myPosts(@CurrentUser() user) {
		return this.service.my(user);
	}

	@Get("/user/:id")
	async getUserPostsByID(@Param("id") id: string) {
		return this.service.getPostsByUserID(id);
	}

	@Get("/recent")
	async recentPosts(@Query("page") page: number, @Query("limit") limit: number) {
		return this.service.getRecentPosts({ page, limit });
	}

	@Get("/tag/:tag")
	async getPostsByTag(@Param("tag") tag: string, @Query("page") page: number, @Query("limit") limit: number) {
		return this.service.getPostsByTag({ page, limit, tag });
	}

	@Get("/search/:query")
	async getPostsByQuery(
		@Param("query") query: string,
		@Query("page") page: number,
		@Query("limit") limit: number
	) {
		return this.service.getPostsByQuery({ query, page, limit });
	}
}
