import { FileContainer, FileTitle, FileWrapper } from "./style";
import { FaReact } from "react-icons/fa";

export default function FileBarComponent() {
  return (
    <FileContainer>
      <FileWrapper>
        <FaReact color='#00DBFF'></FaReact>
        <FileTitle>Test.tsx</FileTitle>
      </FileWrapper>
    </FileContainer>
  );
}
