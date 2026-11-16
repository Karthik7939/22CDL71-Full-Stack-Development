# Experiment 8: Movie Review System in Angular

> **Objective:** Create a Movie Review System using Angular. Users can add new movie reviews, rate movies (1–5), and view existing reviews. Demonstrates **Routing**, **Two-way Data Binding**, **Angular Services (Dependency Injection)**, **Form Validation**, and **Component Communication (`@Input()`)**.

---

## 🚀 Setup & Execution Commands

### 1. Create the Angular Project with Routing
```bash
ng new movie-app --routing=true --style=css
```

### 2. Navigate into the Project
```bash
cd movie-app
```

### 3. Generate Service and Components
```bash
# 1. Generate the Movie Service to manage review data
ng generate service movie

# 2. Generate the Home Component (form & review list page)
ng generate component home

# 3. Generate the MovieCard Component (reusable child component)
ng generate component movie-card
```
*(Shorthand: `ng g s movie`, `ng g c home`, `ng g c movie-card`)*

### 4. Run the Development Server
```bash
ng serve
```
Open your browser and navigate to: `http://localhost:4200/`

---

## 📝 Files Edited in this Project

| File Path | Role & Description |
| :--- | :--- |
| `src/app/app.module.ts` | Imports `BrowserModule`, `FormsModule`, `AppRoutingModule` and declares components. |
| `src/app/app-routing.module.ts` | Configures the default route (`path: ''`) to render `HomeComponent`. |
| `src/app/app.component.html` | Contains `<router-outlet></router-outlet>` where routed views render. |
| `src/app/movie.service.ts` | Singleton Angular service storing and retrieving movie review objects. |
| `src/app/home/home.component.ts` | Parent component managing user input form, injecting `MovieService`. |
| `src/app/home/home.component.html` | Review submission form and list rendering using `<app-movie-card>`. |
| `src/app/home/home.component.css` | Styling for form container, review section, and inputs. |
| `src/app/movie-card/movie-card.component.ts` | Child component receiving `[movie]` data from parent using `@Input()`. |
| `src/app/movie-card/movie-card.component.html` | Card display layout for individual movie name, star rating, and review text. |
| `src/app/movie-card/movie-card.component.css` | Card styling with rounded borders and background tint. |

---

## 💻 Codes to Study for Exam

### 1. `src/app/app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

### 2. `src/app/app-routing.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

### 3. `src/app/app.component.html`
```html
<router-outlet></router-outlet>
```

---

### 4. `src/app/movie.service.ts`
> **Concept:** Services marked with `@Injectable({ providedIn: 'root' })` act as singletons across the app for sharing data and business logic between components.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies: any[] = [];

  addMovie(movie: any) {
    this.movies.push(movie);
  }

  getMovies() {
    return this.movies;
  }
}
```

---

### 5. `src/app/home/home.component.ts`
```typescript
import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  name = '';
  rating = 0;
  review = '';

  // Injecting MovieService via constructor
  constructor(private service: MovieService) {}

  addReview() {
    // Form validation check
    if (this.name && this.rating >= 1 && this.rating <= 5 && this.review) {
      this.service.addMovie({
        name: this.name,
        rating: this.rating,
        review: this.review
      });

      // Clear form inputs
      this.name = '';
      this.rating = 0;
      this.review = '';
    }
  }

  get movies() {
    return this.service.getMovies();
  }
}
```

---

### 6. `src/app/home/home.component.html`
```html
<div class="container">

  <h1>🎬 Movie Review System</h1>

  <div class="form-box">
    <h2>Add Movie Review</h2>

    <input
      type="text"
      placeholder="Movie Name"
      [(ngModel)]="name"
      required>

    <input
      type="number"
      placeholder="Rating (1-5)"
      [(ngModel)]="rating"
      min="1"
      max="5">

    <textarea
      placeholder="Write your review"
      [(ngModel)]="review">
    </textarea>

    <button (click)="addReview()">
      Add Review
    </button>
  </div>

  <h2 class="review-title">Movie Reviews</h2>

  <div class="reviews">
    <!-- Component Communication: Passing data to child component via [movie] -->
    <app-movie-card
      *ngFor="let movie of movies"
      [movie]="movie">
    </app-movie-card>
  </div>

</div>
```

---

### 7. `src/app/home/home.component.css`
```css
.container {
  width: 700px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

.form-box {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
}

textarea {
  height: 80px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.review-title {
  margin-top: 30px;
}
```

---

### 8. `src/app/movie-card/movie-card.component.ts`
> **Concept:** `@Input() movie: any;` receives data passed down from the parent `<app-movie-card [movie]="movie">`.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() movie: any;

}
```

---

### 9. `src/app/movie-card/movie-card.component.html`
```html
<div class="card">

  <h3>🎬 {{ movie.name }}</h3>

  <p class="rating">
    ⭐ {{ movie.rating }} / 5
  </p>

  <p>{{ movie.review }}</p>

</div>
```

---

### 10. `src/app/movie-card/movie-card.component.css`
```css
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
  background: #f9f9f9;
}

.card h3 {
  margin-top: 0;
}

.rating {
  font-weight: bold;
}
```

---

## 🎯 Quick Exam / Viva Review Points

1. **How is Component Communication achieved here?**
   - **Parent to Child:** Through the `@Input()` decorator. `HomeComponent` loops through `movies` and binds each item `[movie]="movie"` into `MovieCardComponent`.
2. **What is an Angular Service and why use it?**
   - An Angular Service (`MovieService`) is a class decorated with `@Injectable()` that encapsulates business logic and state management. Components inject it via their constructor (`constructor(private service: MovieService)`).
3. **What is `<router-outlet>`?**
   - It acts as a placeholder directive that Angular dynamically fills based on the current router state and configuration defined in `AppRoutingModule`.
4. **How is form validation handled?**
   - The method `addReview()` validates that `name`, `review`, and a valid `rating >= 1 && rating <= 5` exist before calling `this.service.addMovie()`.
