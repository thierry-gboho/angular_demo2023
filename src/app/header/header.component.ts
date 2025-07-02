import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()
  featureSelected = new EventEmitter<string>();

  private userSubscription!: Subscription;
  authenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        /*
        if  the user is null he is not authenticated:
        we use the contracted form
            this.authenticated = !!user;
          which is equivalent to
            this.authenticated = !user ? false : true;
        */
       this.authenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
