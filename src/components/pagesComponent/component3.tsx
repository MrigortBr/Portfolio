import { forwardRef } from "react";

function PagesComponent3(
  props: { tag: "string" },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      style={{
        background: "blue",
        width: "100%",
        height: "100%",
        scrollSnapAlign: "start",
      }}
    >
      <h1>PAGE 1</h1>
    </div>
  );
}

export default forwardRef<HTMLDivElement, {}>(PagesComponent3);
