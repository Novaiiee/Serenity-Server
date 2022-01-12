import { Module } from "@nestjs/common";
import { UserModule } from "@user/user.module";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";

@Module({
	imports: [UserModule],
	providers: [FriendService],
	controllers: [FriendController],
})
export class FriendModule {}
