<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pSystemRoleList.aspx.cs" Inherits="Friday.mvc.weblogin.pSystemRoleList" %>

<div layoutH="10" style="float:left; display:block; overflow:auto; width:400px;margin:2px; border:solid 1px #CCC; line-height:21px; background:#fff">
<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>
<div class="panel" defh="75">
    <h1>
        查询条件</h1>
    <div class="searchBar">
        <form id="form" rel="pagerForm" method="post" runat="server">
        <table class="searchContent">
             <tr>
                <td>
                    <label>角色名:</label>
                    <input type="text" name="Name" class="textInput" value="<%=loginName %>"  />
                </td>
             </tr>
             <tr>
                <td>
                    <label>备注:</label>
                    <input type="text" name="Description" class="textInput" value="<%=name %>" />
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
        <li><a class="add" href="systemRole/pAddSystemRole.aspx" title="添加角色" target="navTab" rel=""><span>
            添加角色</span></a></li>
        <li><a class="edit" href="systemRole/pEditSystemRole.aspx?uid={id}" title="修改角色" rel="" target="navTab">
            <span>修改角色</span></a></li>
        <li><a class="delete" href="systemRole/pSystemRoleList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除角色</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="SystemRoleList">
    <table class="table" layouth="200">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                    <th width="50" align="center">序 号</th>
                        <th width="200" align="center">角色</th>
                        <th width="200" align="center">备注</th>

                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="systemRole/pSystemRoleDetail.aspx?uid=<%#Eval("Id")%>" target="ajax" prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox3"><%#Eval("Name")%>
                            </a>
                        </td>                      
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "Description")%></td>                 
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
</div>
<div id="jbsxBox3" class="pageFormContent" style="margin-left:406px;">
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
            o.find("#SystemRoleList table:eq(1) tr").click(function (e) {
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
