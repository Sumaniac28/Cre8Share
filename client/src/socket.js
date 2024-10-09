// socket.js
import { io } from "socket.io-client";

const apiUrl = process.env.REACT_APP_API_URL;

const socket = io(apiUrl);

export default socket;
