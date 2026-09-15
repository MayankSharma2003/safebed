import { BASE_API_URL } from "./api";
import axios from "axios";

axios.defaults.baseURL = BASE_API_URL;

export {axios};