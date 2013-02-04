﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pActivityList.aspx.cs" Inherits="Friday.mvc.weblogin.activity.pActivityList" %>


<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="1" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" /> 

</form>


<div class="pageHeader">
	<form rel="pagerForm" onsubmit="return divSearch(this,'jbsxBox2');" action="Activity/pActivityList.aspx" method="post">
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
            <li><a class="add" href="nActivityAdd.aspx" title="添加商铺" target="navTab" rel="">
                <span>添加</span></a></li> 
            <li><a class="edit" href="nActivityUpdate.aspx?uid={id}" title="修改商铺" rel="" target="navTab">
                <span>修改</span></a></li>
            <li><a class="delete" href="activity/pActivityList.aspx?flag=alldelete&uid={id}"  target="ajaxTodo" title="确定要删除吗?" >
                <span>删除</span></a></li>
        
            <li class="line">line</li>
        </ul>
    </div>
    <div id="activityList">
    <table class="table" layouth="400">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                    <th width="10%" align="center">活动编号</th>
                    <th width="10%" align="center">发布时间</th>
                    <th width="20%" align="center">活动名称</th>
                    <th width="20%" align="center">活动重要性</th>
                    <th width="30%" align="center">活动内容</th>
                <%--    <th width="10%" align="center">距离</th>
                        <th width="10%" align="center">折扣</th>--%>
                       
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="activity/pActivityDetail.aspx?uid=<%#Eval("Id")%>" prefix='<%=Request.Params["prefix"] %>' target="ajax" rel-v3="jbsxBox"><%#Eval("Id")%>
                            </a>
                        </td>
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "CreateTime")%></td>
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Name")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Matters")%></td> 
                       <td align="center"><%#DataBinder.Eval(Container.DataItem, "Description")%></td>     
                <%--        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Distance")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Rate")%></td>  --%>
                           
				</tr>
			      
            </ItemTemplate>
        </asp:repeater>
        </tbody>
    </table>
    </div>    
        
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

<script type="text/javascript">

    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $self.one("panelloaded", function (e) {
            $self.find("#activityList table:eq(1) tr").click(function (e) {
                if (!$(e.target).is("a")) {
                    $(this).find("td a").trigger("click");
                }

            });

        });


    });
</script>