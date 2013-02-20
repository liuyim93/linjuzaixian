<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultiListSchool.aspx.cs"
    Inherits="Friday.mvc.weblogin.MultiListSchool" %>

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
                     <td><input type="checkbox" name="orgId" value={SchoolOfMerchantID:'<%#DataBinder.Eval(Container.DataItem,"Id")%>',SchoolOfMerchant:'<%#DataBinder.Eval(Container.DataItem,"Name")%>'}/>
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
        var page_prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {
            //            var $panel = $.referer(page_prefix);

            //            //2013-02-05 pangfuxing SelectAll
            //            var $checkboxAll = o.find("#CheckboxAll");
            //            $checkboxAll.toggle(function () {
            //                //debugger
            //                $(this).attr("checked", true);
            //                o.find("#CheckboxAll").attr("checked", true);
            //                //debugger
            //                //var flag = checkboxAll.attr("checked"); //判断全选按钮的状态
            //                o.find("input[name='SelectSchool']").attr("checked", true);
            //                //                $("input[name='SelectSchool']").each(function () {//查找每一个Id以Item结尾的checkbox
            //                //                $(this).attr("checked", flag);//选中或者取消选中
            //            },
            //            function () {
            //                $checkboxAll.attr("checked", false);
            //                $o.find("input[name='SelectSchool']").attr("checked", false);
            //            });

            //            o.find("#btnSave", "click", function () {
            //                var arg1 = "arg1_value";
            //                var arg2 = "arg2_value";
            //                //2013-02-05  pangfuxing  change type=checkbox  to  name=SelectSchool  to  get rid of  the influence  from  ("#CheckboxAll").value
            //                var os = $self.find("input[name=SelectSchool]:checked");
            //                arg1 = [];
            //                $.each(os, function (i, o) {
            //                    //debugger
            //                    var $o = $(o);
            //                    //alert($o.attr("idvalue"));
            //                    arg1[i] = { idvalue: $o.attr("idvalue"), value: $o.val() };
            //                });

            //                //debugger
            //                $panel.trigger("callback", [arg1, arg2]);
            //                //debugger
            //                $.pdialog.closeCurrent();
            //                return false;
            //            });
        });






    });
    //$(document).ready(function() {

    //    gpage.config({ "IsDialog": true });
    //    gpage.init();

    //    gpage.jObj("btnSave", null, "dlg_pagebelongcity").bind('click', function() {

    //        SetValue();
    //        $.pdialog.closeCurrent();
    //        //navTab.reloadFlagWithFormArray("Company");

    //    });
    //});

    //function SetValue() {
    //    var result = [];

    //    var cArray = document.getElementsByTagName("input");
    //    var i;
    //    for (i = 0; i < cArray.length; i++) {
    //        if (cArray[i].type == 'checkbox' && cArray[i].checked && cArray[i].value != "undefined" && cArray[i].name == "chbSelectCity") {
    //            // result.push(cArray[i].value);
    //            gpage.jObj("BelongCity1", null, null).val(cArray[i].value);
    //            // gpage.jObj("DomainTypeID1", null, null).val(cArray[i].idvalue);;//ff下无法获取cArray[i].idvalue值 刘政敏 2012-07-31
    //            sid = cArray[i].attributes["idvalue"].nodeValue;
    //            gpage.jObj("BelongCityID1", null, null).val(sid);


    //        }
    //    }

    ////}

    //function SelectAll(CheckAll) {

    //    var itmes = document.getElementsByTagName("input");
    //    for (var i = 0; i < itmes.length; i++) {

    //        if (itmes[i].type == "checkbox") {
    //            itmes[i].checked = CheckAll.checked;
    //        }
    //    }
    //}
    // 
 </script>
