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
    this.radius = 4;
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
      x: (Math.random() - 0.5) / 2,
      y: (Math.random() - 0.5) / 2,
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

  render(context: CanvasRenderingContext2D) {
    for (const rect of this.avoidTargets) {
      if (this.x + this.radius <= rect.x || this.x + this.radius >= rect.x + rect.width) {
        this.direction.x *= -1;
      }
      if (this.y + this.radius <= rect.y || this.y + this.radius >= rect.y + rect.height) {
        this.direction.y *= -1;
      }
    }

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

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();

    if (this.selected) {
      context.save();
      context.fillStyle = "rgba(51,154,240,.3)";
      context.strokeStyle = "rgba(51,154,240,.3)";
      context.beginPath();
      context.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
      context.stroke();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    } else {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
    }
  }
}
