import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JSONPlaceholderService } from '../services/jsonplaceholder.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;

  id: number;
  user:any;

  constructor(
    private JSONPlaceholder: JSONPlaceholderService, 
    private route: ActivatedRoute,
    private router: Router
    ) { 
    // this.data = new Array<any>();
  
  }

  ngOnInit(): void {
      this.initId();
  }

  initId() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id
      this.name = params.name;
      this.getDataFromAPI(this.id);
    }); 
  }

  getDataFromAPI(x){ 
    this.JSONPlaceholder.getData().subscribe((data:any[]) => {
      const user = data.filter(u=>u.id==x);
      if(user.length===1){
        this.user = user[0];
      }
    });
  }


  logout(){
    localStorage.removeItem("activeUser");
    this.router.navigate(['/']);
  }


}
