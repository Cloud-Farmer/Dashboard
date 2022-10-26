type LanguageType = 'en' | 'ko';
type LanguageHookType = [LanguageType, (lang?: LanguageType) => void];

type SensorType = 'temperature' | 'humidity' | 'illuminance' | 'soilhumidity';
type ControlSensorType = 'fan' | 'window' | 'pump' | 'led';

export type { LanguageType, LanguageHookType, SensorType, ControlSensorType };
