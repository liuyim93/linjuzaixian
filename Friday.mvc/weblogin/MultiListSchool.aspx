<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultiListSchool.aspx.cs" Inherits="Friday.mvc.weblogin.MultiListSchool" %>


<div class="page">
    <div class="pageContent">
        <form id="Form1" method="post" runat="server" class="pageForm required-validate">
        <div class="pageFormContent">
            <div class="panel" defh="240" style="display: block; overflow: auto; width: 790px;
                margin: 2px; border: solid 1px #CCC; line-height: 21px; background: #fff">
                <div id="divTree">
                </div>
            </div>
        </div>
        <div class="formBar">
            <ul>
                <li>
                    <div class="buttonActive">
                        <div class="buttonContent">
                            <button id="btnSave" type="button">
                                <a style="text-decoration: none" href="">保存</a></button></div>
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
<script type="text/javascript">
    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {

            var dtree;
            var oObj;
            var a;
            debugger
            dtree = o.find("#divTree");
            a = o.find("#btnSave a");
            oObj = o;
            btnC = o.find("#btnSave");

            btnC.click(function (event) {
                debugger
                var nameSet = [];
                var idSet = [];
                var nameString;
                var idString;
                debugger
                var ht = dtree.getTSNs(true);
                var j = dtree.getTSNs(true).length;
                for (var i = 0; i < j; i++) {
                    //if (ht[i].hasChildren == false) {
                        nameSet.push(ht[i].text);
                        idSet.push(ht[i].id);
                    //}
                }

                if (nameSet.length == 0) {
                    alertMsg.error('请选择所属地域！');
                    return false;
                }
                else {
                    for (var i = 0; i < nameSet.length - 1; i++) {
                        if (nameString != null && nameString != undefined && nameString != "") {
                            nameString = nameString + nameSet[i] + ",";
                            idString = idString + idSet[i] + ",";
                        }
                        else {
                            nameString = nameSet[i] + ",";
                            idString = idSet[i] + ",";
                        }
                    }
                    if (nameString != null && nameString != undefined && nameString != "") {
                        nameString = nameString + nameSet[nameSet.length - 1];
                        idString = idString + idSet[nameSet.length - 1];
                    }
                    else {
                        nameString = nameSet[i];
                        idString = idSet[i];
                    }
                   // btnC.attr("href", "javascript:$.bringBack({NameSet:'" + nameString + "',IDSet:'" + idString + "'})");
                    $.bringBack({ NameSet: nameString, IDSet: idString});
                }
            });
//            a.click(function (event) {
//                debugger
//                var nameSet = [];
//                var idSet = [];
//                var nameString;
//                var idString;
//                var ht = dtree.getTSNs(true);
//                var j = dtree.getTSNs(true).length;
//                for (var i = 0; i < j; i++) {
//                    if (ht[i].hasChildren == false) {
//                        nameSet.push(ht[i].text);
//                        idSet.push(ht[i].id);
//                    }
//                }

//                if (nameSet.length == 0) {
//                    alertMsg.error('请选择所属地域！');
//                    return false;
//                }
//                else {
//                    for (var i = 0; i < nameSet.length - 1; i++) {
//                        if (nameString != null && nameString != undefined && nameString != "") {
//                            nameString = nameString + nameSet[i] + ",";
//                            idString = idString + idSet[i] + ",";
//                        }
//                        else {
//                            nameString = nameSet[i] + ",";
//                            idString = idSet[i] + ",";
//                        }
//                    }
//                    if (nameString != null && nameString != undefined && nameString != "") {
//                        nameString = nameString + nameSet[nameSet.length - 1];
//                        idString = idString + idSet[nameSet.length - 1];
//                    }
//                    else {
//                        nameString = nameSet[i];
//                        idString = idSet[i];
//                     }
//                    a.attr("href", "javascript:$.bringBack({NameSet:'" + nameString + "',IDSet:'" + idString + "'})");
//                }
//            });

            $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                url: "School/pSchoolList.aspx/MultiGetSchool?t=" + (new Date().getTime()),
                data: "{'nvls':[{'name':'id','value':'0'}]}",
                dataType: "json",
                success: function (data) {
                    var d = { showcheck: true };
                    var da = eval("(" + data.d + ")");
                    d.data = da;
                    d.cascadecheck = true;
                    d.theme = "bbit-tree-lines";
                    d.onnodeclick = function navi(item) {
                                            //debugger
                                            //a.attr("href", "javascript:$.bringBack({SchoolName:'" + item.text + "',SchoolID:'" + item.id + "'})");
//                        btnC.click(function () {
//                            $.bringBack({ NameSet: item.text, GoodsTypeID: item.id });
//                        });
                                        }
                    //点击触发事件
                    //$("#dtree", navTab.getCurrentPanel()).treeview(o);
                    dtree.treeview(d);
                }
            });
            o = null;
        });
    });
 </script>
