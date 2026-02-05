import { VscError } from "react-icons/vsc";
import {
  FooterContainer,
  FooterCredits,
  FooterInfo,
  FooterInfoContainer,
} from "./style";

export default function FooterComponent() {
  return (
    <FooterContainer>
      <FooterInfoContainer>
        <FooterInfo>
          <VscError /> 0
        </FooterInfo>
      </FooterInfoContainer>
      <FooterCredits>
        Desenvolvido por <a>MrIgortbr</a>
      </FooterCredits>
    </FooterContainer>
  );
}
