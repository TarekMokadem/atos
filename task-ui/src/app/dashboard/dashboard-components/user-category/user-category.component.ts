import { Component, OnInit, inject, Inject } from '@angular/core';
import { UserCategory } from 'src/app/models/userCategory';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrl: './user-category.component.scss'
})
export class UserCategoryComponent implements OnInit{

  userCategoryList: UserCategory[]=[];

  userCategoryService: UserCategoryService = inject(UserCategoryService);

  displayedColumns: string[] = ['name', 'description', 'count'];

  constructor () {
    this.userCategoryList = this.userCategoryService.getAllUserCategories();
  }

  ngOnInit(): void {
  }
}
