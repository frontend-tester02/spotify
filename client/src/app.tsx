import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/page'
import AuthCallbackPage from './pages/auth-callback/page'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './layout/main-layout'
import ChatPage from './pages/chat/page'
import AlbumPage from './pages/album/page'
import AdminPage from './pages/admin/page'

import { Toaster } from 'react-hot-toast'

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
				<Route path='/admin' element={<AdminPage />} />

				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
				</Route>
			</Routes>
			<Toaster position='top-center' />
		</>
	)
}

export default App
