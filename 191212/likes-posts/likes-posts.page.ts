import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-likes-posts',
  templateUrl: './likes-posts.page.html',
  styleUrls: ['./likes-posts.page.scss'],
})
export class LikesPostsPage implements OnInit {
  postsRef;
  posts;
  userCommentRef;
  userComment;
  postLikes;
  isLiked;
  icon_name = 'heart-empty';
  cnt:number = 0;

  constructor(private dataService: DataService,
              private firestore: AngularFirestore,
              public router: Router) {
    this.postsRef = this.firestore.collection('forum').snapshotChanges();
    this.postsRef.subscribe(data => {
      this.posts = data.map(e => {
        return {
          article: e.payload.doc.data()['article'],
          img: e.payload.doc.data()['img'],
          avatar: e.payload.doc.data()['avatar'],
          postName: e.payload.doc.data()['name']
        };
      })
    })        

    //get comments
    this.userCommentRef = this.firestore.collection('forum').doc('2019_li_don').collection('comments');

    this.userCommentRef.snapshotChanges().subscribe(data => {
      this.userComment = data.map(e =>{
        return {
          id: e.payload.doc.id
        };
      });
    });

    //get post likes
    this.dataService.getPostLikes().subscribe(data => {
      this.postLikes =  data.map(e => {
        return {
          idLiked: e.payload.doc.id
        };
      });
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    const currentUserUid = firebase.auth().currentUser.uid;
    for(let like of this.postLikes){
      let likedID = like.idLiked
      if(likedID == currentUserUid){
        this.isLiked = true;
        break;
      }else {
        this.isLiked = false;
      }
    }    
  }

  toPost(){
    this.router.navigateByUrl('forum')
  }
}
