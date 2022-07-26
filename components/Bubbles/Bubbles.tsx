import { useHotkeys } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { selectionStore } from "../../store/selectionStore";
import classes from "../../styles/Bubbles.module.css";
import { useSelect, defaultRender, Rect } from "./useSelect";

const renderSelection = defaultRender();

class Bubble {
  x: number;
  y: number;
  radius: number;
  direction: { x: number; y: number };
  neighbours!: Bubble[];
  selected = false;

  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.radius = 4;
    this.direction = {
      x: 0,
      y: 0,
    };
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

  setSelection(area: Rect) {
    const isColliding =
      this.x > area.x && this.x < area.x + area.width && this.y > area.y && this.y < area.y + area.height;

    if (isColliding) {
      this.selected = true;
    }
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

        if (this.distance(neighbour) < this.radius + neighbour.radius + 2) {
          this.direction.x *= -1;
          this.direction.y *= -1;
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

export function Bubbles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const _context = useRef<CanvasRenderingContext2D>();
  const [, setSelection] = useRecoilState(selectionStore);
  const animation = useRef(0);
  const bubbles = useRef<Bubble[]>([]);
  const { render: selectRender, ref: selectRef } = useSelect<HTMLDivElement>({
    renderer: _context,
    onRender: renderSelection,
    onCaptureInit: () => {
      if (ref.current) ref.current.style.zIndex = "999";
      bubbles.current.forEach((bubble) => (bubble.selected = false));
      setSelection([]);
    },
    onCaptureEnd(event) {
      if (ref.current) ref.current.style.zIndex = "0";
      bubbles.current.forEach((bubble) => bubble.setSelection(event.detail.area));
      setSelection(event.detail.captures.map((capture) => capture.id));
    },
  });

  const render = useCallback(() => {
    const context = _context.current;

    const animate = () => {
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        bubbles.current.forEach((bubble) => {
          bubble.render(context);
        });
        selectRender();
      }

      animation.current = requestAnimationFrame(animate);
    };

    animate();
  }, [selectRender]);

  const updateBubbles = useCallback(() => {
    bubbles.current.forEach((bubble, index) => {
      bubble.setDirection();
      if (index > 0) {
        bubble.setNeighbours(bubbles.current.slice(0, index));
      }
    });
  }, [])

  useEffect(() => {
    bubbles.current = new Array(80).fill(null).map(() => new Bubble());
    updateBubbles()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useHotkeys([
    [
      "delete",
      () => {
        bubbles.current = bubbles.current.filter((bubble) => bubble.selected === false);
        updateBubbles()
      },
    ],
    [
      "space",
      () => {
        const bubble = new Bubble();
        bubble.x = window.innerWidth / 2;
        bubble.y = window.innerHeight / 2;
        bubbles.current.push(bubble);
        updateBubbles()
      },
    ],
  ]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof window === "undefined") return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d")!;
    _context.current = context;
  }, []);

  useEffect(() => {
    render();

    return () => {
      cancelAnimationFrame(animation.current);
    };
  }, [render]);

  return (
    <div ref={selectRef}>
      <canvas ref={ref} className={classes.canvas} />
    </div>
  );
}
