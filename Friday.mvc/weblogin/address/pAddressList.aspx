<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddressList.aspx.cs" Inherits="Friday.mvc.weblogin.pAddressList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
<input type="hidden" name="orderField" value='<%=Request.Params["orderField"] %>' /><!--【可选】查询排序-->
<input type="hidden" name="orderDirection" value='<%=Request.Params["orderDirection"] %>' /><!--【可选】升序降序-->
</form>

<div class="panelBar">
    <ul class="toolBar">
        <li><a class="add" href="Address/pAddAddress.aspx?systemUser_id=<%=Request.Params["systemUser_id"]%>" title="增加配送地址" target="dialog"
            rel="" width="600" height="400"><span>增加配送地址</span></a></li>
        <li><a class="edit" href="Address/pEditAddress.aspx?uid={addressid}" title="修改配送地址" rel="" target="dialog"
            height="480"><span>修改配送地址</span></a></li>
        <li><a class="delete" href="Address/pAddressList.aspx?flag=alldelete&uid={addressid}" target="ajaxTodo"
            title="确定要删除吗?"><span>删除配送地址</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="addressList">
<form id="form" rel="pagerForm" method="post" runat="server">
</form>
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="20%" orderField="AddressName" class="asc" align="center">配送地址</th>
                            <th width="10%" align="center">联系电话</th>
                            <th width="15%" align="center">备用电话</th>
                            <th width="10%" orderField="Linkman" class="asc" align="center">联系人</th>
                            <th width="20%" align="center">Email</th>
                            <th width="20%" align="center">微信</th>
                            <th width="20%" align="center">QQ</th>
                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                    
                    <tr target="addressid" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "AddressName")%></td> 
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Tel")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "BackupTel")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Linkman")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Email")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "Weixin")%></td>
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "QQ")%></td>
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
