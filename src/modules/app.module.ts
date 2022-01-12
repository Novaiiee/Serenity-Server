import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "./auth/auth.module";
import { FriendModule } from "./friend/friend.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}),
		PassportModule.register({ session: true }),
		PostModule,
		UserModule,
		AuthModule,
		FriendModule,
	],
})
export class AppModule {}
