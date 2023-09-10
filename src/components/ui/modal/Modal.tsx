'use client'

import { Button, IconButton } from '..'
import { FiLogOut, FiX } from 'react-icons/fi'
import { useStore } from '@/store'

type ModalProps = {
	title: string
	text: string
	loading: boolean
	handleLogout: () => void
}

export const Modal = ({ title, text, loading, handleLogout }: ModalProps) => {
	const { showModal, setShowModal } = useStore()
	return (
		<>
			<IconButton
				label='Logout'
				className='flex items-center gap-1 p-0 hover:bg-transparent dark:hover:bg-transparent hover:text-brand-blue hover:underline dark:hover:text-brand-sky'
				onClick={() => setShowModal(true)}>
				<FiLogOut /> Logout
			</IconButton>
			{showModal ? (
				<>
					<div className='fixed inset-0 backdrop-blur-sm bg-brand-light/30 dark:bg-brand-dark/30' />
					<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative my-6 mx-auto w-96'>
							<div className='border-0 rounded-lg shadow-xl relative flex flex-col w-full outline-none focus:outline-none bg-brand-light dark:bg-brand-dark'>
								<div className='flex items-start justify-between p-5'>
									<h3 className='text-2xl font-semibold'>{title}</h3>
									<IconButton
										label='Close Modal'
										className='text-2xl p-2'
										onClick={() => setShowModal(false)}>
										<FiX />
									</IconButton>
								</div>
								<div className='relative p-6 flex-auto'>
									<p className='text-lg'>{text}</p>
								</div>
								<div className='flex items-center gap-3 p-5'>
									<Button className='h-11' onClick={() => setShowModal(false)}>
										Close
									</Button>
									<Button
										className='h-11'
										loading={loading}
										onClick={handleLogout}>
										Logout
									</Button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	)
}
