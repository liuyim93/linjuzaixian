<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pMenuButtonList.aspx.cs" Inherits="Friday.mvc.weblogin.roleMenu.pMenuButtonList" %>

<div class="page">
    <div class="pageContent">
 <form id="form1" runat="server">
 
    <div class="pageFormContent">
      <div id="left" class="left">
        <div class="panelBar">
            <ul id="dictree" class="toolBar">
                <li><a id="addata" class="add" href="roleMenu/AddMenu.aspx?code={dicCat}" target="dialog" rel="addmenu"><span>添加</span></a></li>
                <li><a class="delete" href="roleMenu/MenuButtonManage.aspx?flag=alldelete&code={dicCat}" target="navTabTodo" title="确定要删除吗?"><span>删除</span></a></li>
                <li><a class="edit" href="roleMenu/EditMenu.aspx?code={dicCat}" target="dialog" rel="editmenu"><span>修改</span></a></li> 
                <li class="line">line</li>
            </ul>
        </div>
         
         <div id="dtree" layoutH="57" class="lefttree">
         </div>
         </div>
       <div id="C_right" class="right"></div>
         
    </div>
</form> 
    </div>
</div>


<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        var dictree;

        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            debugger
            dictree = o.find("#dictree");
            o.ajax({
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
                        var tabid = $this.attr("rel") || "DataDic1";
                        o("li>a", dictree).each(function () {
                            var $this = $(this);
                            var href = $this.attr("href");
                            //$this.empty();
                            if ($this.data("ohref") == null)
                                $this.data("ohref", href);

                            //11.10号王一宁
                            if (item.hasChildren == false) {

                                $("ul li:eq(0)").attr({ target: "navTabTodo" });
                                $this.attr("href", $this.data("ohref").replace("{dicCat}", item.id));

                            }
                            else {
                                $("ul li:eq(0)").attr({ target: "dialog" });
                                $this.attr("href", $this.data("ohref").replace("{dicCat}", item.id));

                            }


                        });

                    }
                    d.theme = "bbit-tree-lines";

                    //点击触发事件
                    //$("#dtree", navTab.getCurrentPanel()).treeview(o);
                    gpage.jObj("dtree").treeview(d);
                }
            });
        });
    });
</script>
