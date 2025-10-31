import TopBar from '@/components/shared/top-bar'
import { useChatStore } from '@/hooks/use-chat-store'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import UsersList from './components/users-list'

const ChatPage = () => {
	const { user } = useUser()
	const { fetchMessages, fetchUsers, selectedUser, messages } = useChatStore()

	useEffect(() => {
		if (user) {
			fetchUsers()
		}
	}, [fetchUsers, user])

	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId)
	}, [fetchMessages, selectedUser])

	return (
		<main className='h-full rounded-lg bg-linear-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
			<TopBar />

			<div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
				<UsersList />
			</div>
		</main>
	)
}

export default ChatPage
