/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const gyyq = {
  path: '/gyyq',
  component: Layout,
  redirect: '/gyyq/gyyqzzb',
  name: 'gyyq',
  meta: {
    title: '工业园区',
    icon: 'table'
  },
  children: [
    {
      path: 'gyyqzzb',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqzzb',
      meta: { title: '早中班', area: 'gyyq', type: 'zzb' }
    },
    {
      path: 'gyyqrcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqrcxc',
      meta: { title: '日常巡查', area: 'gyyq', type: 'rcxc' }
    },
    {
      path: 'gyyqgdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqgdhc',
      meta: { title: '工单核查', area: 'gyyq', type: 'gdhc' }
    },
    {
      path: 'gyyqgdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqgdcc',
      meta: { title: '工单抽查', area: 'gyyq', type: 'gdcc' }
    },
    {
      path: 'gyyqwtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqwtsl',
      meta: { title: '问题梳理', area: 'gyyq', type: 'wtsl' }
    },
    {
      path: 'gyyqzglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqzglxd',
      meta: { title: '整改联系单', area: 'gyyq', type: 'zglxd' }
    },
    {
      path: 'gyyqldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqldjb',
      meta: { title: '领导交办', area: 'gyyq', type: 'ldjb' }
    },
    {
      path: 'gyyqwmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'gyyqwmcs',
      meta: { title: '文明城市', area: 'gyyq', type: 'wmcs' }
    }
  ]
}
export default gyyq
