﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSkuPropList.aspx.cs" Inherits="Friday.mvc.weblogin.pSkuPropList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>

<div class="panelBar">
    <ul class="toolBar">
        <li><a class="add" href="skuProp/pAddSkuProp.aspx?sku_id=<%=Request.Params["sku_id"]%>" title="增加规格" target="dialog"
            rel=""><span>增加规格</span></a></li>
        <li><a class="edit" href="skuProp/pEditSkuProp.aspx?uid={SkuPropID}" title="修改规格" rel="" target="dialog"><span>修改规格</span></a></li>
        <li><a class="delete" href="skuProp/pSkuPropList.aspx?flag=alldelete&uid={SkuPropID}" rel="" target="ajaxTodo"
            title="确定要删除吗?"><span>删除规格</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="SkuPropList">
<form id="form" rel="pagerForm" method="post" runat="server">
</form>
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="20%" align="center">规格</th>
                            <th width="20%" align="center">规格值</th>
        
                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                    
                    <tr target="SkuPropID" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "PropID.PropIDName")%></td> 
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "PropValue.PropValueName")%></td>
          
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
