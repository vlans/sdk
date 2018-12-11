export default [
    {
        path: '/dashboard',
        name: '/dashboard',
        component: () => import('@/components/dashboard'),
        children: [
            {
                path: '/dashboard/new',
                name: '/dashboard/new',
                component: () => import('@/components/dashboard/new'),
                meta: {
                    breadcrum: [
                        {
                            name: 'Dashboard',
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
                path: '/dashboard/template',
                name: '/dashboard/template',
                component: () => import('@/components/dashboard/template'),
                meta: {
                    breadcrum: [
                        {
                            name: 'Dashboard',
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
