/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios'
import type { Album, Song, Stats } from '@/types'
import { create } from 'zustand'

interface MusicStore {
	songs: Song[]
	albums: Album[]
	isLoading: boolean
	error: string | null
	currentAlbum: Album | null
	featuredSongs: Song[]
	madeForYouSongs: Song[]
	trendingSongs: Song[]
	stats: Stats

	fetchAlbums: () => Promise<void>
	fetchAlbumById: (id: string) => Promise<void>
	fetchFeaturedSongs: () => Promise<void>
	fetchMadeForYouSongs: () => Promise<void>
	fetchTrendingSongs: () => Promise<void>
	fetchStats: () => Promise<void>
	fetchSongs: () => Promise<void>
}

export const useMusicStore = create<MusicStore>(set => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	},

	fetchSongs: async () => {
		set({
			isLoading: true,
			error: null,
		})

		try {
			const responce = await axiosInstance.get('/songs')
			set({ songs: responce.data })
		} catch (error: any) {
			set({ error: error.responce.data.message })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchStats: async () => {
		set({
			isLoading: true,
			error: null,
		})

		try {
			const responce = await axiosInstance.get('/stats')
			set({ stats: responce.data })
		} catch (error: any) {
			set({ error: error.responce.data.message })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchAlbums: async () => {
		set({
			isLoading: true,
			error: null,
		})

		try {
			const responce = await axiosInstance.get('/albums')
			set({ albums: responce.data })
		} catch (error: any) {
			set({ error: error.responce.data.message })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchAlbumById: async (id: string) => {
		set({ isLoading: true, error: null })
		try {
			const response = await axiosInstance.get(`/albums/${id}`)
			set({ currentAlbum: response.data })
		} catch (error: any) {
			set({ error: error.response.data.message })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null })
		try {
			const response = await axiosInstance.get('/songs/featured')
			set({ featuredSongs: response.data })
		} catch (error: any) {
			set({ error: error.response.data.message })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null })
		try {
			const response = await axiosInstance.get('/songs/made-for-you')
			set({ madeForYouSongs: response.data })
		} catch (error: any) {
			set({ error: error.response.data.message })
		} finally {
			set({ isLoading: false })
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null })
		try {
			const response = await axiosInstance.get('/songs/trending')
			set({ trendingSongs: response.data })
		} catch (error: any) {
			set({ error: error.response.data.message })
		} finally {
			set({ isLoading: false })
		}
	},
}))
