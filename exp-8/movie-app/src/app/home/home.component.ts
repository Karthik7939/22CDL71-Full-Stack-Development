// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {

// }
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

  constructor(private service: MovieService) {}

  addReview() {

    if (
      this.name.trim() &&
      this.rating >= 1 &&
      this.rating <= 5 &&
      this.review.trim()
    ) {

      this.service.addMovie({
        name: this.name,
        rating: this.rating,
        review: this.review
      });

      this.name = '';
      this.rating = 0;
      this.review = '';

      alert('Review added successfully!');
    }
    else {
      alert('Please enter valid movie details!');
    }
  }

  get movies() {
    return this.service.getMovies();
  }
}