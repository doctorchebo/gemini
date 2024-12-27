import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../app.module';
import { By } from '@angular/platform-browser';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let store: MockStore;
  const initialState = {loading: false, movies: []}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [AppModule],
      providers: [provideMockStore({initialState})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable search button when loading is true', ()=> {
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  })

});
