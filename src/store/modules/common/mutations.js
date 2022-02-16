export default {
  save (state, payload) {
    Object.keys(payload).forEach(key => (state[key] = payload[key]))
  }
}
