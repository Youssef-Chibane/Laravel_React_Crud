import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Posts', href: '/posts' }];

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export default function Posts() {
    const { posts } = usePage<{ posts: PaginatedData<Post> }>().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(route('posts.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href={route('posts.create')}>
                        <Button>Create Post</Button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Body</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.data.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Link href={route('posts.edit', post.id)}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {posts.from} to {posts.to} of {posts.total} results
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <Link href={posts.prev_page_url || '#'} className={posts.prev_page_url ? '' : 'pointer-events-none opacity-50'}>
                            <Button variant="outline" size="sm" disabled={!posts.prev_page_url}>
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                        </Link>

                        {/* Page Numbers */}
                        <div className="flex items-center space-x-1">
                            {posts.links.map((link, index) => {
                                // Skip the "Previous" and "Next" links as we handle them separately
                                if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                                    return null;
                                }

                                return (
                                    <Link key={index} href={link.url || '#'} className={link.url ? '' : 'pointer-events-none'}>
                                        <Button variant={link.active ? 'default' : 'outline'} size="sm" className="min-w-[40px]" disabled={!link.url}>
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <Link href={posts.next_page_url || '#'} className={posts.next_page_url ? '' : 'pointer-events-none opacity-50'}>
                            <Button variant="outline" size="sm" disabled={!posts.next_page_url}>
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
