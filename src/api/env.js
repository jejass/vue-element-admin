import request from '@/utils/request'

export function fetchIssueTypes() {
  return request({
    url: '/issueTypes',
    method: 'get',
    baseURL: 'http://localhost:8080'
  })
}

export function fetchDistrict(area) {
  return request({
    url: '/district/' + area,
    method: 'get',
    baseURL: 'http://localhost:8080'
  }
  )
}

export function fetchIssues(query) {
  return request({
    url: '/issueList',
    method: 'get',
    params: query,
    baseURL: 'http://localhost:8080'
  }
  )
}

export function createIssue(data) {
  return request({
    url: '/saveIssue',
    method: 'post',
    data,
    baseURL: 'http://localhost:8080'
  })
}

export function updateIssue(data) {
  return request({
    url: '/updateIssue',
    method: 'put',
    data,
    baseURL: 'http://localhost:8080'
  })
}

export function deleteIssue(id) {
  return request({
    url: `/deleteIssue/${id}`,
    method: 'delete',
    baseURL: 'http://localhost:8080'
  })
}
