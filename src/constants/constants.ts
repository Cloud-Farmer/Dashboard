import React from 'react';

//const API_URL = 'http://localhost:8080/api';
//const API_URL = 'http://203.241.228.50:18081/api';
const API_URL = import.meta.env.VITE_APP_API_URL;
const WEATHER_URL = import.meta.env.VITE_WEATHER_API_URL;
//const API_URL = 'http://192.168.0.10:8080/api';

export { API_URL, WEATHER_URL };
