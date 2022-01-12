import { ApiProperty } from "@nestjs/swagger";
import { Socials } from "@user/user.entity";

export class UserProfileDTO {
	@ApiProperty({ nullable: true })
	bio: string;

	@ApiProperty()
	pronouns: string;

	@ApiProperty({ type: () => [String] })
	followedTags: string[];

	@ApiProperty()
	username: string;

	@ApiProperty({ type: () => Socials })
	socials: Socials;
}

export class UserProviderDTO {
	@ApiProperty()
	email: string;

	@ApiProperty()
	provider: string;

	@ApiProperty()
	avatar: string;
}
