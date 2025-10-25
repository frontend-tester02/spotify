/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios'
import type { Album, Song } from '@/types'
import { create } from 'zustand'

interface MusicStore {
	songs: Song[]
	albums: Album[]
	isLoading: boolean
	error: string | null
	currentAlbum: Album | null

	fetchAlbums: () => Promise<void>
	fetchAlbumById: (id: string) => Promise<void>
}

export const useMusicStore = create<MusicStore>(set => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,

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
}))
