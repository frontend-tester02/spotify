import { useSignIn } from '@clerk/clerk-react'
import { Button } from '../ui/button'

const SignInBtn = () => {
	const { signIn, isLoaded } = useSignIn()

	if (!isLoaded) {
		return null
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: 'oauth_google',
			redirectUrl: '/sso-callback',
			redirectUrlComplete: '/auth-callback',
		})
	}

	return (
		<Button
			variant={'secondary'}
			className='w-full text-white h-11 border-zinc-200'
			onClick={signInWithGoogle}
		>
			Continue with Google
		</Button>
	)
}

export default SignInBtn
