import { Platform } from "react-native";

export const BASE_URL=Platform.OS==="android"?'http://10.0.2.2:3000/v1' :'http://localhost:3000/v1'
export const SOCKET_URL = Platform.OS==='android'? 'http://10.0.2.2:3000' : 'http://localhost:3000'


// YOUR NETWORK IP OR HOSTED URL

// export const BASE_URL = 'http://192.168.23.177:3000/api';
// export const SOCKET_URL = 'http://192.168.23.177:3000';
