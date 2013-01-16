/*
基于jQuery的表单验证插件
author : Snryang
Date   : 2008-10-24 10:28:00
blog   : http://snryang.cnblogs.com
修改历史：
2008-11-18 start方法时，当value 为Number则需要将它转换为String 才能进行trim();
*/

jQuery.formValidator = {
    ids: [],
    init: function(o) {
        if (!o) return;
        return this.each(
            function() {
                var el = this;
                var jel = jQuery(this);
                jQuery.formValidator.argInit.apply(this, [o]);
                jel.after("<img src='/Images/FVerror.gif' id='" + el.fvCfg.imgId + "' style='display:none'/>");
                jel.bind('blur', jQuery.formValidator.start);
                //                jel.bind('blur', function() {
                //                    if (!jQuery.formValidator.start()) {
                //                        $.cursorMessage(el.fvCfg.msg, { hideTimeout: 1500 });
                //                    }
                //                });
                jQuery.formValidator.ids.push(el);
            }
        );
    },
    argInit: function(o) {
        //验证配置初始化
        this.fvCfg = {
            imgId: this.id + "error",
            group: o.group || o.G || "",
            msg: o.msg || o.M || "",
            empty: o.empty || o.E || false,
            V: o.V || o.valid || null
        };
    },
    start: function(value) {

        if (this.fvCfg.V == null) return;
        if (this.tagName == "INPUT" || this.tagName == "TEXTAREA")
            value = this.value;
        value = value.toString().trim().replace(/\r\n/g, ''); //替换掉首尾空格与中间的换行符 NtoS
        var flag = true;
        if (this.fvCfg.V.constructor == Object) {
            this.fvCfg.P = this.fvCfg.V.P;
            flag = eval("jQuery.formValidator." + this.fvCfg.V.T + ".apply(this,[\"" + value + "\"])");
        }
        else if (this.fvCfg.V.constructor == Array) {
            for (var i in this.fvCfg.V) {
                this.fvCfg.P = this.fvCfg.V[i].P
                flag = eval("jQuery.formValidator." + this.fvCfg.V[i].T + ".apply(this,[\"" + value + "\"])");
                if (!flag) break;
            }
        }
        flag = !flag ? (this.fvCfg.empty ? (value == "" ? true : false) : false) : true;
        var msgControl = jQuery("#" + this.fvCfg.imgId);
        if (msgControl.length > 0) {
            msgControl.attr("title", this.fvCfg.msg);
            flag ? msgControl.hide() : msgControl.show();
        }
        //return flag;
        return flag ? "" : this.fvCfg.msg;
    },
    I: function(value) {
        var P = this.fvCfg.P;
        var T = P.type || P.T || "S";
        var min = P.min || 0;
        var max = P.max || 1000;
        if (T.toUpperCase() == "N") {
            if (this.fvCfg.msg == "") this.fvCfg.msg = "数字应当大于等于[ " + min + " ]并且小于等于[ " + max + " ]";
            return (Number(value) >= min && Number(value) <= max) ? true : false;
        }
        else {
            if (this.fvCfg.msg == "") this.fvCfg.msg = "字符串长度应当大于等于[ " + min + " ]并且小于等于[ " + max + " ]";
            return (value.length >= min && value.length <= max) ? true : false;
        }
    },
    C: function(value) {
        var id = this.fvCfg.P;
        return jQuery("#" + id).val() == value ? true : false;
    },
    R: function(value) {
        var P = this.fvCfg.P;
        var regexp = (P.constructor != Object) ? P : P.regexp || P.R;
        var I = P.I || false;
        var re = regexp.constructor == RegExp ? regexp : I ? new RegExp(regexp) : new RegExp(regexp, "i");
        return re.test(value);
    },
    F: function(value) {
        return (this.fvCfg.P.constructor == Function) ? this.fvCfg.P.apply(this, [value]) : false;
    },
    PageIsValid: function(group) {
        var valid = true;
        var msg = "";
        var G = group || "";
        var flag;
        jQuery.each(jQuery.formValidator.ids, function(i, e) {
            if (G == e.fvCfg.group || G == "") {
                tMsg = jQuery.formValidator.start.apply(e)
                if (tMsg != "") {
                    msg += tMsg + "\n";
                }
                if (msg != '') valid = false;
            }
        });
        //return valid;
        return msg;
    }
};

jQuery.fn.extend(
	{
		FV : jQuery.formValidator.init,
		PageIsValid : jQuery.formValidator.PageIsValid
	}
);

var regexEnum = 
{
	intege:"^-?[1-9]\\d*$",					//整数
	intege1:"^[1-9]\\d*$",					//正整数
	intege2:"^-[1-9]\\d*$",					//负整数
	num:"^([+-]?)\\d*\\.?\\d+$",			//数字
	num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
	num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
	decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
	decmal1:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",　　	//正浮点数
	decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",　 //负浮点数
	decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",　 //浮点数
	decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",　　 //非负浮点数（正浮点数 + 0）
	decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",　　//非正浮点数（负浮点数 + 0）

	email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	color:"^[a-fA-F0-9]{6}$",				//颜色
	url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
	ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
	zipcode:"^\\d{6}$",						//邮编
	mobile:"^(13|15)[0-9]{9}$",				//手机
	ip4:"^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).(d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$",				//ip地址
	notempty:"^\\S+$",						//非空
	picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
	date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
	qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
	tel:"(\\d{3}-|\\d{4}-)?(\\d{8}|\\d{7})",	//国内电话
	username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter:"^[A-Za-z]+$",					//字母
	letter_u:"^[A-Z]+$",					//大写字母
	letter_l:"^[a-z]+$",					//小写字母
	idcard:"^[1-9]([0-9]{14}|[0-9]{17})$"	//身份证
}
