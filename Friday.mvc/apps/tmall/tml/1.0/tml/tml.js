(function () {
    var _str_tml = "tml", _str_kissy = "kissy";
    function _add_tml_prefix_namespace(_raw_requires_array) {
        //2013-03-04 basilwang copy and return new  array
        var index, _single_require, _copied_raw_requires_array = _raw_requires_array.concat([]);
        for (index = 0; _single_require = _copied_raw_requires_array[index]; index++) {
            _single_require = _single_require.split("/");
            if (_single_require[0] == _str_kissy) {
                _single_require.splice(0, 1);
                _copied_raw_requires_array[index] = _single_require.join("/")
            } else {
                if (_single_require[0] !== ".") {
                    _copied_raw_requires_array[index] = _str_tml + "/" + _single_require.join("/")
                }
            }
        }
        return _copied_raw_requires_array
    }
    window.TML = { add: function (_name, _fn, _config) {
        if (_config && _config.requires) {
            if (typeof _config.requires === "string") {
                _config.requires = [_config.requires]
            }
            _config.requires = _add_tml_prefix_namespace(_config.requires)
        }
        KISSY.add(_str_tml + "/" + _name, function () {
            var _argument_list_for_apply = [TML], _index;
            for (_index = 1; _index < arguments.length; _index++) {
                _argument_list_for_apply.push(arguments[_index])
            }
            return _fn.apply(this, _argument_list_for_apply)
        }, _config)
    }, use: function (_requires, _fn) {
        _requires = _add_tml_prefix_namespace(_requires.split(","));
        KISSY.use(_requires.join(","), function () {
            var _argument_list_for_apply = [TML], _index;
            for (_index = 1; _index < arguments.length; _index++) {
                _argument_list_for_apply.push(arguments[_index])
            }
            return _fn.apply(this, _argument_list_for_apply)
        })
    }, version: "1.0"
    };
    KISSY.config && KISSY.config({ packages: [{ name: "tml", tag: "20121030", path: "/apps/tmall/tml/1.0/", charset: "utf-8"}] })
})();
