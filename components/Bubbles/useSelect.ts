import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface Vector2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RenderOptions {
  backgroundColor?: string;
  borderColor?: string;
}

export interface UseSelectOptions {
  renderer?: MutableRefObject<CanvasRenderingContext2D | undefined>;
  onRender?: (context: CanvasRenderingContext2D, rect: Rect) => void;
  onCaptureStart?: (event: MouseEvent) => void;
  onCaptureInit?: (event: MouseEvent) => void;
  onCaptureEnd?: (event: CustomEvent<CaptureEvent>) => void;
  onCapture?: (event: CustomEvent<CaptureEvent>) => void;
  minCaptureArea?: number;
}

export interface CaptureTarget {
  id: string;
  detail: any;
}

export interface CaptureResult {
  id: string;
  rect: DOMRect;
  detail: any;
  element: Element;
}

export type CaptureTargetContext = [(target: CaptureTarget) => void, (target: CaptureTarget) => void];

export type CaptureEvent = {
  area: Rect;
  captures: {
    id: string;
    rect: DOMRect;
    detail: any;
    element: Element;
  }[];
  originalEvent: MouseEvent;
};

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const id = () => `select-${Math.random().toString(36).slice(2, 11)}`;

function isColliding(rectA: Rect, rectB: Rect): boolean {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.height + rectA.y > rectB.y
  );
}

function isNonDragTarget(event: MouseEvent) {
  const eventPath = event.composedPath().filter((element) => element instanceof HTMLElement) as HTMLElement[];
  const isNonDrag = eventPath
    .map((element: HTMLElement) => !!element.getAttribute("data-non-drag-target"))
    .includes(true);

  return isNonDrag;
}

function getRect(source: Vector2D, target: Vector2D, buffer: Rect = { width: 0, height: 0, x: 0, y: 0 }): Rect {
  let x = source.x < target.x ? source.x : target.x;
  let y = source.y < target.y ? source.y : target.y;

  return {
    x: x + buffer.x,
    y: y + buffer.y,
    width: Math.abs(target.x - source.x),
    height: Math.abs(target.y - source.y),
  };
}

function getOffset(start: Vector2D, end: MouseEvent, buffer: Vector2D = { x: 0, y: 0 }): Vector2D {
  return {
    x: end.x - start.x + buffer.x,
    y: end.y - start.y + buffer.y,
  };
}

function getCaptureTargets(
  parent: HTMLElement,
  captureTargets: CaptureTarget[]
): { id: string; rect: DOMRect; detail: any; element: Element }[] {
  const targets = Array.from(document.querySelectorAll("[data-capture-target]"));
  const boundingRect = parent.getBoundingClientRect();

  return targets.map((target) => {
    const targetRect = target.getBoundingClientRect().toJSON();
    const attribute = target.getAttribute("data-capture-target");

    return {
      id: attribute!,
      detail: captureTargets.find((t) => t.id === attribute)?.detail || null,
      element: target,
      rect: { ...targetRect, x: targetRect.x - boundingRect.left, y: targetRect.y - boundingRect.top },
    };
  });
}

function getScroll(element: HTMLElement): Vector2D {
  let currentElement = element;
  let result = { x: 0, y: 0 };

  while (currentElement.parentElement && currentElement instanceof HTMLElement) {
    result.y += currentElement.scrollTop || 0;
    result.x += currentElement.scrollLeft || 0;
    currentElement = currentElement.parentElement;
  }

  return result;
}

function useCaptureTargetStore() {
  const [captureTargets, setCaptureTargets] = useState<CaptureTarget[]>([]);

  const addCaptureTarget = useCallback((target: CaptureTarget) => {
    setCaptureTargets((targets) => [...targets, target]);
  }, []);

  const removeCaptureTarget = useCallback((target: CaptureTarget) => {
    setCaptureTargets((targets) => targets.filter((t) => t.id !== target.id));
  }, []);

  return { captureTargets, addCaptureTarget, removeCaptureTarget };
}

function useResizeObserver<T extends HTMLElement = any>() {
  const frameID = useRef(0);
  const ref = useRef<T>(null);

  const [rect, setRect] = useState<ObserverRect>(defaultState);

  const observer = useMemo(
    () =>
      typeof window !== "undefined"
        ? new ResizeObserver((entries: any) => {
            const entry = entries[0];

            if (entry) {
              cancelAnimationFrame(frameID.current);

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  setRect(entry.contentRect);
                }
              });
            }
          })
        : null,
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer!.observe(ref.current);
    }

    return () => {
      observer!.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [observer]);

  return [ref, rect] as const;
}

function useElementSize<T extends HTMLElement = any>() {
  const [ref, { width, height }] = useResizeObserver<T>();
  return { ref, width, height };
}

