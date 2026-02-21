import { NotFoundContainer } from "./style-not";
import Space from "@/assets/undraw_to-the-moon_w1wa.svg";
import "./globals.css";
import "./nf.css";

export default function NotFound() {
  return (
    <NotFoundContainer className='page'>
      <Space></Space>
      <h1>404</h1>
      <h2>Pagina não existe</h2>
    </NotFoundContainer>
  );
}
