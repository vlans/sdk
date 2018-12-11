import SDK from './sdk'
import Log from './log'
import Dashboard from './dashboard'
import Alarm from './alarm'

export default [
    {
        path: '/',
        name: '/',
        redirect: '/sdk/new'
    },
    ...SDK,
    ...Log,
    ...Dashboard,
    ...Alarm
]
