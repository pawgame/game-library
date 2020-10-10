const rem2px = (n: number, base = 750) => n * 100 * (document.documentElement.offsetWidth / base);

/**
 * 根据设备DPR，换算成逻辑像素
 */
const dpr2px = (size: number) => {
    const docFontSize = parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));
    return (size / 100) * docFontSize;
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
    dpr2px,
};
