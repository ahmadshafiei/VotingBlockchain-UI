import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserSearch } from 'src/app/model/user/user-search.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  searchFilter = new UserSearch();
  users: User[] = [];
  displayedColumns = ['index', 'name', 'publicKey'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.searchFilter).subscribe(u => {
      this.users = u.items;
      this.searchFilter.totalCount = u.totalCount;
    });
  }

  search() {
    this.searchFilter.pageNumber = 1;
    this.getUsers();
  }

}
