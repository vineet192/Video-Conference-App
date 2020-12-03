import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-call-screen',
  templateUrl: './call-screen.component.html',
  styleUrls: ['./call-screen.component.scss'],
})
export class CallScreenComponent implements OnInit {
  sources: MediaStream[] = [];
  hostId: string;
  isStreaming: boolean = false;

  constructor(
    private socketIoService: SocketioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.hostId = sessionStorage.getItem('hostId');
    this.socketIoService.getPeersList.subscribe((peersList: any[]) => {
      peersList.forEach((peer) => {
        peer.on('stream', (stream: MediaStream) => {
          console.log('Got stream from', peer);
          if (!this.sources.includes(stream)) {
            this.sources.push(stream);
          }
        });
      });
    });
  }

  endStream() {
    
  }

  initP2p() {
    if (this.isStreaming) {
      this.snackBar.open('You are already streaming !', 'Ok', {
        duration: 2000,
      });
    } else {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            this.isStreaming = true;
            this.socketIoService.addStream(stream);
            this.sources.push(stream);
          })
          .catch(function (err) {
            console.log('Something went wrong!', err);
          });
      }
    }
  }
}
