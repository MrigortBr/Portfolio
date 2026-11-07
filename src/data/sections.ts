/**
 * Posição de cada seção na página (mesma ordem de `Pages` em data/page).
 * Usado pelos botões que levam a outra seção, sem importar `Pages`
 * (o que criaria dependência circular entre os componentes).
 */
export const SECTION = {
  hello: 0,
  about: 1,
  experience: 2,
  projects: 3,
  skills: 4,
  certificates: 5,
  thanks: 6,
} as const;
