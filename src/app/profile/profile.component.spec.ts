import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { JSONPlaceholderService } from '../services/jsonplaceholder.service';
import { mockComments, mockPosts, mockUsers } from '../mockData';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let JSONPlaceholder: JSONPlaceholderService;

  const mockActivatedRoute = {
    params: of({ id: 1 })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        JSONPlaceholderService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
    JSONPlaceholder = TestBed.inject(JSONPlaceholderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the profile page on route profile/:id', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.id).toEqual(1);
  });

  it('should fetch the user as per id present in url profile/:id', () => {
    spyOn(JSONPlaceholder, 'getData').and.returnValue(of(mockUsers));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user.id).toEqual(mockUsers[0].id);
    expect(component.user.email).toEqual(mockUsers[0].email);
  });

  it('should fetch the post of the loggedin user', ()=>{
    spyOn(JSONPlaceholder, 'getData').and.returnValue(of(mockUsers));
    spyOn(JSONPlaceholder, 'getPosts').and.returnValue(of(mockPosts));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userPosts.length).toEqual(10);
  });

  it('should generate the post and comment structure',()=>{
    spyOn(JSONPlaceholder, 'getData').and.returnValue(of(mockUsers));
    spyOn(JSONPlaceholder, 'getPosts').and.returnValue(of(mockPosts));
    spyOn(JSONPlaceholder, 'getComments').and.returnValue(of(mockComments));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userPostAndComment[0].comments.length).toEqual(5);
  })

});
