// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'student-registration';
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studentApp';
   name = "";
  students: string[] = [];
  totalSeats = 30;

  count = 0;

  dark = false;

  join() {

    if (this.name != "") {

      this.students.push(this.name);

      this.name = "";
    }

  }

  increase() {
    this.count++;
  }

  changeTheme() {
    this.dark = !this.dark;
  }
  
  getSeats(){

    return "🟩".repeat(this.students.length) +
           "⬜".repeat(this.totalSeats - this.students.length);

  }

}
