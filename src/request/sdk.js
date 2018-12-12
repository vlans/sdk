import axios from '@/common/config/axios.instance'

export default {
    sendSDKConfig (data) {
        return axios.post('http://123.57.74.109:9090/ump', data)
    }
}
