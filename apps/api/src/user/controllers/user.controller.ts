import { Body, Controller, Get, UseGuards, Put, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllUsersDto, ChangeUserRoleDto, EditProfileDto, OnboardUserDto } from '../dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../services';
import { User } from '../entities';
import { CurrentUser } from '../../auth/decorators';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';
import { PaginationDto } from '../../common/dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('/whoami')
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard())
  whoAmI(@CurrentUser() user: User) {
    return { user };
  }

  @Put('/onboard')
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard())
  onboard(@CurrentUser() user: User, @Body() body: OnboardUserDto) {
    return this.usersService.onboard(user, body);
  }

  @Put('/profile/edit')
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard())
  editProfile(@CurrentUser() user: User, @Body() body: EditProfileDto) {
    return this.usersService.editProfile(user, body);
  }

  // Internal User Controllers

  @Get('/admin/users')
  @ApiOkResponse({ type: AllUsersDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: User })
  getAllUsers(@Query() query: PaginationDto): Promise<AllUsersDto> {
    return this.usersService.getAllUsers(query);
  }

  @Put('/admin/:userId/change-role')
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard())
  @CheckAbilities({ action: Action.Manage, subject: User })
  changeUserRole(@Param('userId') userId: string, @Body() body: ChangeUserRoleDto) {
    return this.usersService.changeUserRole(userId, body);
  }
}
