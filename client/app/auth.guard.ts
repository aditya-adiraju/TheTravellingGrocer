import {Injectable} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {map, Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    public auth: AuthService,
    public router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean|UrlTree>| Promise<boolean|UrlTree>{
    return this.auth.isAuthenticated$.pipe(
      map(isLoggedIn => {
        if(!isLoggedIn){
          this.fireLoginFailed();
          return false;
        }
        else {
          console.log("YOURE IN")
          return true;
        }
      })
    )
  }

  fireLoginFailed(){
    this.auth.loginWithRedirect();
  }
}
