import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsDefined,
} from 'class-validator';

export class SignUpDto {
  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, {
    message: 'Password length must not exceed 20 characters.',
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, {
    message:
      'The password must contain numbers, lowercase and uppercase letters.',
  })
  password: string;

  @IsDefined({ message: 'Username is required' })
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username length must not exceed 20 characters' })
  username: string;
}
