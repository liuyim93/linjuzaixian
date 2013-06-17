<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSkuList.aspx.cs" Inherits="Friday.mvc.weblogin.sku.pSkuList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>

<div class="panelBar">
    <ul class="toolBar">
        <li><a class="add" href="sku/pAddSku.aspx?commodity_id=<%=Request.Params["commodity_id"]%>" title="增加商品种类" target="navTab"
            rel=""><span>增加商品种类</span></a></li>
        <li><a class="edit" href="sku/pEditSku.aspx?uid={skuid}" title="修改商品种类" rel="" target="navTab"><span>修改商品种类</span></a></li>
        <li><a class="delete" href="sku/pSkuList.aspx?flag=alldelete&uid={skuid}" target="ajaxTodo"
            title="确定要删除吗?"><span>删除商品种类</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div>
<form id="form" rel="pagerForm" method="post" runat="server">
</form>
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="15%" align="center">类型编码</th>
                            <th width="15%" align="center">类型名称</th>
                            <th width="20%" align="center">价格</th>
                            <th width="10%" align="center">库存</th>

                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                    
                    <tr target="skuid" rel="<%#Eval("skuId")%>&discriminer=<%#Eval("skuId")%>">
                          <td align="center"><%#Container.ItemIndex+1%></td> 
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Commodity.Name")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Commodity.Name")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "price")%></td> 
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "stock")%></td>
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

        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            ////debugger;
            o.find("#form").bind("submit", function (e) {
                ////debugger
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
