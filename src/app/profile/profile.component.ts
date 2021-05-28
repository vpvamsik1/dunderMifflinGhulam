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
  userPosts: any[];
  userPostAndComment: any[] = [];

  constructor(
    private JSONPlaceholder: JSONPlaceholderService, 
    private route: ActivatedRoute,
    private router: Router
    ) { 
  
  }

  ngOnInit(): void {
      this.initId();
  }

  initId() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id
      this.name = params.name;
      this.getUser(this.id);
      this.getPosts();
    }); 
  }

  getUser(userId){ 
    this.JSONPlaceholder.getData().subscribe((data:any[]) => {
      const user = data.filter(u=>u.id==userId);
      if(user.length===1){
        this.user = user[0];
      }
    });
  }

  getPosts(){
    this.JSONPlaceholder.getPosts().subscribe((posts:any[])=>{
      this.userPosts = posts.filter((post)=>post.userId == this.id);
      this.getCommentOnPost();
    })
  }

  getCommentOnPost(){
    this.JSONPlaceholder.getComments().subscribe((comments:any[])=>{
      this.userPosts.map((post:any,i:number)=>{
        const postAndComment = {
          post:post,
          comments:[],
        }
        postAndComment.comments = comments.filter((comment)=>comment.postId == post.id);
        this.userPostAndComment.push(postAndComment);
      });
      console.log("post and comments",this.userPostAndComment);
    })
  }


  logout(){
    localStorage.removeItem("activeUser");
    this.router.navigate(['/']);
  }


}
