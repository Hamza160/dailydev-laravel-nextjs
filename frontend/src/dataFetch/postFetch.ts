import {API_URL, POST_URL} from "@/lib/apiEndpoints";

export async function fetchPosts(token: string) {
    const res = await  fetch(API_URL + POST_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if(!res.ok)
    {
        throw new Error('Failed to get data')
    }

    return res.json()
}