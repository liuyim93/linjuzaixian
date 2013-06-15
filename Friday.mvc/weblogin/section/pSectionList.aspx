<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSectionList.aspx.cs" Inherits="Friday.mvc.weblogin.pSectionList" %>

<form id="pagerForm" action="#rel#">
</form>
<div class="panel" defh="50">
    <div class="searchBar">
        <form id="form" rel="pagerForm" method="post" runat="server">
        </form>
    </div>
</div>

<div class="panelBar">
    <ul id="dictreeToolBar" class="toolBar">
        <li><a id="addata" class="add" href="section/pAddSection.aspx?flag=save&code=" target="dialog" rel=""><span>添加</span></a></li>
        <li id="liDelete" runat="server"><a class="delete" href="section/pSectionList.aspx?flag=alldelete&code=" target="ajaxTodo" title="确定要删除吗?"><span>删除</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
 
<div class="panel" defh="500" style="float:left; display:block; overflow:auto; width:400px;margin:2px; border:solid 1px #CCC; line-height:21px; background:#fff">      
    <div id="dtree" >
    </div>
</div>  
<div id="jbsxBox3"  style="margin-left:403px;padding:3px 2px" class="pageFormContent">
</div>

<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document

        var dtree;
        var oObj;
        var dictreeToolBar;
        var rel_v3 = "#jbsxBox3";
        var $rel;

        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            debugger

            var node_click_url = "section/pEditSection.aspx";

            $rel = o.find(rel_v3);

            var target_type = $.get_target_type(prefix);
            if (/navtab/i.test(target_type)) {
                o.find("#form").bind("submit", function (e) {
                    return navTabSearch(this);
                });
            }
            else {
                o.find("#form").bind("submit", function (e) {
                    return dialogSearch(this);
                });
            }

            dtree = o.find("#dtree");
            dictreeToolBar = o.find("#dictreeToolBar");
            oObj = o;
            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: "section/pSectionList.aspx/GetSection?t=" + (new Date().getTime()),
                data: "{'nvls':[{'name':'id','value':'0'}]}",
                dataType: "json",
                success: function (data) {
                    var d = { showcheck: false };
                    var da = eval("(" + data.d + ")");
                    d.data = da;
                    //2013-02-27 basilwang block this, otherwise will call twice and the last one without nvls para
                    //d.url = "section/pSectionList.aspx/GetSection?t=" + (new Date().getTime());
                    d.onnodeclick = function navi(item) {
                        $("li>a", dictreeToolBar).each(function () {
                            var $this = $(this);
                            var href = $this.attr("href");
                            if ($this.data("ohref") == null)
                                $this.data("ohref", href);

                            $this.attr("href", $this.data("ohref").replace("code=", "code=" + item.id));

                            var data = { prefix: prefix, "rel_v3": rel_v3 };
                            $rel.loadUrl(node_click_url + "?code=" + item.id, data, function () { });

                        });
                    }
                    d.theme = "bbit-tree-lines";

                    //点击触发事件
                    //$("#dtree", navTab.getCurrentPanel()).treeview(o);
                    dtree.treeview(d);
                }
            });

            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });
    });
</script>
