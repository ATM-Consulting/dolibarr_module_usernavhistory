export const CURRENT_VERSION_MODULE = 1.2;
export const URL_SERVER = 'http://localhost/jpb/agefodd-rd-9.0/dolibarr/htdocs/';
export const  LOCAL_URL_SERVER = process.env.BASE_URL ;
export const THIRDPARTY_NAME = 'T-ATM'
;
//PROD  WILL USE  'URL_SERVER' INSTEAD OF 'LOCAL_URL_SERVER' IN YOUR FILES TEST
export const PROD = 0;

export const URL_TO_USE = PROD ? URL_SERVER : LOCAL_URL_SERVER;

// conf Value
export const CONF_VALUE_MAX = 2;


