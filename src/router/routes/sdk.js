export default [
    {
        path: '/sdk',
        name: '/sdk',
        component: () => import('@/components/sdk'),
        children: [
            {
                path: '/sdk/new',
                name: '/sdk/new',
                component: () => import('@/components/sdk/new'),
                meta: {
                    breadcrum: [
                        {
                            name: 'SDK 管理',
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
                path: '/sdk/template',
                name: '/sdk/template',
                component: () => import('@/components/sdk/template'),
                meta: {
                    breadcrum: [
                        {
                            name: 'SDK 管理',
                            url: ''
                        },
                        {
                            name: '模板',
                            url: ''
                        }
                    ]
                }
            }
        ]
    }
]
