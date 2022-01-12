import { AuthService } from "@auth/auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-discord";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, "discord") {
	constructor(private authService: AuthService) {
		super({
			clientID: process.env.DISCORD_ID,
			clientSecret: process.env.DISCORD_SECRET,
			callbackURL: process.env.DISCORD_REDIRECT_URL,
			scope: ["email", "identify"],
		});
	}

	async validate(accessToken, refreshToken, profile: Profile, done) {
		const avatarLink = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`;
		const { error, user } = await this.authService.validateUser({
			email: profile.email,
			provider: "discord",
			avatar: avatarLink,
		});

		return error ? done(error, null) : done(null, user);
	}
}
