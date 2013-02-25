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
<div class="panel" defh="400" style="float:left; display:block; overflow:auto; width:240px;margin:2px; border:solid 1px #CCC; line-height:21px; background:#fff">
    <h1>
        功能模块</h1>
    <div id="tree">
    </div>
</div>
<div id="jbsxBox3" class="pageFormContent" style="margin-left:546px;">

</div>
<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            debugger
            var $tree = o.find("#tree");
            var $form = o.find("#form");
            var _url = $form.attr("action") + "/list?t=" + (new Date().getTime());
            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: _url,
                data: "{'nvls':[{'name':'id','value':'0'}]}",

                dataType: "json",
                success: function (data) {
                    var o = { showcheck: false };
                    var da = eval("(" + data.d + ")");
                    o.data = da;
                    o.theme = "bbit-tree-lines";
                    $tree.treeview(o);
                }
            });



            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>
