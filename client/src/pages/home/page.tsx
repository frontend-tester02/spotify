/* eslint-disable @typescript-eslint/no-unused-expressions */
import TopBar from '@/components/shared/top-bar'
import { useMusicStore } from '@/hooks/use-music-store'
import { useEffect } from 'react'
import FeaturedMusic from './components/featured-music'
import { ScrollArea } from '@/components/ui/scroll-area'
import SectionGrid from '@/components/shared/section-grid'
import { usePlayer } from '@/hooks/use-player'

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchTrendingSongs,
		fetchMadeForYouSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore()

	const { initializeQueue } = usePlayer()

	useEffect(() => {
		fetchFeaturedSongs(), fetchMadeForYouSongs(), fetchTrendingSongs()
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

	useEffect(() => {
		if (
			madeForYouSongs.length > 0 &&
			featuredSongs.length > 0 &&
			trendingSongs.length > 0
		) {
			const allSongs = [...madeForYouSongs, ...featuredSongs, ...trendingSongs]
			initializeQueue(allSongs)
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs])

	return (
		<main className='rounded-md overflow-hidden h-full bg-linear-to-b from-zinc-800 to-zinc-900'>
			<TopBar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>
						Good afternoon
					</h1>
					<FeaturedMusic />

					<div className='space-y-8'>
						<SectionGrid
							title='Made For You'
							songs={madeForYouSongs}
							isLoading={isLoading}
						/>
						<SectionGrid
							title='Trending'
							songs={trendingSongs}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</ScrollArea>
		</main>
	)
}

export default HomePage
