import React from 'react'

import styles from './Home.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormState {
	name: string
	email: string
}

const Home: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false)
	const [isSuccess, setIsSuccess] = React.useState(false)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormState>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IFormState> = data => {
		setIsLoading(true)
		fetch('http://localhost:5000/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				if (!data) return
				console.log(data)
				setIsSuccess(true)
				reset()
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<div className={styles.wrapper}>
			{isSuccess ? (
				<div className={styles.success}>Форма успешно отправлена!</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1 className='text-4xl'>GTA 6 - Оставь заявку</h1>
					<input
						type='email'
						placeholder='Введите Email:'
						{...register('email', {
							required: 'This is a valid email address'
						})}
					/>
					<div className={styles.error}>{errors?.email?.message}</div>
					<input
						type='name'
						placeholder='Введите имя:'
						{...register('name', {
							required: 'This is a valid name'
						})}
					/>
					<div className={styles.error}>{errors?.name?.message}</div>
					<button disabled={isLoading}>
						{isLoading ? 'Идёт загрузка' : 'Хочу ГТА!'}
					</button>
				</form>
			)}
		</div>
	)
}

export default Home
