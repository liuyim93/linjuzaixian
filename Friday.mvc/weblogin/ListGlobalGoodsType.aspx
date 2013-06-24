<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListGlobalGoodsType.aspx.cs"
    Inherits="Friday.mvc.weblogin.ListGlobalGoodsType" %>

<div class="pageFormContent">
    <form id="Form1" method="post" runat="server" class="pageForm required-validate">
    <div class="panel" defh="270" style="display: block; overflow: auto; width: 790px;
        margin: 2px; border: solid 1px #CCC; line-height: 21px; background: #fff">
        <div id="divTree">
        </div>
        <div class="formBar">
            <ul>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button id="btnSave" type="button">
                                保存</button></div>
                    </div>
                </li>
                <li>
                    <div class="button">
                        <div class="buttonContent">
                            <button class="close" value="关闭">
                                取消</button></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </form>
</div>
<script type="text/javascript">
    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {

            var dtree;
            var oObj;
            var a;

            dtree = o.find("#divTree");
            //a = o.find("#btnSave a");
            saveBtn = o.find("#btnSave");
            //oObj = o;
            var tree_selected_id = o.find("#tree_selected_id");
            if (tree_selected_id.length == 0)
                tree_selected_id = $("<input type='hidden' id='tree_selected_id' />").appendTo(o);

            var tree_selected_text = o.find("#tree_selected_text");
            if (tree_selected_text.length == 0)
                tree_selected_text = $("<input type='hidden' id='tree_selected_text' />").appendTo(o);

            //            saveBtn.click(function (event) {
            //             if (saveBtn.attr("href") == "" || saveBtn.attr("href") == undefined) {
            //                 alertMsg.error('请选择商品类型！');
            //                return false;
            //                }
            //             });

            /*a.click(function (event) {
            if (a.attr("href") == "" || a.attr("href") == undefined) {
            alertMsg.error('请选择商品类型！');
            return false;
            }
            });*/
            saveBtn.click(function () {
                $.bringBack({ GoodsType: tree_selected_text.val(), GoodsTypeID: tree_selected_id.val() });
            });
            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: "globalGoodsType/pGlobalGoodsTypeList.aspx/GetGlobalGoodsType?t=" + (new Date().getTime()),
                data: "{'nvls':[{'name':'id','value':'0'}]}",
                dataType: "json",
                success: function (data) {
                    //debugger
                    var d = { showcheck: false };
                    var da = eval("(" + data.d + ")");
                    d.data = da;
                    d.cascadecheck = false;
                    d.theme = "bbit-tree-lines";
                    d.onnodeclick = function navi(item) {

                        //a.attr("href", "javascript:$.bringBack({GoodsType:'" + item.text + "',GoodsTypeID:'" + item.id + "'})");
                        tree_selected_id.val(item.id);
                        tree_selected_text.val(item.text);
                    };

                    //点击触发事件
                    //$("#dtree", navTab.getCurrentPanel()).treeview(o);
                    dtree.treeview(d);
                }
            });
            o = null;
        });
    });
</script>
