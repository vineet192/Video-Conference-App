import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SocketioService } from 'src/app/services/socketio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-call',
  templateUrl: './new-call.component.html',
  styleUrls: ['./new-call.component.scss'],
})
export class NewCallComponent implements OnInit {
  joinGroupForm: FormGroup;

  constructor(
    private socketioService: SocketioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.joinGroupForm = this.formBuilder.group({
      call_id: '',
    });
  }

  ngOnInit(): void {
    this.socketioService.setupSocketConnection();
  }

  //Host a room.
  host() {
    var roomId = this.generateRoomId()
    this.socketioService.joinRoom(roomId, true);
    sessionStorage.setItem('hostId', roomId);
    this.router.navigate([
      '/call-screen',
      { isHost: true, id: this.socketioService.getSocketId },
    ]);
  }

  //Join a room.
  joinGroup(id: any): void {
    console.log('joining room', id.call_id);
    this.socketioService.joinRoom(id.call_id, false);
    sessionStorage.setItem('hostId', id.call_id);
    this.router.navigate(['/call-screen', { isHost: false, id: id.call_id }]);
  }

  generateRoomId(): string {
    return Math.floor(Math.random() * 1000000).toString();
  }
}
