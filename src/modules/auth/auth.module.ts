import { Module } from "@nestjs/common";
import { DiscordStrategy, GithubStrategy, GoogleStrategy } from "@strategies/index";
import { SessionSerializer } from "../../lib/passport.serializer";
import { UserModule } from "./../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [AuthService, GoogleStrategy, GithubStrategy, SessionSerializer, DiscordStrategy],
	exports: [],
})
export class AuthModule {}
