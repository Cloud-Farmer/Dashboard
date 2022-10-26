type LanguageType = 'en' | 'ko';
type LanguageHookType = [LanguageType, (lang?: LanguageType) => void];

export type { LanguageType, LanguageHookType };
