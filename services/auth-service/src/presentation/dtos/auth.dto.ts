import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class SignupDto extends LoginDto {
  @ApiProperty({ example: 'tenant-uuid' })
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ example: 'CUSTOMER', enum: ['CUSTOMER', 'BUSINESS_ADMIN'] })
  role?: string;
}
