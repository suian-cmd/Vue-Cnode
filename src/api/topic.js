import request from '@/helpers/request.js'

let URL = {
  GET_TOPICS: '/topics',
  GET_TOPIC_BY_ID: '/topic/:id',
  POST_add_topic : '/topics',
  POST_add_comment: '/topic/:topic_id/replies',
  POST_add_praise: '/reply/:reply_id/ups'
}

export default {
  getTopics({ page, limit, tab }) {
    return request(URL.GET_TOPICS, 'GET', { page, limit ,tab })
  },
  getTopicById({ id }) {
    return request(URL.GET_TOPIC_BY_ID.replace(':id', id))
  },
  addTopic({accesstoken, title, tab, content}){
    return request(URL.POST_add_topic,'POST', {accesstoken, title, tab, content})
  },
  addComment({topic_id, accesstoken, content, reply_id}){
    return request(URL.POST_add_comment.replace(':topic_id', topic_id), 'POST', {accesstoken, content, reply_id})
  },
  addPraise({accesstoken,reply_id}){
    return request(URL.POST_add_praise.replace(':reply_id',reply_id),'POST',{accesstoken})
  }
}
