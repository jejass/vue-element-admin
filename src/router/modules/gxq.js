/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const gxq = {
  path: '/gxq',
  component: Layout,
  redirect: '/gxq/zzb',
  name: 'gxq',
  meta: {
    title: '高新区',
    icon: 'table'
  },
  children: [
    {
      path: 'zzb',
      component: () => import('@/views/table/complex-table'),
      name: 'zzb',
      meta: { title: '早中班', area: 'gxq', type: 'zzb' }
    },
    {
      path: 'rcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'rcxc',
      meta: { title: '日常巡查', area: 'gxq', type: 'rcxc' }
    },
    {
      path: 'gdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'gdhc',
      meta: { title: '工单核查', area: 'gxq', type: 'gdhc' }
    },
    {
      path: 'gdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'gdcc',
      meta: { title: '工单抽查', area: 'gxq', type: 'gdcc' }
    },
    {
      path: 'wtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'wtsl',
      meta: { title: '问题梳理', area: 'gxq', type: 'wtsl' }
    },
    {
      path: 'zglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'zglxd',
      meta: { title: '高新区-整改联系单', area: 'gxq', type: 'zglxd' }
    },
    {
      path: 'ldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'ldjb',
      meta: { title: '高新区-领导交办', area: 'gxq', type: 'ldjb' }
    },
    {
      path: 'wmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'wmcs',
      meta: { title: '高新区-文明城市', area: 'gxq', type: 'wmcs' }
    }
  ]
}
export default gxq
