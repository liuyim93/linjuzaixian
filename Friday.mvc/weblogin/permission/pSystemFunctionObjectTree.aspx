<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemFunctionObjectTree.aspx.cs" Inherits="Friday.mvc.weblogin.pSystemFunctionObjectTree" %>


<div class="panel" defh="75">
    <h1>
        查询条件</h1>
    <div class="searchBar">
        <form id="form" method="post" runat="server">
        <table class="searchContent">
             <tr>
                <td>
                    <label>功能模块名:</label>
                    <input type="text" name="Name" class="textInput" value=""  />
                </td>
             </tr>
             <tr>
                <td>
                    <label>备注:</label>
                    <input type="text" name="Description" class="textInput" value="" />
                </td>
            </tr>
        </table>
        <div class="subBar">
            <ul>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button type="submit" id="Ss" onclick="alertMsg.correct('查询成功！')">
                                搜索</button></div>
                    </div>
                </li>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button type="reset">
                                重置</button></div>
                    </div>
                </li>
            </ul>
        </div>
        </form>
    </div>
</div>

<div class="divider">
</div>
<div class="panel" defh="600" style="float:left; display:block; overflow:auto; width:200px;margin:2px; border:solid 1px #CCC; line-height:21px; background:#fff">
    <h1>
        功能模块</h1>
    <div id="tree">
    </div>
</div>
<div id="jbsxBox3"  style="margin-left:203px;padding:3px 2px">

</div>
<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        var rawurl = '<%=Request.Path%>';
        var query = '<%=Request.Url.Query%>';
        debugger
        var node_click_url = "permission/pSystemFunctionObjectDetail.aspx";
        query = query.replace(/\?/, "&").replace(/uid/i,"rid");
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            debugger
            var $tree = o.find("#tree");
            var $form = o.find("#form");
            var rel_v3 = "#jbsxBox3";
            var $rel = o.find(rel_v3);
            var _url = rawurl + "/list?t=" + (new Date().getTime());
            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: _url,
                data: "{'nvls':[{'name':'id','value':'0'}]}",
                dataType: "json",
                success: function (data) {
                    var o = { showcheck: false };
                    var da = eval("(" + data.d + ")");
                    o.url = _url;
                    o.data = da;
                    o.onnodeclick = function navi(item) {
                        if (!item.hasChildren) {
                            var data = { prefix: prefix, "rel_v3": rel_v3 };
                            $rel.loadUrl(node_click_url + "?uid=" + item.id + query, data, function () {
                                $rel.find("[layoutH]").layoutH();
                            });
                        }
                    }
                    o.theme = "bbit-tree-lines";
                    $tree.treeview(o);
                }
            });



            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>
