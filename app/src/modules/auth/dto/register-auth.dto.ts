import { IsEmail, IsString } from 'class-validator';

export class RegisterAuthDto {
    @IsString()
    fullname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
