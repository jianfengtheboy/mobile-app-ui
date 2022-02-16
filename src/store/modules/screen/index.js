import services from './services'
import common from '../common'
import transfer from '../../transfer'

const { mutations } = common

export default {
  namespaced: true,
  state: {},
  mutations: {
    ...mutations
  },
  actions: {
    ...transfer.transToActions(services)
  }
}
