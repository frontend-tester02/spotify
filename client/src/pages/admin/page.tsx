import { useAuthStore } from '@/hooks/use-auth-store'
import Header from './components/header'
import DashboardStats from './components/dashboard-stats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Album, Music } from 'lucide-react'
import SongsTabContent from './components/songs-tab'
import AlbumsTabContent from './components/albums-tab'
import { useMusicStore } from '@/hooks/use-music-store'
import { useEffect } from 'react'

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore()

	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore()

	useEffect(() => {
		fetchAlbums()
		fetchSongs()
		fetchStats()
	}, [fetchAlbums, fetchSongs, fetchStats])

	if (!isAdmin && !isLoading) return <div>You are not admin</div>
	return (
		<div
			className='min-h-screen bg-linear-to-b from-zinc-900 via-zinc-900
    to-black text-zinc-100 p-8'
		>
			<Header />

			<DashboardStats />

			<Tabs defaultValue='songs' className='space-y-6'>
				<TabsList className='p-1 bg-zinc-800/50'>
					<TabsTrigger
						value='songs'
						className='data-[state=active]:bg-zinc-700'
					>
						<Music className='size-4 mr-2' />
						Songs
					</TabsTrigger>
					<TabsTrigger
						value='albums'
						className='data-[state=active]:bg-zinc-700'
					>
						<Album className='mr-2 size-4' />
						Albums
					</TabsTrigger>
				</TabsList>

				<TabsContent value='songs'>
					<SongsTabContent />
				</TabsContent>
				<TabsContent value='albums'>
					<AlbumsTabContent />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default AdminPage
