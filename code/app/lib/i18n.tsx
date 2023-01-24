import { cookies } from 'next/headers';


export function i18n(lans: { [key: string]: any; }) {
    const nextCookies = cookies();
    const lan = nextCookies.get('lan');
    return lans[lan?.value]
}
