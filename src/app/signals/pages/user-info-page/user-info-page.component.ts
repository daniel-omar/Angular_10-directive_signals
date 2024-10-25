import { Component, computed, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  public userId = signal(1)
  public currentUser = signal<User | undefined>(undefined)
  public userWasFound = signal<boolean>(true)
  public userFullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  })

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser(id: number) {
    if (id <= 0) return;

    this.userId.set(id);

    this.usersService.getUserById(id)
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error: () => {
          this.currentUser.set(undefined);
          this.userWasFound.set(false);
        }
      })

  }

}
