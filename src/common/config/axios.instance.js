import axios from 'axios'
import { success, error } from './axios.interceptors'

const instance = axios.create(
    {
        headers: {
            Accept: 'application/vnd.botpy.v1+json'
        }
    }
)

instance.interceptors.response.use(success, error)

export default instance
