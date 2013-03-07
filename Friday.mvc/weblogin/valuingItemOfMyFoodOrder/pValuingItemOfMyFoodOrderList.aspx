﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pValuingItemOfMyFoodOrderList.aspx.cs" Inherits="Friday.mvc.weblogin.valuingItemOfMyFoodOrder.pValuingItemOfMyFoodOrderList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>
<div class="panel collapse" defh="75">
    <h1>
        查询条件</h1>
    <div class="searchBar">
        <form id="form" rel="pagerForm" method="post" runat="server">
        </form>
    </div>
</div>
<div class="panelBar">
    <ul class="toolBar">
        <li><a class="add" href="valuingItemOfMyFoodOrder/pAddValuingItemOfMyFoodOrder.aspx" title="添加食品评价项" target="navTab" rel=""><span>
            添加食品评价项</span></a></li>
        <li  id="liEdit" runat="server"><a class="edit" href="valuingItemOfMyFoodOrder/pEditValuingItemOfMyFoodOrder.aspx?uid={id}" title="修改食品评价项" rel="" target="navTab">
            <span>修改食品评价项</span></a></li>
        <li id="liDelete" runat="server"><a class="delete" href="valuingItemOfMyFoodOrder/pValuingItemOfMyFoodOrderList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除食品评价项</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="ValuingItemOfMyFoodOrderList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                    <th width="10%" align="center">评价项名称</th>

                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td align="center"><%#Eval("ValuingItemName")%></td>
				</tr>
			      
            </ItemTemplate>
        </asp:repeater>
        </tbody>
    </table>
</div>
<div class="panelBar">
    <div class="pages">
        <span>显示</span>
        <select id="numPerPage" runat="server">
            <option value="10" selected="selected">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
        <span>条，共<%=total %>条</span>
    </div>
    <div class="pagination"  totalcount="<%=total %>"
        numperpage="<%=numPerPage.Value %>" currentpage="<%=pageNum %>">
    </div>
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

            var target_type = $.get_target_type(prefix);
            if (/navtab/i.test(target_type)) {
                o.find("#form").bind("submit", function (e) {
                    return navTabSearch(this);
                });
                o.find("#numPerPage").bind("change", function (e) {
                    navTabPageBreak({ numPerPage: this.value });
                });
            }
            else {
                o.find("#form").bind("submit", function (e) {
                    return dialogSearch(this);
                });
                o.find("#numPerPage").bind("change", function (e) {
                    dialogPageBreak({ numPerPage: this.value });
                });
            }

            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>
