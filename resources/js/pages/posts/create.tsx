import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Create',
        href: '/posts/create',
    },
];

export default function PostCreate() {
    const { data, setData, errors, post } = useForm({
        title: '',
        body: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-xl font-bold">Create a new post</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                autoComplete="title"
                                placeholder="title"
                            />

                            <InputError className="mt-2" message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="body">Body</Label>

                            <Textarea
                                id="body"
                                className="mt-1 block w-full"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                autoComplete="body"
                                placeholder="body"
                            />

                            <InputError className="mt-2" message={errors.body} />
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit">Submit</Button>
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
