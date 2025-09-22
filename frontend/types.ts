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