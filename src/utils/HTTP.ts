import { appendURLParams } from '@shm-open/utilities';

const toRequestBody = (body: unknown): BodyInit => {
    if (body === null || body === undefined) {
        return '';
    }
    if (typeof body !== 'object') {
        return body.toString();
    }

    if (typeof FormData !== 'undefined' && body instanceof FormData) {
        return body;
    }

    return JSON.stringify(body);
};

const inferContentType = (body: unknown): string => {
    if (body === null || body === undefined || typeof body !== 'object') {
        return null;
    }

    if (typeof FormData !== 'undefined' && body instanceof FormData) {
        return null;
    }

    return 'application/json; charset=utf-8';
};

const request = async (url: string, opts: Omit<RequestInit, 'body'> & { body?: unknown }) => {
    const { body, headers = {} } = opts;
    const requestInit = { ...opts } as RequestInit;

    const requestBody = toRequestBody(body);
    if (requestBody) {
        requestInit.body = requestBody;
    }
    const contentType = headers?.['Content-Type'] ?? inferContentType(body);
    if (contentType) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        requestInit.headers = { ...headers, 'Content-Type': contentType };
    }
    return fetch(url, requestInit)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            throw response;
        })
        .then((response) => {
            const { headers: replyHeaders } = response;
            const replyContentType = replyHeaders?.get('content-type') ?? '';

            let extractDataPromise: Promise<unknown>;
            if (replyContentType.includes('application/json')) {
                extractDataPromise = response.json();
            } else if (replyContentType.includes('text/plain')) {
                extractDataPromise = response.text();
            } else if (replyContentType.includes('application/octet-stream')) {
                extractDataPromise = response.blob();
            } else if (replyContentType.includes('application/x-www-form-urlencoded')) {
                extractDataPromise = response.formData();
            } else {
                // unknown data type
                extractDataPromise = Promise.resolve();
            }
            return extractDataPromise.then((data) => ({
                data,
                headers: replyHeaders,
            }));
        });
};

/**
 * send get request
 * @param url base API path
 * @param params url params for this get request, will be appended to url to make request
 * @param opts other fetch options
 */
const get = (url: string, params: unknown = {}, opts: Record<string, unknown> = {}) => {
    return request(appendURLParams(url, params as Record<string, string | boolean | number>), {
        ...opts,
        method: 'GET',
    });
};

/**
 * send post request
 * @param url API path
 * @param params body params for this request
 * @param opts other fetch options
 */
const post = (url: string, params: unknown = {}, opts: Record<string, unknown> = {}) => {
    return request(url, { ...opts, method: 'POST', body: params });
};

/**
 * send put request
 * @param url API path
 * @param params body params for this request
 * @param opts other fetch options
 */
const put = (url: string, params: unknown = {}, opts: Record<string, unknown> = {}) => {
    return request(url, { ...opts, method: 'PUT', body: params });
};

/**
 * send delete request
 * @param url base API path
 * @param opts other fetch options
 */
const del = (url: string, opts: Record<string, unknown> = {}) => {
    return request(url, { ...opts, method: 'DELETE' });
};

export const HTTP = {
    get,
    post,
    put,
    del,
};
