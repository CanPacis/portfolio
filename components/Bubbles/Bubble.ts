import { Rect } from "./useSelect";

export class Bubble {
  x!: number;
  y!: number;
  radius: number;
  direction: { x: number; y: number };
  neighbours!: Bubble[];
  selected = false;
  avoidTargets: DOMRect[] = [];

  constructor() {
    this.radius = 5;
    this.direction = {
      x: 0,
      y: 0,
    };
  }

  choosePosition() {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    const check = () => {
      let collides = false;
      this.x = x;
      this.y = y;

      for (const rect of this.avoidTargets) {
        if (this.collides(rect)) {
          collides = true;
          break;
        }
      }
      return collides;
    };

    while (check()) {
      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight;
    }

    this.x = x;
    this.y = y;
  }

  setDirection() {
    this.direction = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    };
  }

  setNeighbours(neighbours: Bubble[]) {
    this.neighbours = neighbours;
  }

  distance(other: Bubble) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }

  collides(area: Rect) {
    return (
      this.x + this.radius > area.x &&
      this.x + this.radius < area.x + area.width &&
      this.y + this.radius > area.y &&
      this.y + this.radius < area.y + area.height
    );
  }

  setSelection(area: Rect) {
    const isColliding = this.collides(area);

    if (isColliding) {
      this.selected = true;
    }
  }

  drawShape(context: CanvasRenderingContext2D, ring = false) {
    const size = ring ? this.radius + 2 : this.radius;
    const x = this.x;
    const y = this.y;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let side = 0; side < 7; side++) {
      context.lineTo(x + size * Math.cos((side * 2 * Math.PI) / 6), y + size * Math.sin((side * 2 * Math.PI) / 6));
    }

    ring ? context.stroke() : context.fill();
  }

  render(context: CanvasRenderingContext2D) {
    if (this.x < 0 || this.x > window.innerWidth) {
      this.direction.x *= -1;
    }
    if (this.y < 0 || this.y > window.innerHeight) {
      this.direction.y *= -1;
    }

    this.x += this.direction.x;
    this.y += this.direction.y;

    context.fillStyle = "rgba(255,255,255,.1)";
    context.strokeStyle = "rgba(255,255,255,.08)";

    if (this.neighbours) {
      for (const neighbour of this.neighbours) {
        if (this.distance(neighbour) < 80) {
          context.beginPath();
          context.moveTo(this.x, this.y);
          context.lineTo(neighbour.x, neighbour.y);
          context.stroke();
        }
      }
    }

    context.save();

    if (this.selected) {
      context.fillStyle = "rgba(51,154,240,.3)";
      context.strokeStyle = "rgba(51,154,240,.3)";
      this.drawShape(context, true);
    }

    this.drawShape(context);
    context.restore();
  }
}
