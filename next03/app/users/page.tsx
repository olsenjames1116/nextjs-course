import type { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Users',
};

async function UsersPage() {
	const usersData: Promise<User[]> = getAllUsers();

	const users = await usersData;

	console.log('Hello');

	const content = (
		<section>
			<h2>
				<Link href={'/'}>Back to Home</Link>
			</h2>
			{users.map((user) => {
				return (
					<>
						<p key={user.id}>
							<Link href={`/users/${user.id}`}>{user.name}</Link>
						</p>
						<br />
					</>
				);
			})}
			<br />
		</section>
	);

	return content;
}

export default UsersPage;
