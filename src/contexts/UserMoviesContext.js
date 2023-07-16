import { createContext, useContext } from 'react'

const initialUserData = {
  name: '',
  email: '',
}

const initialContext = {
  currentUser: initialUserData,
  savedMovies: [],
}

const UserMoviesContext = createContext(initialContext)

export const UserMoviesContextProvider = ({ children, ...props }) => {
  return (
    <UserMoviesContext.Provider value={props.context}>
      {children}
    </UserMoviesContext.Provider>
  )
}

export function useUserMoviesContext() {
  return useContext(UserMoviesContext)
}
