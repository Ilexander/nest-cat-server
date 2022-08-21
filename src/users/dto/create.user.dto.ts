/* eslint-disable prettier/prettier */
export class CreateUserDto {
  readonly user_name: string;
  readonly user_surname: string;
  readonly user_login: string;
  readonly user_email: string;
  readonly user_password: string;
  readonly user_avatar: string;
  readonly user_phone: string;
  readonly isAdmin: boolean;
}
