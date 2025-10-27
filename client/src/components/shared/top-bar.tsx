import { SignedOut, UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import SignInBtn from './sign-in-btn'
import { useAuthStore } from '@/hooks/use-auth-store'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

const TopBar = () => {
	const { isAdmin } = useAuthStore()

	return (
		<div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
			<div className='flex items-center gap-2'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>
			<div className='flex items-center gap-2'>
				{isAdmin && (
					<Link
						to={'/admin'}
						className={cn(buttonVariants({ variant: 'outline' }))}
					>
						<LayoutDashboardIcon className='size-4 mr-2' />
						Admin Dashboard
					</Link>
				)}

				<SignedOut>
					<SignInBtn />
				</SignedOut>
				<UserButton />
			</div>
		</div>
	)
}

export default TopBar
