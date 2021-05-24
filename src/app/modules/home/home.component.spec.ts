import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { InitialsPipe } from './initials.pipe';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const route = ( { snapshot: { data: { userData: {
    firstName: 'Rodney',
    lastName: 'trotter',
    address: {
      line1: 'Nelson Mandela House',
      line2: '',
      line3: '',
      city: 'Peckham',
      county: 'London',
      postcode: 'SE15'
    }
  } } } } as any) as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        InitialsPipe
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: route }
      ]     
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the address in header', () => {
    expect(fixture.nativeElement.querySelector('div.header div.user-address').textContent).toEqual('Nelson Mandela House, Peckham, London, SE15');
  })
});
