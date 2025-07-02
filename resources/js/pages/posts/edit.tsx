import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Edit',
        href: '/posts',
    },
];

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function PostEdit() {
    const { post } = usePage<{ post: Post }>().props;

    const { data, setData, put, errors } = useForm({
        title: post.title,
        body: post.body,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-bold">Edit Post</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="title">Title</label>
                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                autoComplete="title"
                            />
                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="body">Body</label>
                            <Textarea
                                id="body"
                                className="mt-1 block w-full"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                autoComplete="body"
                            />
                            <InputError className="mt-2" message={errors.body} />
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit">Update</Button>
                            <Link href={route('posts.index')}>
                                <Button variant="outline">Back</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
