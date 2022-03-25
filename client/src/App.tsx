import { useState } from 'react';
import ChatWrapper from './components/Chat/ChatWrapper';
import Login from './components/Login';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import './styles/App.scss';

const App = () => {
	const [connection, setConnection] = useState<HubConnection>();
	const [messages, setMessages] = useState<Message[]>([]);

	const connectToChannel = async (user: string, channel: string) => {
		try {
			const connection = new HubConnectionBuilder().withUrl(`https://localhost:7270/chat`).configureLogging(LogLevel.Information).build();

			connection.on('ReceiveMessage', (user, message) => {
				setMessages((messages) => [...messages, { user, message }]);
			});
			await connection.start();
			await connection.invoke('JoinChannel', { user, channel });
			setConnection(connection);
		} catch (err) {
			console.error(err);
		}
	};

	const sendMessage = async (message: string) => {
		try {
			await connection?.invoke('SendMessage', message);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='app-container'>
			{!connection ? <Login connectToChannel={connectToChannel} /> : <ChatWrapper messages={messages} sendMessage={sendMessage} />}
		</div>
	);
};

export default App;
