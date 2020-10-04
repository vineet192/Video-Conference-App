import { Component, ElementRef, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-call-screen',
  templateUrl: './call-screen.component.html',
  styleUrls: ['./call-screen.component.scss'],
})
export class CallScreenComponent implements OnInit {
  sources: MediaStream[] = [];
  hostId: string;

  constructor(private socketIoService: SocketioService) {}

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

  initP2p() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.socketIoService.addStream(stream);
          this.sources.push(stream);
        })
        .catch(function (err) {
          console.log('Something went wrong!', err);
        });
    }
  }
}
