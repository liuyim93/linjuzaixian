<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pOrderOfHouseList.aspx.cs" Inherits="Friday.mvc.weblogin.pOrderOfHouseList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>

<div class="panelBar">
    <ul class="toolBar">
        <li id="liAdd" runat="server"><a class="add" href="OrderOfHouse/pAddOrderOfHouse.aspx?myHouseOrder_id=<%=Request.Params["myHouseOrder_id"]%>&rent_id=<%=rent_id %>" title="增加订单明细" target="dialog"
            rel="" width="600" height="400"><span>增加订单明细</span></a></li>
        <li id="liEdit" runat="server"><a class="edit" href="OrderOfHouse/pEditOrderOfHouse.aspx?uid={orderOfHouseid}&myHouseOrder_id=<%=Request.Params["myHouseOrder_id"]%>" title="修改订单明细" rel="" target="dialog"
            height="480"><span>修改订单明细</span></a></li>
        <li id="liDelete" runat="server"><a class="delete" href="OrderOfHouse/pOrderOfHouseList.aspx?flag=alldelete&uid={orderOfHouseid}&myHouseOrder_id=<%=Request.Params["myHouseOrder_id"]%>" target="ajaxTodo"
            title="确定要删除吗?"><span>删除订单明细</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="orderOfHouseList">
<form id="form" rel="pagerForm" method="post" runat="server">
</form>
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="5%" align="center">序 号</th>
                            <th width="20%" align="center">房屋名称</th>
                            <th width="5%" align="center">租金单价</th>
                            <th width="5%" align="center">租入数量</th>
                            <th width="5%" align="center">总租金</th>
                            <th width="20%" align="center">起租时间</th>
                            <th width="20%" align="center">到期时间</th>
                            <th width="5%" align="center">总天数</th>                     
                       </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                    
                    <tr target="orderOfHouseid" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "House.Name")%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "House.Price")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Amount")%></td>
                         <%--<td align="center"><%#Convert.ToInt16(DataBinder.Eval(Container.DataItem, "Amount")) *Convert.ToDouble(DataBinder.Eval(Container.DataItem, "House.Price"))%></td>--%>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Price")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "House.TimeOfRentFrom")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "House.TimeOfRentTO")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "House.DaySpanOfRent")%></td>
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
            <option value="5" selected="selected">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
        <span>条，共<%=total %>条</span>
    </div>
    <div class="pagination" rel="<%=Request.Params["rel_v3"] %>" totalcount="<%=total %>"
        numperpage="<%=numPerPage.Value %>" currentpage="<%=pageNum %>">
    </div>
</div>
<script type="text/javascript">

    $(function () {
        var rel_v3 = '<%=Request.Params["rel_v3"] %>';
        var prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            //debugger;
            o.find("#form").bind("submit", function (e) {
                //debugger
                return divSearch(this, rel_v3, $.get_target_type(prefix));

            });
            o.find("#numPerPage").bind("change", function (e) {
                navTabPageBreak({ numPerPage: this.value }, rel_v3);
            });
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>
