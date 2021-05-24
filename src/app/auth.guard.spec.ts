import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockUser={
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  };
  const nextMock :any= {snapshot:{}};
  const stateMock :any={snapshot:{},url:'profile/1'};
  const routerMock ={navigate:jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers:[{provide:Router, useValue:routerMock}]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow the user',()=>{
    localStorage.setItem("activeUser", JSON.stringify(mockUser));
    expect(guard.canActivate(nextMock,stateMock)).toBeTrue();
  });

  it('should disallow the user when id in url is not matched',()=>{
    mockUser.id=2;
    localStorage.setItem("activeUser", JSON.stringify(mockUser));
    expect(guard.canActivate(nextMock,stateMock)).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/'],{queryParams:{returnUrl:1}});
  });

  it('should disallow the user when there is no activeuser',()=>{
    // localStorage.setItem("activeUser", JSON.stringify(mockUser));
    localStorage.removeItem("activeUser");
    expect(guard.canActivate(nextMock,stateMock)).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

});
