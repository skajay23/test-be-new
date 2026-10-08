import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResetPasswordDto {
	@ApiProperty({ example: 'root@milon.com' })
	@IsEmail({}, { message: 'Please enter a valid email' })
	@IsNotEmpty({ message: 'Email cannot be empty' })
	email: string;

	@ApiProperty({ example: 'NewPass@123' })
	@IsNotEmpty({ message: 'Password cannot be empty' })
	@IsString()
	@Length(8, 256, { message: 'Password must have at least 8 characters' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'Password must contain at least one uppercase, one lowercase and one number'
	})
	newPassword: string;
}
