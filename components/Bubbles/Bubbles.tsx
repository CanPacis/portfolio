import { useHotkeys } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { selectionStore } from "../../store/selectionStore";
import classes from "../../styles/Bubbles.module.css";
import { Bubble } from "./Bubble";
import { useSelect, defaultRender } from "./useSelect";

const renderSelection = defaultRender();
const DENSITY_CONSTANT = 14000;

export function Bubbles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const _context = useRef<CanvasRenderingContext2D>();
  const [, setSelection] = useRecoilState(selectionStore);
  const animation = useRef(0);
  const bubbles = useRef<Bubble[]>([]);
  const {
    render: selectRender,
    ref: selectRef,
    size,
  } = useSelect<HTMLDivElement>({
    renderer: _context,
    onRender: renderSelection,
    onCaptureInit: () => {
      bubbles.current.forEach((bubble) => (bubble.selected = false));
      setSelection([]);
    },
    onCaptureStart: () => {
      if (selectRef.current) selectRef.current.style.zIndex = "999";
    },
    onCaptureCancel() {
      if (selectRef.current) selectRef.current.style.zIndex = "0";
    },
    onCaptureEnd(event) {
      if (selectRef.current) selectRef.current.style.zIndex = "0";
      bubbles.current.forEach((bubble) => bubble.setSelection(event.detail.area));
      setSelection(event.detail.captures.map((capture) => capture.id));
    },
    minCaptureArea: 0,
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.width = size.width;
      ref.current.height = size.height;
    }
  }, [size]);

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

  const updateBubbles = useCallback((totalUpdate = true) => {
    bubbles.current.forEach((bubble, index) => {
      if (totalUpdate) bubble.setDirection();
      bubble.avoidTargets = Array.from(document.querySelectorAll("[data-non-drag-target=true]")).map((target) =>
        target.getBoundingClientRect()
      );
      if (totalUpdate) bubble.choosePosition();
      if (index > 0) {
        bubble.setNeighbours(bubbles.current.slice(0, index));
      }
    });
  }, []);

  useEffect(() => {
    const amount = Math.floor((window.innerWidth * window.innerHeight) / DENSITY_CONSTANT);
    bubbles.current = new Array(amount).fill(null).map(() => new Bubble());
    updateBubbles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useHotkeys([
    [
      "delete",
      () => {
        bubbles.current = bubbles.current.filter((bubble) => bubble.selected === false);
        updateBubbles(false);
      },
    ],
    [
      "space",
      () => {
        const bubble = new Bubble();
        console.log(bubble)
        bubble.x = window.innerWidth / 2;
        bubble.y = window.innerHeight / 2;
        bubbles.current.push(bubble);
        updateBubbles(false);
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
    <div className={classes.bubblesWrapper} ref={selectRef}>
      <canvas ref={ref} className={classes.canvas} />
    </div>
  );
}
