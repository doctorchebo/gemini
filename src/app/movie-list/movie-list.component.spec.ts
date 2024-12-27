import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../app.module';
import { MovieListComponent } from './movie-list.component';
import { MovieComponent } from './movie/movie.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let store: MockStore;
  const initialState = { loading: false, movies: [] };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [AppModule],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should show loading spinner when loading is true', waitForAsync(() => {
    component.loading = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.loading-spinner')).toBeTruthy();
    });
  }));
});
