import { AuthService } from "@auth/auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(private authService: AuthService) {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CLIENT_REDIRECT_URL,
			scope: ["email", "profile"],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile, done) {
		const { error, user } = await this.authService.validateUser({
			email: profile.emails[0].value,
			avatar: profile.photos[0].value,
			provider: "google",
		});

		return error ? done(error, null) : done(null, user);
	}
}
