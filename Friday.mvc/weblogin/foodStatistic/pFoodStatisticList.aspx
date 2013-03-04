<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pFoodStatisticList.aspx.cs" Inherits="Friday.mvc.weblogin.foodStatistic.pFoodStatisticList" %>



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
                        <p>
                <label>
                    商铺名称：</label>
                <input type="text" id="Merchant" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="MerchantID"  runat="server" />
                <a class="btnLook" href="ListMerchantByMerchantType.aspx?MerchantType=餐馆" rel="" lookupgroup="">选择商铺</a>
            </p>
                </td> 
                <td>
                      <p>
                <label>
                    食品名称：</label>
                <input type="text" id="Food" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="FoodID"  runat="server" />
                <a class="btnLook" href="ListFoodByRestaurant.aspx?restaurant_id=<%=Request.Params["restaurant_id"]%>" rel="" lookupgroup="">选择食品</a>
            </p>
                    
                </td>
                <td>
                      <p>
                <label>
                    食品名称：</label>
                <input type="text" id="FoodRest" size="30" class="required textInput gray"
                    runat="server" readonly="true" />
                 <input type="hidden" id="FoodRestID"  runat="server" />
                <a class="btnLook" href="ListFoodInRestaurant.aspx" rel="" lookupgroup="">选择食品</a>
            </p>
                </td>
            
            </tr>
             <tr>
             
                <td>
                    <label>起始日期:</label>
                    <input  type="text" name="StartDate" class="date textInput readonly" readonly="true" value="<%=startDate %>"
                        value="" />
                </td>
                <td>
                    <label>截止日期:</label>
                    <input type="text" name="EndDate" class="date textInput readonly" readonly="true" value="<%=endDate %>"
                        value="" />
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
        <li></li>
        <li></li>
        <li></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="foodStatisticList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                        <th width="10%" align="center">ID</th>
                        <th width="10%" align="center">年</th>                            

               <th width="10%" align="center">月</th>
                      <th width="10%" align="center">日</th>     
                          <th width="10%" align="center">销量</th>
                        <th width="10%" align="center">评价次数</th>  
                        <th width="10%" align="center">平均分</th>
                          <th width="10%" align="center">食物名称</th>
                       <th width="10%" align="center">所属餐馆</th> <%-- --%>
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="foodStatistic/pFoodStatisticDetail.aspx?uid=<%#Eval("Id")%>" prefix='<%=Request.Params["prefix"] %>'  target="ajax" rel_v3="jbsxBox3"><%#Eval("Id")%>
                            </a>
                        </td>
                       <td align="center"><%#DataBinder.Eval(Container.DataItem, "Year")%></td>                
                       

                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Month")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Day")%></td> 
                      <td align="center"><%#DataBinder.Eval(Container.DataItem, "Amount")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "ValuingCount")%></td> 
                       <td align="center"><%#DataBinder.Eval(Container.DataItem, "AverageValuing")%></td> 
                             <td align="center"><%#DataBinder.Eval(Container.DataItem, "Food.Name")%></td>  
                     <td align="center"><%#DataBinder.Eval(Container.DataItem, "Food.Name")%></td>   <%--    --%>                   
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
            //debugger
            o.find("#foodStatisticList table:eq(1) tr").click(function (e) {
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