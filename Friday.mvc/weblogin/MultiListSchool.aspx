﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultiListSchool.aspx.cs"
    Inherits="Friday.mvc.weblogin.MultiListSchool" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
<input type="hidden" name="NameSet" value="<%=Request.Params["NameSet"]%>" />
<input type="hidden" name="IDSet" value="<%=Request.Params["IDSet"]%>" />
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
                    <input type="text" name="Name" class="textInput" value="<%=name %>" value="" />
                </td>
                <td>
                    <label>
                        简称:</label>
                    <input type="text" name="ShortName" class="textInput" value="<%=shortName %>" value="" />
                </td>
                <td>
                    <label>
                        地址:</label>
                    <input type="text" name="Address" class="textInput" value="<%=address %>" value="" />
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
                   <div class="button"><div class="buttonContent"><button type="button" multLookup="orgId" warn="请选择部门">选择带回</button></div></div>
                </li>
            </ul>
        </div>
        </form>
    </div>
</div>
<div id="schoolList">
    <table class="table" layouth="240">
        <asp:repeater id="repeater" runat="server">
                 <HeaderTemplate>
                 <thead>
                     <tr>
                      <th width="60"><input type="checkbox" class="checkboxCtrl" group="orgId" />全选</th> 
                       <th width="40">序号</th> 
					    <th width="250">学校名称</th> 
                      </tr>
                 </thead>
                 <tbody> 
                 </HeaderTemplate>
                 <ItemTemplate> 
                    <tr target="userid" rel="<%#Eval("Id")%>">
                     <td><input type="checkbox" name="orgId" value={IDSet:'<%#DataBinder.Eval(Container.DataItem,"Id")%>',NameSet:'<%#DataBinder.Eval(Container.DataItem,"Name")%>'} /></td>
                     <td><%#Container.ItemIndex+1%></td>
					 <td><%#DataBinder.Eval(Container.DataItem, "Name")%></td>			
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
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
        <span>条，共<%=total %>条</span>
    </div>
    <div class="pagination" totalcount="<%=total %>" numperpage="<%=numPerPage.Value %>"
        currentpage="<%=pageNum %>">
    </div>
</div>
<script type="text/javascript">
    $(function () {
        var prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {

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
            alert(o.find("[name=IDSet]").val());
            var id_set = o.find("[name=IDSet]").val().split(',');
            alert(id_set.length);
            o.find("[name=orgId]").each(function () {
                var _args = DWZ.jsonEval($(this).val());
                for (var key in _args) {
                    debugger
                    if ($.inArray(_args[key], id_set) > -1)
                        $(this).attr("checked", true);
                    //                    var value = args[key] ? args[key] + "," : "";
                    //                    args[key] = value + _args[key];
                }
            });
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });

    });
</script>
