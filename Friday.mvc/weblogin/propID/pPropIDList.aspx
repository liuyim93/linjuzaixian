<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pPropIDList.aspx.cs" Inherits="Friday.mvc.weblogin.pPropIDList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
<input type="hidden" name="orderField" value='<%=Request.Params["orderField"] %>' /><!--【可选】查询排序-->
<input type="hidden" name="orderDirection" value='<%=Request.Params["orderDirection"] %>' /><!--【可选】升序降序-->
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
                        <input id="PropIDName" type="text" name="PropIDName" value="<%=propIDName%>" />
                    </td>
                    <td>
                        <label>
                            编号:</label>
                        <input id="PropIDId" type="text" name="PropIDId" value="<%=propIDId%>" />
                    </td>
                 
                </tr>
                <tr>
                    
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
        <li><a class="add" href="propID/pAddPropID.aspx?merchant_id={id}" title="增加规格类型" target="dialog"
            rel="" width="600" height="400"><span>增加规格类型</span></a></li>
    <%--    <li><a class="add" href="propID/pSelectGlobalGoodsType.aspx?mType=<%= Request.Params["merchantType"]%>&merchant_id={id}" title="选择系统商品类型" target="dialog"
            rel="" width="600" height="400"><span>选择系统商品类型</span></a></li>--%>
        <li><a class="edit" href="propID/pEditPropID.aspx?uid={propIDid}" title="修改规格类型" rel="" target="dialog"
            height="480"><span>修改规格类型</span></a></li>
        <li><a class="delete" href="propID/pPropIDList.aspx?flag=alldelete&uid={propIDid}" target="ajaxTodo"
            title="确定要删除吗?"><span>删除规格类型</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="propIDList">
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="20%" orderField="PropIDName" class="asc" align="center">名称</th>
                           
                            <th width="20%" align="center">创建时间</th>
                            <th width="20%" align="center">删除标记</th>
                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                
                    <tr target="propIDid" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "PropIDName")%></td> 
                      
                          <td align="center"><%#DataBinder.Eval(Container.DataItem, "PropIDName")%></td>
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
