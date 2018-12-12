import axios from '@/common/config/axios.instance'

export default {
    sendSDKConfig (data) {
        return axios.post('http://localhost:9090/ump', data)
    }
}
