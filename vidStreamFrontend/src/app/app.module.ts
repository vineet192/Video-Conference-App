import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SocketioService } from './services/socketio.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Components
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { CallScreenComponent } from './components/call-screen/call-screen.component';
import { NewCallComponent } from './components/new-call/new-call.component';
import { VideoTileComponent } from './components/video-tile/video-tile.component';

@NgModule({
  declarations: [AppComponent, CallScreenComponent, NewCallComponent, VideoTileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
