<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSchoolList.aspx.cs" Inherits="Friday.mvc.weblogin.school.pSchoolList" %>



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
                    <label>学校名称:</label>
                    <input  type="text" name="Name" class="textInput" value="<%=name %>"
                        value="" />
                </td>
             
                <td>
                    <label>简称:</label>
                    <input  type="text" name="ShortName" class="textInput"  value="<%=shortName %>"
                        value="" />
                </td>
                <td>
                    <label>地址:</label>
                    <input type="text" name="CityName" class="textInput" value="<%=cityName %>"
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
        <li><a class="add" href="shop/pAddShop.aspx" title="添加学校" target="navTab" rel=""><span>
            添加学校</span></a></li>
        <li><a class="edit" href="shop/pEditShop.aspx?uid={id}" title="修改学校" rel="" target="navTab">
            <span>修改学校</span></a></li>
        <li><a class="delete" href="shop/pShopList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除学校</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="schoolList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="10%" align="center">序 号</th>
                        <th width="10%" align="center">学校编号</th>
                         <th width="10%" align="center">学校名称</th>
                              

                    <th width="10%" align="center">学校简称</th>
                           <th width="10%" align="center">所属城市</th>     
                 <%--   <th width="10%" align="center">email</th>
                        <th width="10%" align="center">配送地址</th>
                        <th width="10%" align="center">距离</th>
                        <th width="10%" align="center">折扣</th>
                        <th width="10%" align="center">创建时间</th>--%>
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="shop/pShopDetail.aspx?uid=<%#Eval("Id")%>" prefix='<%=Request.Params["prefix"] %>'  target="ajax" rel_v3="jbsxBox3"><%#Eval("Id")%>
                            </a>
                        </td>
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Name")%></td>
                    
                       

                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "ShortName")%></td>
                            <td align="center"><%#DataBinder.Eval(Container.DataItem, "CityName")%></td> 
                      <%--  <td align="center"><%#DataBinder.Eval(Container.DataItem, "Email")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Address")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Distance")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Rate")%></td>  
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "CreateTime")%></td>--%>                      
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
            o.find("#schoolList table:eq(1) tr").click(function (e) {
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