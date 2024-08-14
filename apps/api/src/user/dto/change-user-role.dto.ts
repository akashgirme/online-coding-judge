import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role';
import { IsEnum } from 'class-validator';

export class ChangeUserRoleDto {
  @ApiProperty({ type: 'enum', enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;
}
