import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    // console.log("from guard",activeUser);
    if(activeUser) {
      const id_in_url = Number( state.url.split("/").pop());
      if(id_in_url === Number(activeUser.id)){
        return true;
      }else{
        this.router.navigate(['/'],{queryParams:{returnUrl:id_in_url}});
        return false;
      }
    } else {
      if(state.url.indexOf('profile')!=-1){
        const id_in_url = Number( state.url.split("/").pop());
        this.router.navigate(['/'],{queryParams:{returnUrl:id_in_url}});
        return false; 
      }else{
        this.router.navigate(['/']);
        return false;
      }
    }
  }
  
}
