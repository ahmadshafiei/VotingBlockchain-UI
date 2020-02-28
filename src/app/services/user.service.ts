import { Injectable } from '@angular/core';
import { HttpService } from './common/http-service.service';
import { User } from '../model/user/user.model';
import { PagedResult } from '../model/common/pagedResult.model';
import { UserSearch } from '../model/user/user-search.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  getUsers(userSearch: UserSearch) {
    return this.httpService.get<PagedResult<User>>('Profile/GetUsers', userSearch);
  }
}
