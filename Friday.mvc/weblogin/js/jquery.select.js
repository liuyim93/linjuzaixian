//作者：亮亮
//博客：http://www.94this.com.cn
//欢迎交流，有什么问题请留言
$.fn.slt = function(obj) {

    var iptName;
    $(this).click(clk);
    function clk() {
        $("#liandong_select ul li").die();
        $("#liandong_select").remove();
        iptName = $(this).attr("id");
        var iptOffSet = $(this).offset();
        var iptLeft = iptOffSet.left;
        var iptTop = iptOffSet.top + 20;
        var str = "<div id='liandong_select'><span>请选择<a id='fh'>返回上层</a><a id='gb'>[关闭]</a></span><ul></ul><div style='clear:both;'></div></div>";
        areasLen = obj.length;
        var str2 = "";
        for (var i = 0; i < areasLen; i++) {
            str2 = str2 + "<li id='p" + obj[i].Key.companyID + "'>" + obj[i].Key.companyName + "</li>";
        }
        $("body").append(str);
        $("#liandong_select ul").append(str2);
        $("#liandong_select").css({ left: iptLeft + "px", top: iptTop + "px" });
        $("#liandong_select span a#fh").bind("click", function() {
            $("#liandong_select ul").empty();
            $("#liandong_select ul").append(str2);
        });
        $("#liandong_select span a#gb").bind("click", function() {
            $("#liandong_select").remove();
        });
        $("#liandong_select ul li").live("click", liBind);
    }
    function liBind() {
        var liId = $(this).attr("id");
        var liText = $(this).text();
        var newSet = $.grep(obj, function(s, j) { return s.Key.companyName == liText; })[0];
        
        if (newSet == undefined || newSet == "") {
            $("#" + iptName).val(liText);
            $("#liandong_select").css("display", "none");
        }
        else {
            var newArrVal = newSet.Value;
            listr = "";
            pLen = newArrVal.length;
            for (j = 0; j < pLen; j++) {
//                if ("p" + newSet.Key.companyID == liId) {
//                    listr = listr + "<li id='p" + newArrVal[j] + "' onclick=setVal('" + newArrVal[j] + "','" + iptName + "');>" + newArrVal[j] + "</li>";
//                }
               // else 
                listr = listr + "<li id='p" + newArrVal[j] + "'>" + newArrVal[j] + "</li>";
            }
            $("#liandong_select ul").empty();
            $("#liandong_select ul").append(listr);
        }
    }
};
function setVal(idli,ipt){

	$("#"+ipt).val(idli);
	$("#liandong_select").css("display","none");
}