import { Injectable } from '@angular/core';
import { UserCategory } from '../models/userCategory';

@Injectable({
  providedIn: 'root'
})

export class UserCategoryService {

  userCategories: UserCategory[] = [
    {
      name: "Admin",
      description: "Users with administrative privileges",
      count: 5
    },
    {
      name: "Moderator",
      description: "Users who can moderate content",
      count: 12
    },
    {
      name: "Member",
      description: "Regular users with standard access",
      count: 100
    },
    {
      name: "Guest",
      description: "Users with limited access",
      count: 25
    }
  ]

  getAllUserCategories(): UserCategory[] {
    return this.userCategories;
  }

  getUserCategoryByName(name: string): UserCategory | undefined {
    return this.userCategories.find((userCategory) => userCategory.name == name);
  }

  constructor() { }
}
