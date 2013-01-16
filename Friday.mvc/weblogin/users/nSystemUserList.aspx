<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nSystemUserList.aspx.cs"
    Inherits="Friday.mvc.weblogin.users.nSystemUserList" %>

<form id="pagerForm" action="SystemUserList.aspx" method="post" onsubmit="return navTabSearch(this);"
runat="server">
<input type="hidden" id="p" name="pageNum" value="1" />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>
<div class="pageHeader">
    <form rel="pagerForm" onsubmit="return navTabSearch(this);" action="MyOrderList.aspx"
    method="post">
    <div class="searchContent">
        <p>
            昵称：
            <input id="Name" type="text" name="Name" value="<%=name%>" />
            登陆名：
            <input id="LoginName" type="text" name="LoginName" value="<%=loginname%>" />
            密码：
            <input id="Password" type="text" name="Password" value="<%=password%>" />
            Tel：
            <input id="SystemUserTel" type="text" name="SystemUserTel" value="<%=tel%>" />
        </p>
        <p>
            邮箱：
            <input id="Email" type="text" name="Email" value="<%=email%>" />
            类 型
            <select name="Type" id="Type" runat="server">
                <option value="" selected="selected">不限</option>
                <option value="0">个人</option>
                <option value="1">企业</option>
            </select>
            地 址:
            <input id="Address" type="text" name="Address" value="<%=address%>" />
            账户状态
            <select name="Status" id="SystemUserStatus" runat="server">
                <option value="" selected="selected">不限</option>
                <option value="0">已注册</option>
                <option value="1">未注册</option>
            </select>
        </p>
    </div>
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
<div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li><a class="add" href="AddSystemUser.aspx" title="新增用户" target="dialog" rel="AddSystemUser"
                width="800" height="400"><span>添加</span></a></li>
            <li><a class="edit" href="EditSystemUser.aspx?uid={id}" title="修改用户" rel="EditSystemUser"
                target="dialog" width="800" height="650"><span>修改</span></a></li>
            <li><a class="delete" href="SystemUserList.aspx?flag=alldelete&uid={id}" target="navTabTodo"
                title="确定要删除吗?"><span>删除</span></a></li>
            <li class="line">line</li>
            <li><a class="edit" href="MyOrderList.aspx?systemuser_id={id}" title="我的订单" target="navTab"
                rel="MyOrderList"><span>我的订单</span></a></li>
            <li><a class="add" href="AddMyOrder.aspx?systemuser_id={id}" title="添加订单" target="dialog"
                rel="AddMyOrder"><span>添加订单</span></a></li>
            <li><a class="edit" href="FavoriteList.aspx?systemuser_id={id}" title="我的喜爱" target="navTab"
                rel="FavoriteList"><span>我的喜爱</span></a></li>
            <li><a class="edit" href="FeedBackList.aspx?systemuser_id={id}" title="我的反馈" target="navTab"
                rel="FeedBack"><span>我的反馈</span></a></li>
            <li class="line">line</li>
        </ul>
    </div>
    <table class="table" layouth="140">
        <asp:repeater id="repeater" runat="server">
                 <HeaderTemplate>
                 <thead>
                    <tr>
                        <th width="7%" align="center">序 号</th>
                       <th width="10%" align="center">昵称</th>
					   <th width="10%" align="center">登 录 名</th>
				<%---	   <th width="30%" align="center">所 属 企 业</th>--%>
					   <th width="10%" align="center">密 码</th>
					   <th width="10%" align="center">地 址</th>
                       <th width="10%" align="center">电话</th>
                       <th width="10%" align="center">邮 箱</th>
                       <th width="10%" align="center">用户类型</th>
                       <th width="10%" align="center">删除标记</th>
                       <th width="10%" align="center">创 建 时 间</th>
                    </tr>
                 </thead>
                 <tbody> 
                 </HeaderTemplate>
                 <ItemTemplate> 
                
                    <tr target="id" rel="<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
					     <td align="center"><%#DataBinder.Eval(Container.DataItem, "Name")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "LoginName")%></td>
					<%---    <td align="center"><%#DataBinder.Eval(Container.DataItem, "Company.CompanyName")%></td>--%> 
					     <td align="center"><%#DataBinder.Eval(Container.DataItem, "Password")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Address")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Tel")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Email")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "UserType")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "IsDelete")%></td>
                         <td><%#DataBinder.Eval(Container.DataItem, "CreateTime")%></td>
				    </tr>
			      
                </ItemTemplate>
         </asp:repeater>
        </tbody>
    </table>
    <div class="panelBar">
        <div class="pages">
            <span>显示</span>
            <select id="numPerPage" runat="server" onchange="navTabPageBreak({numPerPage:this.value})">
                <option value="10" selected="selected">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <span>条，共<%=total %>条</span>
        </div>
        <div class="pagination" targettype="navTab" totalcount="<%=total %>" numperpage="<%=numPerPage.Value %>"
            currentpage="<%=pageNum %>">
        </div>
    </div>
</div>
