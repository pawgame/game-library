import { initedValue } from './initedValue';

/** 检查浏览器是否支持webP格式 */
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

const buildIOSVersion = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('like mac os x') > 0) {
        const reg = /os [\d._]+/gi;
        const versionInfo = ua.match(reg);
        const version = `${versionInfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.'); // 得到版本号9.3.2或者9.0
        const arrVersion = version.split('.');
        return { major: ~~arrVersion[0], minor: ~~arrVersion[1], patch: ~~arrVersion[2] };
    }
    return { major: 0, minor: 0, patch: 0 };
};

const buildAndroidVersion = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('android') > 0) {
        const reg = /android [\d._]+/gi;
        const versionInfo = ua.match(reg);
        const version = `${versionInfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.'); // 得到版本号4.2.2
        const arrVersion = version.split('.');
        return { major: ~~arrVersion[0], minor: ~~arrVersion[1], patch: ~~arrVersion[2] };
    }
    return { major: 0, minor: 0, patch: 0 };
};

export const Capability = {
    /** 检查是否支持webP */
    getWebPSupport: initedValue(checkWebPSupport).get,
    getIOSVersion: initedValue(buildIOSVersion).get,
    getAndroidVersion: initedValue(buildAndroidVersion).get,
};
