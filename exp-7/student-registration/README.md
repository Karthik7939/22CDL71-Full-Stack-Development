# Experiment 7: Student Registration Form in Angular

> **Objective:** Design a Student Registration Form in Angular with data binding, directives, and form validation (template-driven).

---

## 🚀 Setup & Execution Commands

### 1. Create the Angular Project
Run this command from your terminal:
```bash
ng new student-registration --routing=false --style=css
```
*(Or choose standard defaults if prompted).*

### 2. Navigate into the Project
```bash
cd student-registration
```

### 3. Install Dependencies (if cloned or needed)
```bash
npm install
```

### 4. Run the Development Server
```bash
ng serve
```
Open your browser and navigate to: `http://localhost:4200/`

---

## 📝 Files Edited in this Project

To build the student registration application, the following files were edited:

| File Path | Description |
| :--- | :--- |
| `src/app/app.module.ts` | Imported `FormsModule` from `@angular/forms` to enable `[(ngModel)]` two-way data binding. |
| `src/app/app.component.ts` | Component logic: holds student list, capacity, dark mode toggle, and registration methods. |
| `src/app/app.component.html` | Template layout: registration input form, student list, seat visualization, and dark mode toggle. |
| `src/app/app.component.css` | Styles: clean UI container, form controls, responsive card design, and dark theme classes. |

---

## 💻 Codes to Study for Exam

### 1. `src/app/app.module.ts`
> **Important:** Must import `FormsModule` and add it to the `@NgModule` `imports` array; otherwise, `[(ngModel)]` will throw a template error.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- 1. Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // <-- 2. Add to imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

### 2. `src/app/app.component.ts`
> **Key Logic:**
> - `name`: String bound to input box via two-way binding.
> - `students`: Array of registered student names.
> - `totalSeats`: Capacity limit (30).
> - `join()`: Validates that `name` is not blank, pushes to `students` array, and resets `name`.
> - `changeTheme()`: Toggles boolean `dark`.
> - `getSeats()`: Generates visual emojis (`🟩` for filled seats, `⬜` for available seats).

```typescript
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
  
  getSeats() {
    return "🟩".repeat(this.students.length) +
           "⬜".repeat(this.totalSeats - this.students.length);
  }
}
```

---

### 3. `src/app/app.component.html`
> **Key Angular Template Concepts Demonstrated:**
> - Class Binding: `[class.dark]="dark"`
> - Event Binding: `(click)="changeTheme()"` and `(click)="join()"`
> - Two-way Data Binding: `[(ngModel)]="name"`
> - Structural Directives: `*ngIf="students.length > 0"` and `*ngFor="let s of students"`
> - String Interpolation: `{{ ... }}`

```html
<div class="container" [class.dark]="dark">

  <div class="top">
    <button (click)="changeTheme()">
      {{dark ? '☀ Light Mode' : '🌙 Dark Mode'}}
    </button>
  </div>

  <h1>Register Now!!</h1>

  <input type="text" placeholder="Enter Student Name" [(ngModel)]="name" required>

  <button (click)="join()">Join</button>

  <hr>

  <h1 *ngIf="students.length>0">
    Welcome {{students[students.length-1]}}
  </h1>
  <hr>

  <h2>Registered Students</h2>

  <ul>
    <li *ngFor="let s of students">
      {{s}}
    </li>
  </ul>
  <hr>

  <h2>Registration Progress</h2>

  <p>{{students.length}} / {{totalSeats}} Students Registered</p>

  <p>Available Seats : {{totalSeats-students.length}}</p>

  <h2>Registration Progress</h2>

  <h3>{{ getSeats() }}</h3>

  <p>{{students.length}} / {{totalSeats}} Seats Filled</p>

</div>
```

---

### 4. `src/app/app.component.css`
```css
body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    min-height: 100vh;
    background: #eef5ff;
    padding: 30px;
}

.top {
    text-align: right;
}

h1 {
    text-align: center;
    color: #003366;
}

input, button {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    box-sizing: border-box;
}

button {
    background: #1976d2;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background: #125ca1;
}

ul {
    background: white;
    padding: 15px 30px;
    border-radius: 5px;
}

h2 {
    color: #003366;
}

.dark {
    background: #1e1e1e;
    color: white;
}

.dark h1,
.dark h2 {
    color: #ffeb3b;
}

.dark ul {
    background: #333;
}

.dark input {
    background: #444;
    color: white;
    border: 1px solid gray;
}

.dark button {
    background: #ff9800;
}
```

---

## 🎯 Quick Exam / Viva Review Points

1. **What is `[(ngModel)]`?**
   - It is the syntax for **two-way data binding** in Angular (often called "banana in a box"). Changes in the input box immediately update the TypeScript variable `name`, and vice versa.
2. **Why is `FormsModule` required?**
   - Angular template-driven form directives (like `ngModel`) live inside `@angular/forms`. If not imported in `app.module.ts`, Angular will not recognize `[(ngModel)]`.
3. **What is the difference between `*ngIf` and `*ngFor`?**
   - `*ngIf`: Structural directive that adds or removes an element from the DOM based on a truthy/falsy condition.
   - `*ngFor`: Structural directive that repeats a DOM template for each element in an iterable collection (e.g. `students`).
4. **How does Theme Switching work?**
   - Using property/class binding `[class.dark]="dark"`. When `dark` is `true`, the CSS class `.dark` is applied to `.container`.
