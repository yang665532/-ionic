import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.page.html',
  styleUrls: ['./entrance.page.scss'],
})
export class EntrancePage implements OnInit {

  constructor(private router: Router, public menuCtrl: MenuController) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login(){
    this.router.navigateByUrl('login');
  }

  register(){
    this.router.navigateByUrl('register');
  }

}
