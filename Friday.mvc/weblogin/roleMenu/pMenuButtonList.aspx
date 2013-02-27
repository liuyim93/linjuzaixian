<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pMenuButtonList.aspx.cs" Inherits="Friday.mvc.weblogin.roleMenu.pMenuButtonList" %>

<form id="pagerForm" action="#rel#">
</form>
<div class="panel" defh="50">

    <div class="searchBar">
        <form id="form" rel="pagerForm" method="post" runat="server">
        </form>
    </div>
</div>

<div class="page">
    <div class="pageContent"> 
    <div class="pageFormContent">
      <div id="left" class="left">
        <div class="panelBar">
            <ul id="dictreeToolBar" class="toolBar">
                <li><a id="addata" class="add" href="roleMenu/pAddMenuButton.aspx?flag=save&code={dicCat}" target="dialog" rel=""><span>添加</span></a></li>
                <li><a class="delete" href="roleMenu/pMenuButtonList.aspx?flag=alldelete&code={dicCat}" target="ajaxTodo" title="确定要删除吗?"><span>删除</span></a></li>
                <li><a class="edit" href="roleMenu/pEditMenuButton.aspx?flag=save&code={dicCat}" target="dialog" rel=""><span>修改</span></a></li> 
                <li class="line">line</li>
            </ul>
        </div>
         
         <div id="dtree" layoutH="57" class="lefttree">
         </div>
         </div>
       <div id="C_right" class="right"></div>
         
    </div>
    </div>
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

        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            debugger

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
                url: "roleMenu/pMenuButtonList.aspx/GetSystemMenu?t=" + (new Date().getTime()),
                data: "{'nvls':[{'name':'id','value':'0'}]}",
                dataType: "json",
                success: function (data) {
                    var d = { showcheck: false };
                    var da = eval("(" + data.d + ")");
                    d.data = da;
                    d.url = "roleMenu/pMenuButtonList.aspx/GetSystemMenu?t=" + (new Date().getTime());

                    d.onnodeclick = function navi(item) {
                        var $this = $(this);
                        $("li>a", dictreeToolBar).each(function () {
                            var $this = $(this);
                            var href = $this.attr("href");
                            //$this.empty();
                            if ($this.data("ohref") == null)
                                $this.data("ohref", href);

                            if (item.hasChildren == false) {
                                $this.attr("href", $this.data("ohref").replace("{dicCat}", item.id));
                            }
                            else {

                                $this.attr("href", $this.data("ohref").replace("{dicCat}", item.id));
                            }
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
