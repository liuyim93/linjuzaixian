﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListSystemUser.aspx.cs" Inherits="Friday.mvc.weblogin.ListSystemUser" %>

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
        <table class="searchContent">
             <tr>
                <td>
                    <label>登录名:</label>
                    <input type="text" name="LoginName" class="textInput" value="<%=loginName %>"  />
                </td>
                <td>
                    <label>真实姓名:</label>
                    <input type="text" name="Name" class="textInput" value="<%=name %>" />
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

<div>
    <table class="table" layouth="200">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                     <tr>
                       <th width="40">序号</th> 
					    <th width="200">登录名</th> 
                        <th width="200">真实姓名</th> 
                        <th width="40">选择</th> 
                      </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate>                
                    <tr target="userid" rel="<%#Eval("Id")%>">
                        <td><%#Container.ItemIndex+1%></td>
					    <td><%#DataBinder.Eval(Container.DataItem, "LoginUser.LoginName")%></td>
					    <td><%#DataBinder.Eval(Container.DataItem, "Name")%></td>
                        <td>
				    <a class="btnSelect" href=javascript:$.bringBack({SystemUserID:'<%#DataBinder.Eval(Container.DataItem,"Id")%>',SystemUser:'<%#DataBinder.Eval(Container.DataItem,"LoginUser.LoginName")%>'}) title="查找带回">选择</a>
				        </td>				
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

<div id="jbsxBox3" class="pageFormContent" style="">
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