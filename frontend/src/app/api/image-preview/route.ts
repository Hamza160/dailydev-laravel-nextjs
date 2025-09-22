import {NextRequest, NextResponse} from 'next/server'
import {getLinkPreview} from 'link-preview-js'
import {unstable_noStore} from "next/cache";

export async function POST(req: NextRequest) {
    unstable_noStore()
    try {
        const body = await req.json()
        const data: ImagePreviewResType = (await getLinkPreview(body.url, {
            imagesPropertyType: "og",
            followRedirects: "follow",
        })) as ImagePreviewResType

        return NextResponse.json({status: 200, data})
    } catch (e) {
        return NextResponse.json({status: 404, message: "Not Found"})
    }
}
