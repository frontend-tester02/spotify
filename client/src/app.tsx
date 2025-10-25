import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/page'
import AuthCallbackPage from './pages/auth-callback/page'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/main-layout'
import ChatPage from './pages/chat/chat'

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/sso-callback'
					element={
						<AuthenticateWithRedirectCallback
							signInForceRedirectUrl={'/auth-callback'}
						/>
					}
				/>
				<Route path='/auth-callback' element={<AuthCallbackPage />} />

				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/chat' element={<ChatPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
