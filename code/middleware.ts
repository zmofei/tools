import { NextRequest, NextResponse } from 'next/server'

// Limit the middleware to paths starting with `/api/`
// export const config = {
//     matcher: '/api/:function*',
// }

export function middleware(request: NextRequest) {
    const response = NextResponse.next();


    const hostname = request.nextUrl.hostname;

    let lan = 'zh';
    if (/himofei\.com/.test(hostname.toLocaleLowerCase())) {
        lan = 'en';
    };

    response.cookies.set('lan', lan)
    return response;
}