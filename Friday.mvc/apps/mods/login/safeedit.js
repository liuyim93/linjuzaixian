KISSY.add("login/safeedit", function (E) {
    var D = E.UA;
    var A = (['<object id="Password_Edit_Tmp_IE" width="0" height="0" classid="clsid:488A4255-3236-44B3-8F27-FA1AECAA8844" >', '<param name="cm5ts" value="0613110323" />', '<param name="cm5pk" value="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDS92pDVyWNT7dzG9zH0opH44z9FayCZTX5iqGUxUjPi667IkyaqrsmDPqKsJp47lJ29lzs+Qv8zjPPdmnxjFteMrfpc4ui24gL1iZnchwX87Ox/+Xrm8HFmKlhmUO9n/QgTT+Nz1RGMEN1+HijvsoAhS0TS8XjSfzRkrwvK2pJQIDAQAB" />', '<param name="CryptoMode" value="4" />', '<embed type="application/aliedit" id="Password_Edit_Tmp_NoIE" width="0" height="0" />', "</object>"]).join(""), F = (['<object id="Password_Edit_IE" width="252" height="26" tabindex="2" classid="clsid:488A4255-3236-44B3-8F27-FA1AECAA8844">', '<param name="cm5ts" value="0613110323" />', '<param name="cm5pk" value="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDS92pDVyWNT7dzG9zH0opH44z9FayCZTX5iqGUxUjPi667IkyaqrsmDPqKsJp47lJ29lzs+Qv8zjPPdmnxjFteMrfpc4ui24gL1iZnchwX87Ox/+Xrm8HFmKlhmUO9n/QgTT+Nz1RGMEN1+HijvsoAhS0TS8XjSfzRkrwvK2pJQIDAQAB" />', '<param name="CryptoMode" value="4" />', '<embed type="application/aliedit" id="Password_Edit_NoIE" width="252" height="26" />', "</object>"]).join("");
    var B = { win: { ie: "https://download.alipay.com/aliedit/aliedit/2401/aliedit.exe", random: "https://download.alipay.com/aliedit/aliedit/2401/aliedit.exe", other: "https://download.alipay.com/aliedit/npaliedit/1302/npaliedit.exe" }, mac: { safari: "https://download.alipay.com/aliedit/wkaliedit/1002/wkaliedit.dmg"} };
    var C = { support: function () {
        var G = null;
        if (window.ActiveXObject) {
            try {
                G = new ActiveXObject("Aliedit.EditCtrl")
            } catch (H) {
                return false
            }
        } else {
            G = navigator.plugins["Alipay security control"] || navigator.plugins["Aliedit Plug-In"] || navigator.plugins.Aliedit || null
        }
        return G ? true : false
    } (), uaSupport: function () {
        //2013-03-01 basilwang uaSupport is false if browser is chrome or safari
        return !E.UA.chrome && !E.UA.safari
    } (), objectNoIE: A, objectIE: F, src: function () {
        if (navigator.platform.indexOf("Win") !== -1) {
            if (D.ie) {
                return B.win.ie
            } else {
                if (!D.opera) {
                    return B.win.other
                }
            }
        } else {
            if (navigator.platform.indexOf("Mac") !== -1) {
                if (D.safari) {
                    return B.mac.safari
                }
            }
        }
    } ()
    };
    return C
});