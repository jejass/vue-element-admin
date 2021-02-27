/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const xcq = {
  path: '/xcq',
  component: Layout,
  redirect: '/xcq/xcqzzb',
  name: 'xcq',
  meta: {
    title: '相城区',
    icon: 'table'
  },
  children: [
    {
      path: 'xcqzzb',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqzzb',
      meta: { title: '早中班', area: 'xcq', type: 'zzb' }
    },
    {
      path: 'xcqrcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqrcxc',
      meta: { title: '日常巡查', area: 'xcq', type: 'rcxc' }
    },
    {
      path: 'xcqgdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqgdhc',
      meta: { title: '工单核查', area: 'xcq', type: 'gdhc' }
    },
    {
      path: 'xcqgdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqgdcc',
      meta: { title: '工单抽查', area: 'xcq', type: 'gdcc' }
    },
    {
      path: 'xcqwtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqwtsl',
      meta: { title: '问题梳理', area: 'xcq', type: 'wtsl' }
    },
    {
      path: 'xcqzglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqzglxd',
      meta: { title: '整改联系单', area: 'xcq', type: 'zglxd' }
    },
    {
      path: 'xcqldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqldjb',
      meta: { title: '领导交办', area: 'xcq', type: 'ldjb' }
    },
    {
      path: 'xcqwmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'xcqwmcs',
      meta: { title: '文明城市', area: 'xcq', type: 'wmcs' }
    }
  ]
}
export default xcq
