/** Chave do localStorage com a escolha "Sempre abrir" */
export const ALWAYS_OPEN_KEY = "portfolio:external-links:always-open";

const EVENT = "portfolio:open-external";

/** O link leva para fora do portfólio? (outro domínio, e-mail, telefone…) */
export function isExternal(href: string) {
  try {
    const url = new URL(href, window.location.href);
    if (url.protocol === "mailto:" || url.protocol === "tel:") return true;
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function alwaysOpen() {
  try {
    return localStorage.getItem(ALWAYS_OPEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAlwaysOpen() {
  try {
    localStorage.setItem(ALWAYS_OPEN_KEY, "1");
  } catch {
    // navegador sem armazenamento: vale só para esta visita
  }
}

/** Abre de fato o link (nova aba para sites, mesma aba para mailto/tel) */
export function openNow(href: string) {
  const sameTab = /^(mailto|tel):/i.test(href);
  window.open(href, sameTab ? "_self" : "_blank", "noopener,noreferrer");
}

/**
 * Abre um link pelo código (ex.: botões que usavam window.open).
 * Links externos passam pela confirmação do ExternalLinkGuard.
 */
export function openExternal(href: string) {
  if (!isExternal(href) || alwaysOpen()) {
    openNow(href);
    return;
  }
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: href }));
}

export const OPEN_EXTERNAL_EVENT = EVENT;
