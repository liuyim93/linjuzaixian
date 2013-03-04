KISSY.add("login/AudioCheckCode", function (_kissy) {
    var _dom = _kissy.DOM;
    var AudioCheckCode = function (_options) {
        this.url = _options.url || "";
        this.input = _options.input && _kissy.one(_options.input);
        this.handle = _options.handle && _kissy.one(_options.handle);
        this.player = null
    };
    var AudioCheckCode_Wrapper = function (_options) {
        return new AudioCheckCode(_options)
    };
    _kissy.augment(AudioCheckCode, { init: function () {
        if (!this.url || !this.input || !this.handle) {
            return this
        }
        var _audiocheckcode = this;
        this.handle.on("click", function (F) {
            F.halt();
            _audiocheckcode.play();
            _kissy.later(function () {
                _audiocheckcode.input[0].focus()
            }, 10)
        })
    }, playHTML: function () {
        var _audio_snippet_function;
        var _browser = navigator.userAgent.indexOf("Windows") != -1;
        try {
            _audio_snippet_function = ("Audio" in window && (new Audio()).canPlayType("audio/x-wav;")) ? function () {
                return "<audio autoplay hidden></audio>"
            } : (_kissy.UA.ie ? function () {
                return "<bgsound></bgsound>"
            } : function () {
                return "<embed " + (_browser ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + ' autostart="true" hidden="true" />'
            })
        } catch (G) {
            _audio_snippet_function = _kissy.UA.ie ? function () {
                return "<bgsound></bgsound>"
            } : function () {
                return "<embed " + (_browser ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + ' autostart="true" hidden="true" />'
            }
        }
        this.playHTML = _audio_snippet_function;
        return _audio_snippet_function()
    }, play: function () {
        this.player && this.player.parentNode.removeChild(this.player);
        this.player = _dom.create(this.playHTML(), { src: this.url + "&t=" + new Date().getTime() });
        _dom.append(this.player, document.body || document.documentElement)
    }
    });
    return AudioCheckCode_Wrapper
});