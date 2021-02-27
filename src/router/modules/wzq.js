/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const wzq = {
  path: '/wzq',
  component: Layout,
  redirect: '/wzq/wzqzzb',
  name: 'wzq',
  meta: {
    title: '吴中区',
    icon: 'table'
  },
  children: [
    {
      path: 'wzqzzb',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqzzb',
      meta: { title: '早中班', area: 'wzq', type: 'zzb' }
    },
    {
      path: 'wzqrcxc',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqrcxc',
      meta: { title: '日常巡查', area: 'wzq', type: 'rcxc' }
    },
    {
      path: 'wzqgdhc',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqgdhc',
      meta: { title: '工单核查', area: 'wzq', type: 'gdhc' }
    },
    {
      path: 'wzqgdcc',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqgdcc',
      meta: { title: '工单抽查', area: 'wzq', type: 'gdcc' }
    },
    {
      path: 'wzqwtsl',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqwtsl',
      meta: { title: '问题梳理', area: 'wzq', type: 'wtsl' }
    },
    {
      path: 'wzqzglxd',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqzglxd',
      meta: { title: '整改联系单', area: 'wzq', type: 'zglxd' }
    },
    {
      path: 'wzqldjb',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqldjb',
      meta: { title: '领导交办', area: 'wzq', type: 'ldjb' }
    },
    {
      path: 'wzqwmcs',
      component: () => import('@/views/table/complex-table'),
      name: 'wzqwmcs',
      meta: { title: '文明城市', area: 'wzq', type: 'wmcs' }
    }
  ]
}
export default wzq
