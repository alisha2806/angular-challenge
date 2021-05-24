import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { IUserData } from "src/app/interfaces/user-data.interface";
import { IUserIdentity } from "src/app/interfaces/user-indentity.interface";

import { UserDataService } from "src/app/services/user-data.service";

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<IUserData | null> {
    constructor(
        private userDataService: UserDataService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserData | null> {
        return this.userDataService.getCurrentUser().pipe(
            switchMap((user: IUserIdentity) => {
                return this.userDataService.getUserData(user.id);
            })
        );
    }
}