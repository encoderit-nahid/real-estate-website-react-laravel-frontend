import useLaravelEcho from './useLaravelEcho'
import { PresenceChannel } from 'pusher-js'

const useChannel = (
	channelName: string,
	callback = (channel: PresenceChannel) => {}
) => {}

export default useChannel
