const rem2px = (n: number, base = 750): number => {
    return n * 100 * (document.documentElement.offsetWidth / base);
};

const scrollTop = (top: number, smooth = false): void => {
    if (smooth && 'scrollBehavior' in document.documentElement.style) {
        try {
            window.scrollTo({
                top,
                behavior: 'smooth',
            });
        } catch (e) {
            document.documentElement.scrollTop = top;
            document.body.scrollTop = top;
        }
    } else {
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
    }
};

export const BrowserUtils = {
    rem2px,
    scrollTop,
}
