type ImagePreviewResType = {
    url: string;
    mediaType: string;
    contentType: string;
    favicons: string[];
} | {
    url: string;
    title: string;
    siteName: string | undefined;
    description: string | undefined;
    mediaType: string;
    contentType: string | undefined;
    images: string[];
    videos: {};
    favicons: string[];
}

type PostStateType = {
    title: string;
    url: string;
    image_url:string;
    description?: string;
}

type ApiResponseType<T> = {
    current_page: number
    data: Array<T> | []
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
}

type PostType = {
    id: number
    user: User
    user_id: number
    title: string
    url: string
    image_url: string
    description: string
    comment_count: number
    vote: number
    created_at: string
    updated_at: string
}

type Link = {
    url?: string
    label: string
    page?: number
    active: boolean
}

type User = {
    id: number
    name: string
    email: string
    username: string
    email_verified_at: any
    profile_image: string
    created_at: string
    updated_at: string
}