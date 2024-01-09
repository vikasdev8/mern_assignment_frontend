import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apis as noteApis } from './apis/note.apis'
import { apis as userApis } from './apis/user.apis'

const store = configureStore({
  reducer: {
    [noteApis.reducerPath]: noteApis.reducer,
    [userApis.reducerPath]: userApis.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApis.middleware, userApis.middleware),
})

setupListeners(store.dispatch)

export default store