import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({ example: 'root@ajay.com' })
	@IsNotEmpty({ message: 'Email খালি রাখা যাবে না' })
	@IsEmail({}, { message: 'সঠিক ইমেইল দিন' })
	email: string;

	@ApiProperty({ example: 'ChangeMe@123' })
	@IsNotEmpty({ message: 'পাসওয়ার্ড খালি রাখা যাবে না' })
	@Length(8, 256, { message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে' })
	password: string;
}
