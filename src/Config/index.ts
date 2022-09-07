const Config = {
  services: {
    SWAPI: { baseURL: import.meta.env.VITE_SWAPI_BASE_URL },
    VIACEP: { baseURL: import.meta.env.VITE_VIACEP_BASE_URL ?? '' },
  },
  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.PACKAGE_VERSION,
  },
  i18n: {
    debbug: JSON.parse(
      (import.meta.env.VITE_I18N_DEBBUG ?? 'false').toLocaleLowerCase(),
      // Converts 'true' to true and 'false' to false
    ),
  },
};

export default Config;
