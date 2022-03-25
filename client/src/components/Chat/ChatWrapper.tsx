import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

interface Props {
	messages: any;
	sendMessage: (message: string) => void;
}
const ChatWrapper = ({ messages, sendMessage }: Props) => {
	return (
		<div className='chat-wrapper w-100 h-100'>
			<ChatBody messages={messages} />
			<ChatFooter sendMessage={sendMessage} />
		</div>
	);
};

export default ChatWrapper;
