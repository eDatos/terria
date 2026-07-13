import i18next from "i18next";
import merge from "lodash-es/merge";

async function loadEnvironmentLanguageOverride(lng) {
  try {
    const response = await fetch(
      `languages/${lng}/environmentLanguageOverrides.json`
    );
    if (!response.ok) return;
    const data = await response.json();
    i18next.addResourceBundle(
      lng,
      "languageOverrides",
      merge({}, i18next.getResourceBundle(lng, "languageOverrides"), data),
      false,
      true
    );
  } catch (e) {
    console.debug(e);
  }
}

export async function applyEnvironmentLanguageOverrides() {
  await loadEnvironmentLanguageOverride(i18next.resolvedLanguage);
  i18next.on("languageChanged", loadEnvironmentLanguageOverride);
}
