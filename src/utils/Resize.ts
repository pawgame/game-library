/**
 * 设备的安全区域Y
 * @param screenWidth 设备屏幕宽度
 * @param screenHeight 设备屏幕高度
 */
const getSafeY = (screenWidth: number, screenHeight: number) => {
    const nowRate = screenHeight / screenWidth;
    const safeRate = 16 / 9;
    return nowRate <= safeRate ? 0 : 0.5 * (screenHeight - screenWidth * safeRate);
}

/**
 * 浏览器全屏时的安全区域Y
 */
const getWebSafeY = () => {
    return getSafeY(window.screen.width, window.screen.height);
}

export const Resize = {
    getSafeY,
    getWebSafeY,
}
