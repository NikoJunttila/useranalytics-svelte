// @ts-nocheck
import { URLSearchParams } from 'url';
import { error } from '@sveltejs/kit';

export async function load({url}) {
    const params = new URLSearchParams(url.search);
    const token = params.get('token');
    if (!token){
        error(404, 'error getting reset token');
    }
    return {
        token
    };
};