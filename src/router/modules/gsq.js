/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const gsq = {
  path: '/gsq',
  component: Layout,
  redirect: '/gsq/gsqzzb',
  name: 'gsq',
  meta: {
    title: '姑苏区',
    icon: 'table'
  },
  children: [
    {
      path: 'gsqzzb',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqzzb',
      meta: { title: '早中班', area: 'gsq', type: 'zzb' }
    },
    {
      path: 'gsqrcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'rcxc',
      meta: { title: '日常巡查', area: 'gsq', type: 'rcxc' }
    },
    {
      path: 'gsqgdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqgdhc',
      meta: { title: '工单核查', area: 'gsq', type: 'gdhc' }
    },
    {
      path: 'gsqgdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqgdcc',
      meta: { title: '工单抽查', area: 'gsq', type: 'gdcc' }
    },
    {
      path: 'gsqwtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqwtsl',
      meta: { title: '问题梳理', area: 'gsq', type: 'wtsl' }
    },
    {
      path: 'gsqzglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqzglxd',
      meta: { title: '整改联系单', area: 'gsq', type: 'zglxd' }
    },
    {
      path: 'gsqldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqldjb',
      meta: { title: '领导交办', area: 'gsq', type: 'ldjb' }
    },
    {
      path: 'gsqwmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'gsqwmcs',
      meta: { title: '文明城市', area: 'gsq', type: 'wmcs' }
    }
  ]
}
export default gsq
