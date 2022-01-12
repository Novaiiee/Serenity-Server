import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { AppModule } from "./modules/app.module";

const expireTime = 1000 * 60 * 60 * 24 * 7;

const sessionStore = MongoStore.create({
	collectionName: "uids",
	mongoUrl: process.env.DB,
	mongoOptions: {
		useUnifiedTopology: true,
	},
	ttl: expireTime,
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.enableCors({ origin: true, credentials: true });

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			name: "uid",
			cookie: {
				maxAge: expireTime,
			},
			store: sessionStore,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	const config = new DocumentBuilder()
		.setTitle("Serenity")
		.setDescription("The Serenity API description")
		.setVersion("1.0")
		.addTag("Authentication")
		.addTag("User")
		.addTag("Friends")
		.addTag("Posts")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
