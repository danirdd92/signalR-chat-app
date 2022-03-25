import { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

interface Props {
	sendMessage: (message: string) => void;
}

const ChatFooter = ({ sendMessage }: Props) => {
	const [message, setMessage] = useState('');

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				sendMessage(message);
				setMessage('');
			}}>
			<InputGroup>
				<FormControl type='user' placeholder='message...' onChange={(e) => setMessage(e.target.value)} value={message} />
				<Button variant='primary' type='submit' disabled={!message}>
					Send
				</Button>
			</InputGroup>
		</Form>
	);
};

export default ChatFooter;
