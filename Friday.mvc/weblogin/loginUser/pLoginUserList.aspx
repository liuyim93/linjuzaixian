﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pLoginUserList.aspx.cs" Inherits="Friday.mvc.weblogin.pLoginUserList" %>

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
                    <input type="text" name="LoginName" class="textInput" value="<%=loginName%>"/>
                </td>
                <td>
                   <%--  <label>管理员:</label>
                   <select name="IsAdmin" id="IsAdmin" runat="server">
                    <option value="">请选择</option>
                    <option value="是">是</option>
                    <option value="否">否</option>
                    </select>--%>
                </td>
                 <td>
                             <p>
                    <label>
                        所属商家：</label>
                   
                     <input type="text" id="NameSet" size="35"  
                        runat="server" readonly="true" />  
                     <a class="btnLook" href="MultiListMerchant.aspx?IDSet={IDSet}&NameSet={NameSet}"  rel=""  lookupgroup="">
                   选择商家</a>       </p> <input type="hidden" id="IDSet" size="35"  
                    runat="server" readonly="true" />
           
            
                 <%--   <select name="UserType" id="UserType" runat="server">
                    <option value="">请选择</option>
                    <option value="管理员">管理员</option>
                    <option value="顾客">顾客</option>
                    <option value="商店">商店</option>
                    <option value="餐馆">餐馆</option>
                    <option value="租房">租房</option>
                    <option value="送货员">送货员</option>
                    <option value="商铺店小二">商铺店小二</option>
                    <option value="餐馆店小二">餐馆店小二</option>
                    <option value="租房店小二">租房店小二</option>
                    <option value="会员用户">会员用户</option>
                    </select>--%>
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
<div class="panelBar">
    <ul class="toolBar">
        <li><a class="add" href="loginUser/pAddLoginUser.aspx" title="添加用户" target="navTab" rel=""><span>
            添加用户</span></a></li>
        <li><a class="edit" href="loginUser/pEditLoginUser.aspx?uid={id}" title="修改用户" rel="" target="navTab">
            <span>修改用户</span></a></li>
        <li><a class="delete" href="loginUser/pResetPassword.aspx?uid={id}" title="密码重置" rel="" target="navTab">
        <span>密码重置</span></a></li>
        <li><a class="delete" href="loginUser/pLoginUserList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除用户</span></a></li>
            <li><a class="add" href="loginUser/pLoginUserList.aspx?flag=undelete&uid={id}"
            target="ajaxTodo" title="确定要恢复吗?"><span>恢复用户</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="LoginUserList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                    
                        <th width="10%" align="center">登录名</th>
                        <th width="10%" align="center">密码</th>
                        <th width="10%" align="center">删除标记</th>
                        <%--<th width="10%" align="center">管理员</th>
                        <th width="10%" align="center">用户类型</th>--%>
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="loginUser/pLoginUserDetail.aspx?uid=<%#Eval("Id")%>" prefix='<%=Request.Params["prefix"] %>'  target="ajax" rel_v3="jbsxBox3"><%#DataBinder.Eval(Container.DataItem, "LoginName")%>
                            </a></td>
                   
                        <td><%#DataBinder.Eval(Container.DataItem, "Password")%></td>
                         <td><%#DataBinder.Eval(Container.DataItem, "IsDelete")%></td>
                   <%--     <td align="center"><%#(DataBinder.Eval(Container.DataItem, "IsAdmin").ToString()=="True")?"是":"否"%></td>      --%>                   
                        <%--<td align="center"><%#friday.core.components.EnumDescription.GetFieldText(DataBinder.Eval(Container.DataItem, "UserType"))%></td>              
				         <td><%#DataBinder.Eval(Container.DataItem, "UserInRole.ID")%></td> --%> 
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
//            //debugger
             o.find("#LoginUserList table:eq(1) tr").click(function (e) {
                if (!$(e.target).is("a")) {
                    $(this).find("td a").trigger("click");
                }
            });
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

