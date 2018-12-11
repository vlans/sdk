const qs = require('qs')

export default {
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
    paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false })
    }
}
