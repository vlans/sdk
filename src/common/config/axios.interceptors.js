// axios 响应拦截器

const success = (res) => {
    if (res.data._redirected) {
        window.location.href = res.data._location
    }
    return res.data
}

const error = (err) => {
    const data = err.response.data

    if (err.response) {
        // const status = err.response.status
    }

    const reject = {
        status: err.response.status,
        error: data.error,
        message: data.message,
        errors: data.errors
    }

    return Promise.reject(reject)
}

export {
    success,
    error
}
