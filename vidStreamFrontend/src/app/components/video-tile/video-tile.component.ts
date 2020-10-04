import { ElementRef, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tile',
  templateUrl: './video-tile.component.html',
  styleUrls: ['./video-tile.component.scss'],
})
export class VideoTileComponent implements OnInit {
  @Input() sourceObj: MediaStream;
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.querySelector(
      'video'
    ).srcObject = this.sourceObj;
  }
}
