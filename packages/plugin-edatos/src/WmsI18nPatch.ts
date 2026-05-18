import URI from "urijs";
import WebMapServiceCatalogItem from "terriajs/lib/Models/Catalog/Ows/WebMapServiceCatalogItem";

/**
 * Returns the active UI language, reading from the same sources that TerriaJS
 * uses for language detection (in priority order):
 *  1. Cookie "chosenLocale"  (set by the eDatos navbar on language switch)
 *  2. localStorage "i18nextLng"  (written by i18next after detection)
 *  3. Browser language  (navigator.language stripped to base code)
 *
 * We deliberately do NOT import i18next because terriajs bundles its own
 * nested copy (node_modules/terriajs/node_modules/i18next) that is distinct
 * from the root node_modules copy — reading the instance from the root would
 * always return undefined.
 */
function getActiveLanguage(): string {
  const cookieMatch = document.cookie.match(/(?:^|;\s*)chosenLocale=([^;]+)/);
  if (cookieMatch?.[1]) return cookieMatch[1];

  const stored = localStorage.getItem("i18nextLng");
  if (stored) return stored;

  return navigator.language.split("-")[0] || "en";
}

/**
 * Monkey-patches WebMapServiceCatalogItem to include the active language in:
 *  - GetCapabilities requests via AcceptLanguages parameter (GeoServer i18n)
 *  - GetLegendGraphic requests via LANGUAGE parameter (GeoServer 2.20+)
 *
 * Safe to call multiple times (idempotent via _wmsI18nPatched flag).
 */
export function applyWmsI18nPatches(): void {
  const proto = WebMapServiceCatalogItem.prototype as any;

  if (proto._wmsI18nPatched) return;
  proto._wmsI18nPatched = true;

  // --- Patch 1: AcceptLanguages in GetCapabilities URL ---
  const capDesc = Object.getOwnPropertyDescriptor(proto, "defaultGetCapabilitiesUrl");
  if (capDesc?.get) {
    Object.defineProperty(proto, "defaultGetCapabilitiesUrl", {
      get(this: unknown) {
        const url: string | undefined = capDesc.get!.call(this);
        if (!url) return url;
        const lang = getActiveLanguage();
        if (!lang) return url;
        return new URI(url).addSearch("AcceptLanguages", lang).toString();
      },
      configurable: true,
      enumerable: capDesc.enumerable ?? false
    });
  }

  // --- Patch 2: LANGUAGE in programmatic GetLegendGraphic (via getLegendBaseUrl) ---
  const originalGetLegendBaseUrl = proto.getLegendBaseUrl as (this: unknown) => string;
  proto.getLegendBaseUrl = function(this: unknown): string {
    const url = originalGetLegendBaseUrl.call(this);
    if (!url) return url;
    const lang = getActiveLanguage();
    if (!lang) return url;
    return new URI(url).addSearch("LANGUAGE", lang).toString();
  };

  // --- Patch 3: LANGUAGE in getLegendUrlForStyle ---
  const originalGetLegendUrlForStyle = proto.getLegendUrlForStyle as (
    this: unknown,
    ...args: unknown[]
  ) => string;
  proto.getLegendUrlForStyle = function(
    this: unknown,
    ...args: unknown[]
  ): string {
    const url = originalGetLegendUrlForStyle.apply(this, args);
    if (!url) return url;
    const lang = getActiveLanguage();
    if (!lang) return url;
    return new URI(url).addSearch("LANGUAGE", lang).toString();
  };
}
