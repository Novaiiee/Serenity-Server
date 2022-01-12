import { DiscordAuthGuard, GithubAuthGuard, GoogleAuthGuard } from "@guards/index";
import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";

@Controller("/auth")
@ApiTags("Authentication")
export class AuthController {
	@Get("/google")
	@UseGuards(GoogleAuthGuard)
	loginWithGoogle() {}

	@Get("/google/redirect")
	@UseGuards(GoogleAuthGuard)
	googleLoginRedirect(@Req() req: Request, @Res() res: Response) {
		this.redirect(req, res);
	}

	@Get("/github")
	@UseGuards(GithubAuthGuard)
	loginWithGithub() {}

	@Get("/github/redirect")
	@UseGuards(GithubAuthGuard)
	githubLoginRedirect(@Req() req: Request, @Res() res: Response) {
		this.redirect(req, res);
	}

	@Get("/discord")
	@UseGuards(DiscordAuthGuard)
	loginWithDiscord() {}

	@Get("/discord/redirect")
	@UseGuards(DiscordAuthGuard)
	discordLoginRedirect(@Req() req: Request, @Res() res: Response) {
		this.redirect(req, res);
	}

	redirect(req: Request, res: Response) {
		const sessionCookie = req.cookies["uid"];

		res.cookie("uid", sessionCookie, {
			domain: process.env.CLIENT_DOMAIN,
			path: "/",
		});
		res.redirect(process.env.CLIENT_REDIRECT_URL);
	}
}
