﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pShopList.aspx.cs" Inherits="Friday.mvc.weblogin.shop.pShopList" %>


<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="1" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" /> 

</form>


<div class="pageHeader">
	<form rel="pagerForm" onsubmit="return divSearch(this,'jbsxBox2');" action="Shop/pShopList.aspx" method="post">
	<div class="searchBar">
		<table class="searchContent">
			<tr>
				<td>起始日期:
                    <input id="Text1" type="text" name="StartDate"  class="date textInput readonly" readonly="true" value="" />                 
				</td>
				<td>
					 截止日期:
                    <input id="Text2" type="text" name="EndDate"  class="date textInput readonly" readonly="true" value="" />
                    
				</td>
			</tr>
		</table>
		<div class="subBar">
			 <ul>
                    <li>
                        <div class="buttonActive">
                            <div class="buttonContent">
                                <button type="submit" id="Button1" onclick="alertMsg.correct('查询成功！')">
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
	</div>
	</form>
</div>

<div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li><a class="edit" href="nShopUpdate.aspx?uid={id}" title="修改商铺" rel="" target="navTab">
                <span>修改</span></a></li>
            <li><a class="delete" href="MyOrderList.aspx?flag=alldelete&uid={id}"
                target="navTabTodo" title="确定要删除吗?"><span>删除</span></a></li>
            <l<li><a class="add" href="OrderFoodList.aspx?myOrder_id={id}" title="订单详情" target="dialog" rel="">
                <span>订单详情</span></a></li> 
            <li class="line">line</li>
        </ul>
    </div>
    <table class="table" layouth="400">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                        <th width="10%" align="center">商铺编号</th>
                    <th width="10%" align="center">联系人姓名</th>
                    <th width="10%" align="center">email</th>
                        <th width="15%" align="center">配送地址</th>
                        <th width="10%" align="center">距离</th>
                        <th width="10%" align="center">折扣</th>
                        <th width="10%" align="center">创建时间</th>
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="OrderFood/pOrderFoodList.aspx" target="ajax" rel-v3="jbsxBox"><%#Eval("Id")%>
                            </a>
                        </td>
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Owener")%></td>
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Email")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Address")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Distance")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Rate")%></td>  
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "CreateTime")%></td>                      
				</tr>
			      
            </ItemTemplate>
        </asp:repeater>
        </tbody>
    </table>
        
        
    <div class="panelBar">
        <div class="pages">
            <span>显示</span>
            <select id="numPerPage" runat="server" onchange="navTabPageBreak({numPerPage:this.value},'jbsxBox2')">
                <option value="10" selected="selected">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <span>条，共<%=total %>条</span>
        </div>
        <div class="pagination" targettype="navTab" rel="jbsxBox2" totalcount="<%=total %>" numperpage="<%=numPerPage.Value %>"
            currentpage="<%=pageNum %>">
        </div>
    </div>

</div>