
const menu = [
    {
        "id": 1,
        "pid": 0,
        "name": "权限管理sss",
        "icon": "sss",
        "gui_type": 1,
        "gui_behavior": "/permission",
        "children": [
            {
                "id": 2,
                "pid": 1,
                "name": "管理组aaa",
                "icon": "aaaa",
                "gui_type": 2,
                "gui_behavior": "admingroup",
                "children": [
                    {
                        "id": 3,
                        "pid": 2,
                        "name": "添加管理组",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": "admingroup/create"
                    },
                    {
                        "id": 4,
                        "pid": 2,
                        "name": "管理组详情aaa",
                        "icon": "sdfsd",
                        "gui_type": 3,
                        "gui_behavior": "admingroup/edit/:id(\\d+)"
                    },
                    {
                        "id": 5,
                        "pid": 2,
                        "name": "更新管理组",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": ""
                    },
                    {
                        "id": 6,
                        "pid": 2,
                        "name": "删除管理组",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": ""
                    }
                ]
            },
            {
                "id": 8,
                "pid": 1,
                "name": "管理员",
                "icon": "",
                "gui_type": 2,
                "gui_behavior": "admin",
                "children": [
                    {
                        "id": 9,
                        "pid": 8,
                        "name": "添加管理员",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": "admin/create"
                    },
                    {
                        "id": 10,
                        "pid": 8,
                        "name": "管理员详情",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": "admin/edit/:id(\\d+)"
                    },
                    {
                        "id": 11,
                        "pid": 8,
                        "name": "更新管理员",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": ""
                    },
                    {
                        "id": 12,
                        "pid": 8,
                        "name": "删除管理员",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": ""
                    },
                    {
                        "id": 13,
                        "pid": 8,
                        "name": "启用禁用",
                        "icon": "",
                        "gui_type": 3,
                        "gui_behavior": ""
                    }
                ]
            },
            {
                "id": 14,
                "pid": 1,
                "name": "系统日志",
                "icon": "",
                "gui_type": 2,
                "gui_behavior": "syslog"
            }
        ]
    }
];

function filterArrObj(arr_obj,path) {
    for (const item of arr_obj) {
        if (item.gui_behavior === path) return item
        if (item.children && item.children.length) {
            const _item = filterArrObj(item.children,path)
            if (_item) return _item
        }
    }
}

function replaceRouteProperty(route,rule) {
    if(rule.title){
        route.meta.title = rule.title
    }

    if(rule.icon){
        route.meta.icon = rule.icon
    }

    return route;
}

const rule = filterArrObj(menu,'admingroup/edit/:id(\\d+)')

console.log(rule)

function filterAsyncRoutes(routes, menu) {
    const res = []
  
    routes.forEach(route => {
      let tmp = { ...route }
      let rule = filterArrObj(menu, tmp.path)
      if (rule || tmp.children) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, menu)
        }
        tmp = replaceRouteProperty(tmp,rule)
        res.push(tmp)
      }
    })
  
    return res
}

  
const asyncRoutes = [
    {
      path: '/permission',
      name: 'permission',
      meta: { title: '权限管理', icon: 'lock' },
      children: [
        {
          path: 'admin',
          name: 'IndexAdmin',
          meta: { title: '管理员' }
        },
        {
          path: 'admin/create',
          name: 'CreateAdmin',
          meta: { title: '添加管理员' },
          hidden: true
        },
        {
          path: 'admin/edit/:id(\\d+)',
          name: 'administrator edit',
          meta: { title: '编辑管理员' },
          hidden: true
        },
        {
          path: 'admingroup',
          name: 'IndexAdmingroup',
          meta: { title: '管理组' }
        },
        {
          path: 'admingroup/create',
          name: 'CreateAdmingroup',
          meta: { title: '添加管理组' },
          hidden: true
        },
        {
          path: 'admingroup/edit/:id(\\d+)',
          name: 'EditAdmingroup',
          meta: { title: '更新管理组' },
          hidden: true
        },
        {
          path: 'admingroup/rules/:id(\\d+)',
          name: 'SetRules',
          meta: { title: '权限设置' },
          hidden: true
        },
        {
          path: 'syslog',
          name: 'Syslog',
          meta: { title: '系统日志' }
        }
      ]
    }
];

const routes = filterAsyncRoutes(asyncRoutes,menu)
console.log(JSON.stringify(routes,null,4))

