/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const gxq = {
  path: '/gxq',
  component: Layout,
  redirect: '/gxq/gxqzzb',
  name: 'gxq',
  meta: {
    title: '高新区',
    icon: 'table'
  },
  children: [
    {
      path: 'gxqzzb',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqzzb',
      meta: { title: '早中班', area: 'gxq', type: 'zzb' }
    },
    {
      path: 'gxqrcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqrcxc',
      meta: { title: '日常巡查', area: 'gxq', type: 'rcxc' }
    },
    {
      path: 'gxqgdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqgdhc',
      meta: { title: '工单核查', area: 'gxq', type: 'gdhc' }
    },
    {
      path: 'gxqgdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqgdcc',
      meta: { title: '工单抽查', area: 'gxq', type: 'gdcc' }
    },
    {
      path: 'gxqwtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqwtsl',
      meta: { title: '问题梳理', area: 'gxq', type: 'wtsl' }
    },
    {
      path: 'gxqzglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqzglxd',
      meta: { title: '整改联系单', area: 'gxq', type: 'zglxd' }
    },
    {
      path: 'gxqldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqldjb',
      meta: { title: '领导交办', area: 'gxq', type: 'ldjb' }
    },
    {
      path: 'gxqwmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'gxqwmcs',
      meta: { title: '文明城市', area: 'gxq', type: 'wmcs' }
    }
  ]
}
export default gxq
