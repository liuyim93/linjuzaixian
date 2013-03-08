<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pRoleInMenuPermission.aspx.cs"
    Inherits="Friday.mvc.weblogin.permission.pRoleInMenuPermission" %>

<input type="hidden" id="hdnrid" value="<%=HttpContext.Current.Request.Params["uid"]%>" />
<div class="panel" defh="75">
    <h1>
        查询条件</h1>
    <div class="searchBar">
        <form id="form" method="post" runat="server">
        <table class="searchContent">
            <tr>
                <td>
                    <label>
                        功能模块名:</label>
                    <input type="text" name="Name" class="textInput" value="" />
                </td>
            </tr>
            <tr>
                <td>
                    <label>
                        备注:</label>
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
<div style="float: left; display: block; overflow: auto; width: 100%; margin: 2px;
    border: solid 1px #CCC; line-height: 21px; background: #fff">
    <div class="panel" defh="400">
        <h1>
            （<%=Request.Params["roleName"]%>）菜单权限模块</h1>
        <div id="divTree">
        </div>
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
        </ul>
    </div>
</div>
<div id="jbsxBox3" style="margin-left: 203px; padding: 3px 2px">
</div>
<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';

        debugger

        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            debugger
            var $divTree = o.find("#divTree");
            var $form = o.find("#form");

            var rid = o.find("#hdnrid").val();

            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: "permission/menu/pRoleInMenuPermission.aspx/GetMenuListForRole?t=" + (new Date().getTime()),
                data: "{'nvls':[{'name':'id','value':'0'},{'name':'rid','value':'" + rid + "'}]}",

                dataType: "json",
                success: function (data) {
                    var d = { showcheck: true };
                    var da = eval("(" + data.d + ")");
                    d.data = da;
                    d.theme = "bbit-tree-lines";
                    $divTree.treeview(d);
                }
            });

            o.find("#btnSave").bind("click", function () {
                var result = [];
                var ht = $divTree.getTSNs(true);
                var j = $divTree.getTSNs(true).length;
                for (var i = 0; i < j; i++) {
                    var t = ht[i].id;
                    result.push(t);
                }

                $.ajax({
                    type: "POST",
                    contentType: 'application/json; charset=utf-8',
                    url: "permission/menu/pRoleInMenuPermission.aspx/SaveRoleInMenu?t=" + (new Date().getTime()),
                    data: "{'menuid':'" + result + "','roleid':'" + rid + "'}",
                    dataType: "json",
                    success: function (data) {
                        alertMsg.correct("保存成功！");
                    }
                });
            });

            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });
    });
</script>
