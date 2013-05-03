<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pCommodityList.aspx.cs" Inherits="Friday.mvc.weblogin.commodity.pCommodityList" %>
<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="shop_id" value='<%=Request.Params["shop_id"] %>' />
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
                        <label>
                            名称:</label>
                        <input id="Name" type="text" name="Name" value="<%=name%>" />
                    </td>
                    <td>
                             <label>
                            类型:</label>
                        <select name="mGoodsType" id="mGoodsType" runat="server">
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
        <li><a class="add" href="commodity/pAddCommodity.aspx?shop_id=<%=Request.Params["shop_id"] %>" title="增加商品" target="dialog" width="870" height="750" rel="" ><span>增加商品</span></a></li>
        <li><a class="edit" href="commodity/pEditCommodity.aspx?uid={commodityid}&shop_id=<%=Request.Params["shop_id"] %>" title="修改商品" rel="" width="870" height="750" target="dialog"><span>修改商品</span></a></li>
        <li><a class="delete" href="commodity/pCommodityList.aspx?flag=alldelete&commodity_id={commodityid}" target="ajaxTodo"
            title="确定要删除吗?"><span>删除商品</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="commodityList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                           <th width="10%" align="center">序 号</th>
                            <th width="20%" orderField="Name" class="asc" align="center">菜 品 名</th>
                            <th width="15%" orderField="MonthAmount" class="desc" align="center">月 售 额</th>
                            <th width="20%" align="center">创建时间</th>
                            <th width="20%" align="center">删除标记</th>
                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                
                    <tr target="commodityid" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td>
                         <td><a href="commodity/pCommodityDetail.aspx?uid=<%#Eval("Id")%>" prefix='<%=Request.Params["prefix"] %>'  target="ajax" rel_v3="jbsxBox3"><%#Eval("Name")%>
                            </a></td> 
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
            //            debugger
            o.find("#commodityList table:eq(1) tr").click(function (e) {
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