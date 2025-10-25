/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios'
import type { Album, Song } from '@/types'
import { create } from 'zustand'

interface MusicStore {
	songs: Song[]
	albums: Album[]
	isLoading: boolean
	error: string | null

	fetchAlbums: () => Promise<void>
}

export const useMusicStore = create<MusicStore>(set => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,

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
}))
