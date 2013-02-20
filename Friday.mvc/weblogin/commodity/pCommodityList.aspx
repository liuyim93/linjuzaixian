﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pCommodityList.aspx.cs" Inherits="Friday.mvc.weblogin.commodity.pCommodityList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
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
                        <select name="foodtype" id="Type" runat="server">
                            <option value="" selected="selected">不限</option>
                            <option value="主食">主食</option>
                            <option value="小食">小食</option>
                            <option value="饮品">饮品</option>
                            <option value="配餐">配餐</option>
                            <option value="套餐">套餐</option>
                            <option value="餐具">餐具</option>
                        </select>
                    </td>
                    <td>
                        <label>
                            自定义类型:</label>
                        <input id="owenType" name="owenType" type="text" name="Name" value="<%=owenType%>" />
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
        <li><a class="add" href="Food/AddFood.aspx?shop_id={id}" title="增加商品" target="navTab"
            rel="" width="600" height="400"><span>增加商品</span></a></li>
        <li><a class="edit" href="Food/EditFood.aspx?uid={foodid}" title="修改商品" rel="" target="dialog"
            height="480"><span>修改商品</span></a></li>
        <li><a class="delete" href="Food/pFoodList.aspx?flag=alldelete&uid={id}" target="navTabTodo"
            title="确定要删除吗?"><span>删除商品</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="foodList">
    <table class="table">
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="20%" align="center">商 品 名</th>
                            <th width="10%" align="center">单 价</th>
                        <%--    <th width="15%" align="center">销 售 额</th>--%>
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
                       <%--   <td align="center"><%#DataBinder.Eval(Container.DataItem, "Amount")%></td>--%>
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