import { initedValue } from './initedValue';

const checkWebPSupport = () => {
    try {
        return (
            window.supportWebp ??
            document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') ===
                0
        );
    } catch (err) {
        return false;
    }
};

export const Capability = {
    /** 检查是否支持webP */
    getWebPSupport: initedValue(checkWebPSupport).get,
};
