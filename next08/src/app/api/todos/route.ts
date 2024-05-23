import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
	const origin = request.headers.get('origin');
	const res = await fetch(DATA_SOURCE_URL);

	const todos: Todo[] = await res.json();

	return new NextResponse(JSON.stringify(todos), {
		headers: {
			'Access-Control-Allow-Origin': origin || '*',
			'Content-Type': 'application/json',
		},
	});
}

export async function DELETE(request: Request) {
	const { id }: Partial<Todo> = await request.json();

	if (!id) NextResponse.json({ message: 'Todo id required' });

	await fetch(`${DATA_SOURCE_URL}/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'API-Key': API_KEY,
		},
	});

	return NextResponse.json({ message: `Todo ${id} deleted` });
}

export async function POST(request: Request) {
	const { userId, title }: Partial<Todo> = await request.json();

	if (!userId || !title)
		NextResponse.json({ message: 'Missing required data' });

	const res = await fetch(DATA_SOURCE_URL, {
		method: 'POST',
		body: JSON.stringify({
			userId,
			title,
			completed: false,
		}),
		headers: {
			'Content-Type': 'application/json',
			'API-Key': API_KEY,
		},
	});

	const newTodo = await res.json();

	return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
	const { userId, id, title, completed }: Partial<Todo> = await request.json();

	if (!userId || !id || !title || typeof completed !== 'boolean')
		NextResponse.json({ message: 'Missing required data' });

	const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			userId,
			title,
			completed,
		}),
		headers: {
			'Content-Type': 'application/json',
			'API-Key': API_KEY,
		},
	});

	const updatedTodo = await res.json();

	return NextResponse.json(updatedTodo);
}
