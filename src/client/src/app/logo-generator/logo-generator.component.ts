import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-generator',
  templateUrl: './logo-generator.component.html',
  styleUrls: ['./logo-generator.component.scss'],
})
export class LogoGeneratorComponent implements OnInit {
  private canvas: CanvasRenderingContext2D | null = null;

  @ViewChild('canvas', { static: true }) canvasElement!: ElementRef;

  public textToGenerate: string = '';

  ngOnInit(): void {
    const htmlCanvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const canvas = htmlCanvas.getContext('2d');
    this.canvas = canvas;
    if (canvas) {
      this.draw(canvas);
    }
  }

  public draw(canvas: CanvasRenderingContext2D): void {
    canvas.beginPath();
    canvas.arc(100, 100, 50, 0, Math.PI + (Math.PI * 1) / 2, true);
    canvas.stroke();

    //drav viertel kreis
    canvas.beginPath();
    canvas.moveTo(50, 50);
  }

  public generate(): void {
    if (this.canvas) {
      this.canvas.ellipse(100, 100, 50, 50, 0, 0, 360);
      this.canvas.fillRect(100, 100, 50, 50);
      this.canvas.beginPath();
      this.canvas.moveTo(0, 0);
      this.canvas.lineTo(500, 500);
      this.canvas.fill();
    }
  }
}
