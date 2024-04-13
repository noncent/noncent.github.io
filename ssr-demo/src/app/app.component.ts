import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        console.log(response)
        this.posts = response;
      });

    // console.log(this.posts)
  }
}