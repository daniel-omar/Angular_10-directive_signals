import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.scss']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counter = signal(10);
  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  })

  public userChangeEffect = effect(() => {
    // console.log(this.user().first_name)
    console.log(this.counter())
  })

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current + 1)
    }, 1000)
  }

  onFieldUpdated(field: keyof User, value: string) {

    // this.user.update(current => ({
    //   ...current,
    //   [field]: value
    // }))

    this.user.update(current => {
      switch (field) {
        case "email": current.email = value; break;
        case "first_name": current.first_name = value; break;
        case "last_name": current.last_name = value; break;
      }

      return current;
    })

  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

}
