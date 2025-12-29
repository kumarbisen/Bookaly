import { Platform } from "react-native";

// export const BASE_URL=Platform.OS==="android"?'http://10.0.2.2:3000/api' :'http://localhost:3000/api'
// export const SOCKET_URL = Platform.OS==='android'? 'http://10.0.2.2:3000' : 'http://localhost:3000'


// YOUR NETWORK IP OR HOSTED URL

const LAN_IP = '192.168.86.177'
const PORT = '3000'

export const BASE_URL = Platform.OS === 'android'
	? `http://${LAN_IP}:${PORT}/api` 
	: Platform.OS === 'ios'
		? `http://localhost:${PORT}/api`
		: `http://${LAN_IP}:${PORT}/api` 

export const SOCKET_URL = Platform.OS === 'android'
	? `http://${LAN_IP}:${PORT}`
	: Platform.OS === 'ios'
		? `http://localhost:${PORT}`
		: `http://${LAN_IP}:${PORT}`


