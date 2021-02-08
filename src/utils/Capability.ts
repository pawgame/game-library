import { initedValue } from './initedValue';

const checkWebPSupport = () => {
    try {
        const supportWebp = (window as any).supportWebp === false
                ? false
                : document
                      .createElement('canvas')
                      .toDataURL('image/webp')
                      .indexOf('data:image/webp') === 0;
        return supportWebp;
    } catch (err) {
        return false;
    }
};

export const Capability = {
    /** 检查是否支持webP */
    getWebPSupport: initedValue(checkWebPSupport).get,
};
