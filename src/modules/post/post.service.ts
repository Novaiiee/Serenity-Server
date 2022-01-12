import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePostDTO, PaginatedPostsDTO, PostsQueryDTO } from "@post/dto";
import { Post, PostDocument } from "@post/post.entity";
import { UserDocument } from "@user/user.entity";
import { Model } from "mongoose";
import { v4 } from "uuid";

interface Paginate {
	limit: number;
	page: number;
}

interface Query {
	tags?: any;
	name?: any;
}

@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private model: Model<PostDocument>) {}

	async create(data: CreatePostDTO, user: UserDocument) {
		const post = new this.model({
			...data,
			postID: v4(),
			userID: user.userID,
			username: user.username,
			avatar: user.avatar,
			comments: [],
			tags: data.tags,
			createdAt: new Date().toISOString().slice(0, 10),
		});

		const created = await post.save();
		return created;
	}

	async my(user: UserDocument) {
		return user.posts;
	}

	async getPostsByUserID(id: string) {
		return this.model.find({ userID: id });
	}

	async getPostsPaginated(
		query?: Query,
		paginate: Paginate = { limit: 10, page: 1 },
		index: boolean = false
	) {
		const searchQuery = index ? { $text: { $search: query.name } } : { ...query };

		const posts = await this.model
			.find(searchQuery)
			.sort({ field: "asc", _id: -1 })
			.limit(paginate.limit * 1)
			.skip((paginate.page - 1) * paginate.limit)
			.exec();

		return posts;
	}

	async getRecentPosts(paginate: PostsQueryDTO): Promise<PaginatedPostsDTO> {
		const posts = await this.getPostsPaginated({}, paginate);
		const count = await this.model.countDocuments();

		return {
			totalPages: Math.ceil(count / paginate.limit),
			posts,
			currentPage: paginate.page,
		};
	}

	async getPostsByTag({ page = 1, limit = 10, tag }: PostsQueryDTO) {
		const posts = await this.getPostsPaginated({ tags: { $all: [tag] } }, { page, limit });
		const count = await this.model.countDocuments();

		return {
			totalPages: Math.ceil(count / limit),
			posts,
			currentPage: page,
		};
	}

	async getPostsByQuery({ page = 1, limit = 10, query }) {
		let posts = await this.getPostsPaginated({ name: query }, { page, limit }, true);

		if (posts.length === 0) {
			posts = await this.getPostsPaginated({ tags: query }, { page, limit });
		}

		const count = await this.model.countDocuments();

		return {
			totalPages: Math.ceil(count / limit),
			posts,
			currentPage: page,
		};
	}
}
