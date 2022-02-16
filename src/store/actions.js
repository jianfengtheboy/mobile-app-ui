import services from './services'
import transfer from './transfer'

export default {
  ...transfer.transToActions(services)
}
