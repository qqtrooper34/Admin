export const PAYMENT_SYSTEMS = {
    NO_PAYMENT: 0,
    IBOX: 1,
    SBER: 2,
  } as const;
  
  export const PAYMENT_SYSTEM_OPTIONS = [
    { value: PAYMENT_SYSTEMS.NO_PAYMENT, label: 'No Payment' },
    { value: PAYMENT_SYSTEMS.SBER, label: 'Sberbank' },
    // IBOX is disabled as it's not ready
    // { value: PAYMENT_SYSTEMS.IBOX, label: 'iBox' },
  ];
  
  export const MAP_PROVIDERS = {
    GOOGLE: 1,
    YANDEX: 2,
    DGIS: 3,
  } as const;
  
  export const MAP_PROVIDER_OPTIONS = [
    { value: MAP_PROVIDERS.GOOGLE, label: 'Google Maps' },
    { value: MAP_PROVIDERS.YANDEX, label: 'Yandex Maps' },
    { value: MAP_PROVIDERS.DGIS, label: '2GIS' },
  ];