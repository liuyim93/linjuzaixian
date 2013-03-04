<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pMyHouseOrderList.aspx.cs" Inherits="Friday.mvc.weblogin.pMyHouseOrderList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
<input type="hidden" name="orderField" value='<%=Request.Params["orderField"] %>' /><!--【可选】查询排序-->
<input type="hidden" name="orderDirection" value='<%=Request.Params["orderDirection"] %>' /><!--【可选】升序降序-->

</form>
<div class="panel collapse" defh="75">
    <h1>
        查询条件</h1>
    <div class="searchBar">
        <form id="form" rel="pagerForm" method="post" runat="server">
        <table class="searchContent">
             <tr>
                <td>
                    <label>订单编号:</label>
                    <input type="text" name="OrderNumber" class="textInput" value="<%=orderNumber %>"/>
                </td>
                <td>
                    <label>订单用户:</label>
                    <input type="text" name="LoginName" class="textInput" value="<%=loginName %>"/>
                </td>
                <td>
                    <label>商铺名称:</label>
                    <input type="text" name="RentName" class="textInput"  value="<%=rentName %>"/>
                </td>
                <td>
                    <label>订单状态:</label>
                    <select name="OrderStatus" id="OrderStatus" runat="server">
                    <option value="">请选择</option>
                    <option value="配送中">进行中</option>
                    <option value="成功">成功</option>
                    <option value="失败">失败</option>
                     </select>
                </td>
             </tr>
             <tr>
                <td>
                    <label>起始日期:</label>
                    <input type="text" name="StartDate" class="date textInput readonly" readonly="true" value="<%=startDate %>"/>
                </td>
                <td>
                    <label>截止日期:</label>
                    <input type="text" name="EndDate" class="date textInput readonly" readonly="true" value="<%=endDate %>"/>
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
        <li id="liAdd" runat="server"><a class="add" href="myHouseOrder/pAddMyHouseOrder.aspx" title="添加订单" target="navTab" rel=""><span>
            添加订单</span></a></li>
        <li id="liEdit" runat="server"><a class="edit" href="myHouseOrder/pEditMyHouseOrder.aspx?uid={id}" title="修改订单" rel="" target="navTab">
            <span>修改订单</span></a></li>
        <li id="liDelete" runat="server"><a class="delete" href="myHouseOrder/pMyHouseOrderList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除订单</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="MyHouseOrderList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                        <th width="10%" orderField="OrderNumber" class="desc" align="center">订单编号</th>
                        <th width="10%" align="center">下单时间</th>
                        <th width="10%" orderField="Price" class="desc" align="center">价格</th>
                        <th width="10%" align="center">订单用户</th>
                        <th width="10%" align="center">商铺名称</th>
                        <th width="10%" align="center">订单状态</th>       
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="myHouseOrder/pMyHouseOrderDetail.aspx?uid=<%#Eval("Id")%>" target="ajax" prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox3"><%#Eval("OrderNumber")%>
                            </a>
                        </td>
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "CreateTime")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Price")%></td>                         
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "SystemUser.LoginUser.LoginName")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Rent.Name")%></td> 
                        <td align="center"><%#friday.core.components.EnumDescription.GetFieldText(DataBinder.Eval(Container.DataItem, "OrderStatus")) == "配送中" ? "进行中" : friday.core.components.EnumDescription.GetFieldText(DataBinder.Eval(Container.DataItem, "OrderStatus"))%></td>                 
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
            o.find("#MyHouseOrderList table:eq(1) tr").click(function (e) {
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

