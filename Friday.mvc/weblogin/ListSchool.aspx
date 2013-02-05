<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListSchool.aspx.cs" Inherits="Friday.mvc.weblogin.ListSchool" %>

<div class="page">
    <div class="pageContent">
        <form id="Form2" method="post" runat="server" class="pageForm required-validate">
        <div class="panelBar">
            <ul class="toolBar">
            </ul>
        </div>
        <table class="table" layouth="140">
            <asp:repeater id="repeater" runat="server">
                 <HeaderTemplate>
                 <thead>
                     <tr>
                      <th width="40"><input id="CheckboxAll"  type="checkbox"    /></th> 
                       <th width="40">序号</th> 
					    <th width="80">学校名称</th> 
                      </tr>
                 </thead>
                 <tbody> 
                 </HeaderTemplate>
                 <ItemTemplate> 
                    <tr target="userid" rel="<%#Eval("Id")%>">
                     <td> <input id="chbListID" type="checkbox" name="SelectSchool" idvalue="<%#DataBinder.Eval(Container.DataItem, "Id")%>" 
                     value="<%#DataBinder.Eval(Container.DataItem, "Name")%>" /></td> 
                     <td><%#Container.ItemIndex+1%></td>
					 <td><%#DataBinder.Eval(Container.DataItem, "Name")%></td>
				    </tr>
			      
                </ItemTemplate>
         </asp:repeater>
            </tbody>
        </table>
        <div class="formBar">
            <ul>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button id="btnSave" type="button">
                                保存</button></div>
                    </div>
                </li>
                <li>
                    <div class="button">
                        <div class="buttonContent">
                            <button class="close" value="关闭">
                                取消</button></div>
                    </div>
                </li>
            </ul>
        </div>
        </form>
    </div>
</div>
<script   type="text/javascript">
    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $self.one("panelloaded", function () {
            var $panel = $.referer(page_prefix);

            //2013-02-05 pangfuxing SelectAll
            var $checkboxAll = $self.find("#CheckboxAll");
            $checkboxAll.toggle(function () {
                debugger
                $(this).attr("checked", true);
                $self.find("#CheckboxAll").attr("checked", true);
                //debugger
                //var flag = checkboxAll.attr("checked"); //判断全选按钮的状态
                $self.find("input[name='SelectSchool']").attr("checked", true);
                //                $("input[name='SelectSchool']").each(function () {//查找每一个Id以Item结尾的checkbox
                //                $(this).attr("checked", flag);//选中或者取消选中
            },
            function () {
                $checkboxAll.attr("checked",false);
                $self.find("input[name='SelectSchool']").attr("checked", false);
            });

            $self.delegate("#btnSave", "click", function () {
                var arg1 = "arg1_value";
                var arg2 = "arg2_value";
                //2013-02-05  pangfuxing  change type=checkbox  to  name=SelectSchool  to  get rid of  the influence  from  ("#CheckboxAll").value
                var os = $self.find("input[name=SelectSchool]:checked");
                arg1 = [];
                $.each(os, function (i, o) {
                    //debugger
                    var $o = $(o);
                    //alert($o.attr("idvalue"));
                    arg1[i] = { idvalue: $o.attr("idvalue"), value: $o.val() };
                });

                //debugger
                $panel.trigger("callback", [arg1, arg2]);
                //debugger
                $.pdialog.closeCurrent();
                return false;
            });
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