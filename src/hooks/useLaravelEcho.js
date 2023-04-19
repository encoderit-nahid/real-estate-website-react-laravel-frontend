import { _baseURL } from 'consts'
import * as React from 'react'
import LaravelEcho from 'laravel-echo'

const useLaravelEcho = () => {
	const [echo, setEcho] = React.useState(null)
	React.useEffect(
		() => {
			if (echo) return () => {}

			// echo is already exists in window
			if (window.Echo) {
				setEcho(window.Echo)
				return () => {}
			}

			// Bearer token
			const token = localStorage.getItem('token')
			if (!token) return () => {}

			// Pusher
			window.Pusher = require('pusher-js')

			// New echo instance
			window.Echo = new LaravelEcho({
				encrypted: true,
				broadcaster: 'pusher',
				key: process.env.NEXT_PUBLIC_PUSHER_KEY,
				cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
				authEndpoint: _baseURL + '/broadcasting/auth',
				auth: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			})

			// Saving echo instance
			setEcho(window.Echo)

			// Cleanup
			return () => {}
		},
		//
		[echo]
	)

	return echo
}

export default useLaravelEcho
