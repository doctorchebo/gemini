import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../../app.module';
import { Movie } from '../movie.model';
import { MovieComponent } from './movie.component';
import { By } from '@angular/platform-browser';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let store: MockStore;
  const initialState = { loading: false, movies: [] };

  const movie: Movie = {
    name: 'Dunkirk',
    genre: 'War',
    year: 2017,
    director: 'Christopher Nolan',
    cast: ['Fionn Whitehead', 'Tom Hardy', 'Kenneth Branagh'],
    synopsis:
      'Experience the sheer nerve-wracking desperation of the Dunkirk evacuation! Witness the harrowing struggle of Allied soldiers trapped on the beaches of France as they face the relentless enemy forces. A stunning cinematic experience that captures the sheer scale of the evacuation in a truly breathtaking way.  Watch as hope and heroism intertwine in this powerfully moving and visually captivating film.',
    rating: 4.2,
    imageUrl: 'http://dummyImage.com',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [AppModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should show title of name and year', waitForAsync(() => {
    component.movie = movie;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.query(By.css('mat-card-title'))
      expect(compiled.nativeElement.textContent).toBe('Dunkirk - 2017');
    });
  }));
});
