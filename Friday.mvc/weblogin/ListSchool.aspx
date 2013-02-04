﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ListSchool.aspx.cs" Inherits="Friday.mvc.weblogin.ListSchool" %>

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
                      <th width="40"><input id="Checkbox2" value="undefined" type="checkbox" onclick="SelectAll(this)" /></th> 
                       <th width="40">序号</th>
					    <th width="80">学校名称</th> 
                      </tr>
                 </thead>
                 <tbody> 
                 </HeaderTemplate>
                 <ItemTemplate> 
                    <tr target="userid" rel="<%#Eval("Id")%>">
                     <td> <input id="chbListID" type="checkbox" name="chbSelectCity" idvalue="<%#DataBinder.Eval(Container.DataItem, "Id")%>" 
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
        $self.one("panelloaded", function (e) {
             
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

//}

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