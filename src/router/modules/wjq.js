/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const wjq = {
  path: '/wjq',
  component: Layout,
  redirect: '/wjq/wjqzzb',
  name: 'wjq',
  meta: {
    title: '吴江区',
    icon: 'table'
  },
  children: [
    {
      path: 'wjqzzb',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqzzb',
      meta: { title: '早中班', area: 'wjq', type: 'zzb' }
    },
    {
      path: 'wjqrcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqrcxc',
      meta: { title: '日常巡查', area: 'wjq', type: 'rcxc' }
    },
    {
      path: 'wjqgdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqgdhc',
      meta: { title: '工单核查', area: 'wjq', type: 'gdhc' }
    },
    {
      path: 'wjqgdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqgdcc',
      meta: { title: '工单抽查', area: 'wjq', type: 'gdcc' }
    },
    {
      path: 'wjqwtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqwtsl',
      meta: { title: '问题梳理', area: 'wjq', type: 'wtsl' }
    },
    {
      path: 'wjqzglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqzglxd',
      meta: { title: '整改联系单', area: 'wjq', type: 'zglxd' }
    },
    {
      path: 'wjqldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqldjb',
      meta: { title: '领导交办', area: 'wjq', type: 'ldjb' }
    },
    {
      path: 'wjqwmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'wjqwmcs',
      meta: { title: '文明城市', area: 'wjq', type: 'wmcs' }
    }
  ]
}
export default wjq
