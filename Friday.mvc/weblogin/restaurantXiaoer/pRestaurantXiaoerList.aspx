<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pRestaurantXiaoerList.aspx.cs" Inherits="Friday.mvc.weblogin.pRestaurantXiaoer" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
<input type="hidden" name="orderField" value='<%=Request.Params["orderField"] %>' /><!--【可选】查询排序-->
<input type="hidden" name="orderDirection" value='<%=Request.Params["orderDirection"] %>' /><!--【可选】升序降序-->
<%--<input type="hidden" name="restaurant_id" value="<%=Request.Params["restaurant_id"] %>" />--%>
</form>
<div class="panel close collapse" defh="75">
    <h1>
        查询条件</h1>
    <div class="searchBar">
        <form id="form" rel="pagerForm" method="post" runat="server">
        <table class="searchContent">
            <tbody>
                <tr>
                    <td>
                        <label>
                            名称:</label>
                        <input id="Name" type="text" name="Name" value="<%=name%>" />
                    </td>
                    <td>
                        <label>
                            类型:</label>
                        <select name="mGoodsType" id="mGoodsType" runat="server"  value="<%=goodsType%>" >
                            <option value="" >不限</option>
                       
                        </select>
                    </td>
                 
                </tr>
                <tr>
                    <td>
                        <label>
                            起价:</label>
                        <input id="StartPrice" type="text" name="StartPrice" value="<%=startprice%>" />
                    </td>
                    <td>
                        <label>
                            截止价:</label>
                        <input id="EndPrice" type="text" name="EndPrice" value="<%=endprice%>" />
                </tr>
            </tbody>
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
        <li><a class="add" href="Food/pAddFood.aspx?merchant_id={id}" title="增加菜品" target="dialog"
            rel="" width="600" height="400"><span>增加菜品</span></a></li>
        <li><a class="edit" href="Food/pEditFood.aspx?uid={foodid}&merchant_id={id}" title="修改菜品" rel="" target="dialog"
            height="480"><span>修改菜品</span></a></li>
        <li><a class="delete" href="Food/pFoodList.aspx?flag=alldelete&food_id={foodid}" target="ajaxTodo"
            title="确定要删除吗?"><span>删除菜品</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="foodList">
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="20%" orderField="Name" class="asc" align="center">菜 品 名</th>
                            <th width="10%" orderField="Price" class="desc" align="center">单 价</th>
                            <th width="15%" orderField="MonthAmount" class="desc" align="center">月 售 额</th>
                            <th width="20%" align="center">创建时间</th>
                            <th width="20%" align="center">删除标记</th>
                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                
                    <tr target="foodid" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Name")%></td> 
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Price")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "MonthAmount")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Createtime")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "IsDelete")%></td>
                         
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
