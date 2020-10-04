import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallScreenComponent } from './components/call-screen/call-screen.component';
import { NewCallComponent } from './components/new-call/new-call.component';

const routes: Routes = [
  { path: '', component: NewCallComponent },
  { path: 'call-screen', component: CallScreenComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
