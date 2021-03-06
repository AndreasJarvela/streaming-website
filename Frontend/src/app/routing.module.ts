import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { 
  AuthGuardService as AuthGuard 
} from './authguard.service';
import { HelpComponent } from './help/help.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChannelGuardService } from './channel-guard.service';
import { GameCollectionComponent } from './game-collection/game-collection.component';

/**
 * Handles routing between components, uses guards to validate routing.
 */
export const ROUTES: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  { path: 'browse', component: BrowseComponent },
  { path: 'help', component: HelpComponent },
  { 
    path: 'channel/:username',
    component: UserComponent,
    canActivate: [ChannelGuardService]
  },
  { 
    path: 'game/:name',
    component: GameCollectionComponent,
  },
  { 
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
