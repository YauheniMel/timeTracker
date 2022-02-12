import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DatabaseService } from './database.service';
import { StoreService } from './store/store.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [DatabaseService, AuthService, StoreService],
})
export class CoreModule {}
