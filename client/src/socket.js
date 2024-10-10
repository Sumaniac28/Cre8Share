// socket.js
import { io } from "socket.io-client";
const apiURL = process.env.REACT_APP_API_URL;

const socket = io(apiURL);

export default socket;
