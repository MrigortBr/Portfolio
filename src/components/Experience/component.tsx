import { Dispatch, forwardRef, SetStateAction } from "react";
import { HistoryContainer } from "./style";

function ExperienceComponent(
  props: { setPageIndex: Dispatch<SetStateAction<number>> },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <HistoryContainer ref={ref} className='page'></HistoryContainer>;
}

export default forwardRef<
  HTMLDivElement,
  { setPageIndex: Dispatch<SetStateAction<number>> }
>(ExperienceComponent);
