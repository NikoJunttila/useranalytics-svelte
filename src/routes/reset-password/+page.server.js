// @ts-nocheck
import { URLSearchParams } from 'url';
export async function load({url}) {
    const params = new URLSearchParams(url.search);
    const token = params.get('token');
    return {
        token
    };
};