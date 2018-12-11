export default [
    {
        path: '/log',
        name: '/log',
        component: () => import('@/components/log'),
        children: [
            {
                path: '/log/info',
                name: '/log/info',
                component: () => import('@/components/log/info'),
                meta: {
                    breadcrum: [
                        {
                            name: '日志',
                            url: ''
                        },
                        {
                            name: '信息',
                            url: ''
                        }
                    ]
                }
            }
        ]
    }
]
