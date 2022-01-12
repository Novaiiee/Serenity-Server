import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "@post/post.module";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.entity";
import { UserService } from "./user.service";

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PostModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
