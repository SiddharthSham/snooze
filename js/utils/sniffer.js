export const sniff = {
    uA: navigator.userAgent.toLowerCase(),
    get isMobile() {
        return /mobi|android|tablet|ipad|iphone/.test(this.uA) || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
    },
    get isMobileAndroid() {
        return /android.*mobile/.test(this.uA)
    },
    get isAndroid() {
        return this.isMobileAndroid || !this.isMobileAndroid && /android/i.test(this.uA)
    },
    get isFirefox() {
        return -1 < this.uA.indexOf("firefox")
    },
    get safari() {
        return this.uA.match(/version\/[\d.]+.*safari/)
    },
    get isSafari() {
        return !!this.safari && !this.isAndroid
    },
    get isSafariOlderThan8() {
        var t = 8;
        this.isSafari && (t = +this.safari[0].match(/version\/\d{1,2}/)[0].split("/")[1]);
        return t < 8
    },
    get isIEolderThan11() {
        return -1 < this.uA.indexOf("msie")
    },
    get isIE11() {
        return 0 < navigator.appVersion.indexOf("Trident/")
    },
    get isEdge() {
        return /Edge\/\d./i.test(this.uA)
    }
}