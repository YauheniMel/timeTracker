import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DatabaseService } from './database.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [DatabaseService, AuthService],
})
export class CoreModule {}
