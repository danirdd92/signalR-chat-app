import { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';

const channels = ['General', 'Development', 'Gaming'];
interface Props {
	connectToChannel: any;
}

const Login = ({ connectToChannel }: Props) => {
	const [name, setName] = useState('');
	const [channel, setChannel] = useState();
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		if (!name || !channel || channel === 'Select a channel') {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [name, channel]);

	const handleSubmitForm = (e: any) => {
		e.preventDefault();
		connectToChannel(name, channel);
	};

	return (
		<Container className='d-flex justify-content-center'>
			<Card className='login-card mt-5'>
				<Card.Body>
					<Card.Title className='text-center text-decoration-underline'>SignalR Chat App</Card.Title>

					<Form onSubmit={handleSubmitForm}>
						<Form.Group className='mt-5 mb-4'>
							<Form.Control value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='My name is...' />
						</Form.Group>

						<Form.Select
							className='mb-4'
							value={channel}
							//@ts-ignore
							onChange={(e) => setChannel(e.target.value)}>
							<option value={undefined}>Select a channel</option>

							{channels.map((opt, index) => {
								return (
									<option key={index} value={opt}>
										{opt}
									</option>
								);
							})}
						</Form.Select>
					</Form>

					<Button onClick={handleSubmitForm} className='mx-auto mt-5' type='submit' variant='primary' disabled={isDisabled}>
						Enter Channel
					</Button>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Login;
