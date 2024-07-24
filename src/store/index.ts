import piniaState from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaState)

export default store

export * from './modules/app'
