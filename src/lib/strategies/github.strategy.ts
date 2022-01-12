import { AuthService } from "@auth/auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
	constructor(private authService: AuthService) {
		super({
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: process.env.GITHUB_REDIRECT_URL,
			scope: ["user:email"],
		});
	}

	async validate(accessToken, refreshToken, profile: Profile, done) {
		const { user, error } = await this.authService.validateUser({
			email: profile.emails[0].value,
			avatar: profile.photos[0].value,
			provider: "github",
		});

		return error ? done(error, null) : done(null, user);
	}
}