function useRender({
  parent,
  options,
  captureTargetsStore,
}: {
  parent: HTMLElement | null;
  options?: UseSelectOptions;
  size: Size2D;
  captureTargetsStore: CaptureTarget[];
}): () => void {
  const isCaptureStarted = useRef(false);
  const isDragging = useRef(false);
  const start = useRef<Vector2D>({ x: 0, y: 0 });
  const end = useRef<Vector2D>({ x: 0, y: 0 });
  const clientRect = useMemo(() => parent?.getBoundingClientRect(), [parent]);
  const captures: MutableRefObject<CaptureResult[]> = useRef([]);
  const context = options?.renderer?.current || null;

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (isNonDragTarget(event) || !clientRect) return;
      event.preventDefault();

      isDragging.current = true;
      const offset = getOffset(clientRect, event, getScroll(parent!));
      start.current = offset;
      end.current = offset;

      if (options?.onCaptureInit) {
        options.onCaptureInit!(event);
      }
    },
    [clientRect, options, parent]
  );

  const onMouseUp = useCallback(
    (event: MouseEvent) => {
      isDragging.current = false;
      const rect = getRect(start.current, end.current);
      end.current = { x: 0, y: 0 };
      start.current = { x: 0, y: 0 };
      isCaptureStarted.current = false;
      captures.current = [];
      const isMinimumSupplied = rect.width * rect.height > (options?.minCaptureArea || 0);

      if (!isMinimumSupplied) return;

      const captureTargets = getCaptureTargets(parent!, captureTargetsStore);
      const currentCaptures: CaptureResult[] = [];

      for (const target of captureTargets) {
        if (isColliding(rect, target.rect)) {
          currentCaptures.push(target);
          if (!options?.onCapture) {
            target.element.dispatchEvent(
              new CustomEvent("capture", { detail: { area: rect, capture: target, originalEvent: event } })
            );
          }
        }
      }

      const eventToDispatch = new CustomEvent<CaptureEvent>("capture-end", {
        detail: { area: rect, captures: currentCaptures, originalEvent: event },
      });

      if (options?.onCaptureEnd) {
        options.onCaptureEnd(eventToDispatch);
      }

      if (options?.onCapture) {
        options?.onCapture(
          new CustomEvent<CaptureEvent>("capture", {
            detail: { area: rect, captures: [], originalEvent: event },
          })
        );
      }

      parent?.dispatchEvent(eventToDispatch);
    },
    [captureTargetsStore, options, parent]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging.current && clientRect) {
        if (!isCaptureStarted.current) {
          isCaptureStarted.current = true;

          if (options?.onCaptureStart) {
            options.onCaptureStart(event);
          }
        }

        if (options?.onCapture) {
          const rect = getRect(start.current, end.current);
          const captureTargets = getCaptureTargets(parent!, captureTargetsStore);
          const dispatchEvents = (target: CaptureResult) => {
            const eventToDispatch = new CustomEvent("capture", {
              detail: { area: rect, captures: captures.current, originalEvent: event },
            });

            target.element.dispatchEvent(
              new CustomEvent("capture", {
                detail: { area: rect, capture: target, originalEvent: event },
              })
            );
            parent?.dispatchEvent(eventToDispatch);
            options?.onCapture!(eventToDispatch);
          };

          for (const target of captureTargets) {
            if (isColliding(rect, target.rect)) {
              if (!captures.current.find((capture) => capture.id === target.id)) {
                captures.current.push(target);
                dispatchEvents(target);
              }
            } else {
              if (captures.current.find((capture) => capture.id === target.id)) {
                captures.current = captures.current.filter((capture) => capture.id !== target.id);
                dispatchEvents(target);
              }
            }
          }
        }

        end.current = getOffset(clientRect, event, getScroll(parent!));
      }
    },
    [options, parent, captureTargetsStore, clientRect]
  );

  useEffect(() => {
    if (parent) {
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (parent) {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
    };
  });

  return () => {
    if (context && options?.onRender) {
      options.onRender(context, getRect(start.current, end.current));
    }
  };
}

export function useSelect<T extends HTMLElement>(
  options?: UseSelectOptions
): { ref: React.RefObject<T>; context: CaptureTargetContext; render: () => void } {
  const { captureTargets, addCaptureTarget, removeCaptureTarget } = useCaptureTargetStore();
  const { ref, width, height } = useElementSize<T>();

  const render = useRender({
    parent: ref.current,
    size: { width, height },
    captureTargetsStore: captureTargets,
    options,
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-drag-source", "true");
    }
  }, [ref]);

  return { ref, context: [addCaptureTarget, removeCaptureTarget], render };
}

export function useCaptureTarget<T extends HTMLElement>(context: CaptureTargetContext, detail: any) {
  const ref = useRef<T>(null);
  const captureId = useRef(id());

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-capture-target", captureId.current);
      context[0]({
        id: captureId.current,
        detail,
      });
    }
  }, [ref, context, detail]);

  return ref;
}

export function defaultRender(options?: RenderOptions): (context: CanvasRenderingContext2D, rect: Rect) => void {
  return (context: CanvasRenderingContext2D, rect: Rect) => {
    context.fillStyle = options?.backgroundColor || "rgba(20, 190, 255, 0.5)";
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
    context.strokeStyle = options?.borderColor || "rgba(20, 190, 255, 0.5)";
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  };
}
