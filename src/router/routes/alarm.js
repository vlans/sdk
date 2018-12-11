export default [
    {
        path: '/alarm',
        name: '/alarm',
        component: () => import('@/components/alarm'),
        children: [
            {
                path: '/alarm/new',
                name: '/alarm/new',
                component: () => import('@/components/alarm/new'),
                meta: {
                    breadcrum: [
                        {
                            name: '告警',
                            url: ''
                        },
                        {
                            name: '新建',
                            url: ''
                        }
                    ]
                }
            },
            {
                path: '/alarm/rule',
                name: '/alarm/rule',
                component: () => import('@/components/alarm/rule'),
                meta: {
                    breadcrum: [
                        {
                            name: '告警',
                            url: ''
                        },
                        {
                            name: '规则',
                            url: ''
                        }
                    ]
                }
            }
        ]
    }
]
