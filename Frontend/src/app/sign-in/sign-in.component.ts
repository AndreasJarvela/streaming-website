import { Component, OnInit, Input,NgZone, ViewChild,ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { UIRouterModule } from "@uirouter/angular";
import { User } from '../_models/user';
import { CurrentUserService } from '../_services/current-user.service';
declare const gapi: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

/**
 * The component displayed when a user wants to log in or sign up.
 */
export class SignInComponent implements OnInit {

  private displaySignIn = false;

  @Input() 
  set showLogIn(showLogIn: boolean) {
    this.displaySignIn = showLogIn;
  }

  @Input() close: boolean;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public username = "";
  public email = "";
  public password = "";
  public passwordAgain = "";

  constructor(private zone: NgZone, private authentication : AuthenticationService, private currentUser : CurrentUserService) { }


  public activePage = "active";

  signUpTab(){
    this.displaySignIn = false;
  }

  signInTab(){
    this.displaySignIn = true;
  }

  public closeThisComponent(){
    this.closeEvent.emit(true);
  }

  passwordMatches(){
    return this.password == this.passwordAgain
  }


  login(loginFunction){
    loginFunction.subscribe(response => {
      this.currentUser.loadUser(response.token);
      this.closeThisComponent();
    },
    error => {
      console.log(error);
      console.log("not retreive user");
    }
  );
  }

  googleLogin(username, email, googleID){
      var loginFunction = this.authentication.loginGoogleAccount(username,email, googleID)
      this.login(loginFunction);
  }

  customLogIn(username,password){
      var loginFunction = this.authentication.loginCustomUser(this.username,this.password);
      this.login(loginFunction);
  }


  customRegister(username, email,password){
    var registerFunction = this.authentication.registerCustomUser(username,email,password).subscribe(data => {
      this.customLogIn(username,password);
    },
    error => {
      console.log("Could not register user");
      console.log(error);
    });
  }

  googleRegister(username,email,googleID){
    var registerFunction = this.authentication.registerGoogleUser(username,email,googleID).subscribe(data => {
      this.googleLogin(username, email, googleID);
    },
    error => {
      console.log("Could not register user");
      console.log(error);
    });
    
  }


  /*
   * Google Sign-In API 
   */
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '160715832214-50hk5tjj9355otgtqjb4lsjsfhgem2r5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }


  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();        
        var email = profile.getEmail();
        var parsedUsername =  email.substring(0,email.indexOf("@"));
        var profileID = profile.getId();

        /*
         * Make changes in angular zone, making it update faster. 
         */
        this.zone.run(() => {
          this.googleRegister(parsedUsername,email,profileID);
          this.closeThisComponent();
        })
        
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }


  ngOnInit() {
    this.googleInit();
  }

}
