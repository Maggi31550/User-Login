import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2'


const theme = createTheme();
const loginUser = async credentials => {
	return fetch('https://www.melivecode.com/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then(data => data.json())



}
export default function SignIn() {
	const handleSubmit = async event => {
		event.preventDefault();
		const response = await loginUser({
			username,
			password
		})
		if ('accessToken' in response) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Your work has been saved',
				showConfirmButton: false,
				timer: 1500
			  })
			.then((value) => {
			  localStorage.setItem('accessToken', response['accessToken']);
			  localStorage.setItem('user', JSON.stringify(response['user']));
			  window.location.href = "/profile";
			});
		  } else {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Oops..',
				text: 'Something went wrong!',
				showConfirmButton: false,
				timer: 1500
			  })
		  }
	};

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}

						>
							Sign In
						</Button>

					</Box>
				</Box>

			</Container>
		</ThemeProvider>
	);
}