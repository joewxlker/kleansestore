// utils/generate-csp.ts
type Value = string;
interface Options {
    devOnly?: boolean;
}
const policy: Partial<Record<Directive, Value[]>> = {};


// utils/generate-csp.ts
interface generateCSPProps {
    nonce?: string;
}

// adder function for our policy object

const generateCSP = ({ nonce }: generateCSPProps = {}) => {
    /* ... */
    const add = (directive: Directive, value: Value, options: Options = {}) => {
        if (options.devOnly && process.env.NODE_ENV !== 'development') return;
        const curr = policy[directive];
        policy[directive] = curr ? [...curr, value] : [value];
    };

    //script-src
    // add('script-src', `'nonce-${nonce}'`);
    add('script-src', `'self'`);
    add('script-src', `'unsafe-eval'`)

    // script-src-elem

    add('base-uri', `'self'`)
    // style-src
    add('style-src', `'unsafe-inline'`);
    add('style-src', `'self'`)

    add('manifest-src', `'none'`)

    add('object-src', `'none'`)

    return Object.entries(policy)
        .map(([key, value]) => `${key} ${value.join(' ')}`)
        .join('; ');
};


export default generateCSP;

// utils/generate-nonce.ts
import crypto from 'crypto';

export const generateNonce = (): string => {
    return crypto.randomBytes(16).toString('base64');
};


type Directive =
    | "https://unpkg.com/tailwindcss@%5E2/dist/"
    | 'child-src'
    | 'connect-src'
    | 'default-src'
    | 'font-src'
    | 'frame-src'
    | 'img-src'
    | 'manifest-src'
    | 'media-src'
    | 'object-src'
    | 'prefetch-src'
    | 'script-src'
    | 'script-src-elem'
    | 'script-src-attr'
    | 'style-src'
    | 'style-src-elem'
    | 'style-src-attr'
    | 'worker-src'
    | 'base-uri'
    | 'plugin-types'
    | 'sandbox'
    | 'form-action'
    | 'frame-ancestors'
    | 'navigate-to'
    | 'report-uri'
    | 'report-to'
    | 'block-all-mixed-content'
    | 'referrer'
    | 'require-sri-for'
    | 'require-trusted-types-for'
    | 'trusted-types'
    | 'upgrade-insecure-requests';