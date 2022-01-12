import { ApiProperty } from "@nestjs/swagger";

export class EditUserDTO {
	@ApiProperty({ nullable: true })
	username: string;

	@ApiProperty({ nullable: true })
	bio: string;

	@ApiProperty({ nullable: true })
	avatar: string;

	@ApiProperty({ nullable: true })
	pronouns: string;
}
