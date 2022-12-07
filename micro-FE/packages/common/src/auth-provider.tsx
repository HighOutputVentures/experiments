import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import constants from './constants'
import { IUser } from './types'

export interface IAuthContext {
  user?: IUser | null
  login(user: IUser): void
  logout(): void
  clear(): void
  isAuthorized?: boolean
}

export const AuthContext = createContext<IAuthContext>({
  clear() {},
  login() {},
  logout() {}
})

const getInitialState = (): IAuthContext['user'] => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(constants.LOCALSTORAGE_CURRENT_USER_ID)
  return raw ? JSON.parse(raw) : null
}

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState(getInitialState)
  const isAuthorized = useMemo(() => !!user, [user])

  const login = useCallback((user: IUser) => {
    localStorage.setItem(
      constants.LOCALSTORAGE_CURRENT_USER_ID,
      JSON.stringify(user)
    )

    setUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(constants.LOCALSTORAGE_CURRENT_USER_ID)
    setUser(null)
  }, [])

  const clear = useCallback(() => {
    logout()
  }, [logout])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        clear,
        isAuthorized
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export type UseAuthContext = IAuthContext

export function useAuthContext(): UseAuthContext {
  return useContext(AuthContext)
}

export function withAuthContext<T extends { [key: string]: unknown } = {}>(
  Component: (props: T) => JSX.Element
) {
  return function ComponentWithAuthContext(props: T) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    )
  }
}
