import { forwardRef } from "react";

export function PagesComponent2(
  props: {},
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      style={{
        background: "purple",
        width: "100%",
        height: "100%",
        scrollSnapAlign: "start",
      }}
    >
      <h1>PAGE 2</h1>
    </div>
  );
}

export default forwardRef<HTMLDivElement, {}>(PagesComponent2);
