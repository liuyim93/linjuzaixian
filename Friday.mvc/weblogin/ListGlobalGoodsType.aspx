<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListGlobalGoodsType.aspx.cs" Inherits="Friday.mvc.weblogin.ListGlobalGoodsType" %>

<div class="pageFormContent">
    <form id="Form1" method="post" runat="server"  class="pageForm required-validate">
	<div class="panel collapse">
			<div id="divTree">    
            </div> 
            <div class="formBar">
				    <ul> 
					    <li><div class="buttonActive"><div class="buttonContent"><button id="btnSave" type="button"><a style="text-decoration:none" href="" >保存</a></button></div></div></li>
					    <li>
						    <div class="button"><div class="buttonContent"><button class="close" value="关闭">取消</button></div></div>
					    </li>
				    </ul>
			</div>
	    </div>
    </form>
</div>

<script   type="text/javascript">
    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {

            var dtree;
            var oObj;
            var a;

            dtree = o.find("#divTree");
            a = o.find("#btnSave a");
            oObj = o;

            a.click(function (event) {
                if (a.attr("href") == "" || a.attr("href") == undefined) {
                    alertMsg.error('请选择商品类型！');
                    return false;
                }
            });

            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: "globalGoodsType/pGlobalGoodsTypeList.aspx/GetGlobalGoodsType?t=" + (new Date().getTime()),
                data: "{'nvls':[{'name':'id','value':'0'}]}",
                dataType: "json",
                success: function (data) {
                    debugger
                    var d = { showcheck: false };
                    var da = eval("(" + data.d + ")");
                    d.data = da;
                    d.cascadecheck = false;
                    d.theme = "bbit-tree-lines";
                    d.onnodeclick = function navi(item) {

                        a.attr("href", "javascript:$.bringBack({GoodsType:'" + item.text + "',GoodsTypeID:'" + item.id + "'})");

                    }
                    //点击触发事件
                    //$("#dtree", navTab.getCurrentPanel()).treeview(o);
                    dtree.treeview(d);
                }
            });
            o = null;
        });
    });
 </script>