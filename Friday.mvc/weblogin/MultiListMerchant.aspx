<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultiListMerchant.aspx.cs"
    Inherits="Friday.mvc.weblogin.MultiListMerchant" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
<input type="hidden" name="NameSet" value="<%=Request.Params["NameSet"]%>" />
<input type="hidden" name="IDSet" value="<%=Request.Params["IDSet"]%>" />
</form>
<div class="panel " defh="30">
    <h1>当前已选择</h1>
    <div id="chooseResult">
    </div>
</div>
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
                    <div class="button">
                        <div class="buttonContent">
                            <button type="button" multlookup="ids" warn="请选择部门">
                                选择带回</button></div>
                    </div>
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
                      <th width="60"><input type="checkbox" class="checkboxCtrl" group="ids" />全选</th> 
                       <th width="40">序号</th> 
					    <th width="250">商铺名称</th> 
                      </tr>
                 </thead>
                 <tbody> 
                 </HeaderTemplate>
                 <ItemTemplate> 
                    <tr target="userid" rel="<%#Eval("Id")%>">
                     <td><input type="checkbox" name="ids" value={IDSet:'<%#DataBinder.Eval(Container.DataItem,"Id")%>',NameSet:'<%#DataBinder.Eval(Container.DataItem,"Name")%>'} /></td>
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
            var $form = o.find("#form");
            var $pagerForm = o.find("#pagerForm");
            var $idset = $pagerForm.find("[name=IDSet]");
            var $nameset = $pagerForm.find("[name=NameSet]");
            var $chooseResult = o.find("#chooseResult");
            var replace_nameset_pattern = /{nameset}(,)*/i;
            var replace_idset_pattern = /{idset}(,)*/i;
            //alert(o.find("[name=IDSet]").val());
            //2013-02-21 basilwang in case of splitting space as a element of this array 
            $idset.val($idset.val().replace(replace_idset_pattern, ""));
            $nameset.val($nameset.val().replace(replace_nameset_pattern, ""));
            var id_set = ($idset.val() === "") ? [] : $idset.val().split(',');
            var name_set = ($nameset.val() === "") ? [] : $nameset.val().split(',');
            //alert(id_set.length);
            $chooseResult.text($nameset.val());
            var target_type = $.get_target_type(prefix);
            if (/navtab/i.test(target_type)) {
                $form.bind("submit", function (e) {
                    return navTabSearch(this);
                });
                o.find("#numPerPage").bind("change", function (e) {
                    navTabPageBreak({ numPerPage: this.value });
                });
            }
            else {
                $form.bind("submit", function (e) {
                    //2013-02-21 basilwang we add $idset and $nameset to search form before submit
                    $idset.clone(false).appendTo($form);
                    $nameset.clone(false).appendTo($form);
                    return dialogSearch(this);
                });
                o.find("#numPerPage").bind("change", function (e) {
                    dialogPageBreak({ numPerPage: this.value });
                });
            }

            o.find("[name=ids]")
              .change(function () {
                  var _args = DWZ.jsonEval($(this).val());
                  if ($(this).is(":checked")) {
                      ////debugger
                      if ($.inArray(_args["IDSet"], id_set) === -1) {
                          id_set[id_set.length] = _args["IDSet"];
                          name_set[name_set.length] = _args["NameSet"];
                          $idset.val(id_set.join(','));
                          $nameset.val(name_set.join(','));
                      }

                  }
                  else {
                      ////debugger
                      var i_to_be_removed = $.inArray(_args["IDSet"], id_set);
                      if (i_to_be_removed > -1) {
                          var function_to_be_compared = function (elem, index) {
                              if (index === i_to_be_removed) {
                                  return false;
                              }
                              return true;
                          };
                          id_set = $.grep(id_set, function_to_be_compared);
                          $idset.val(id_set.join(','));
                          name_set = $.grep(name_set, function_to_be_compared);
                          $nameset.val(name_set.join(','));
                      }

                  }
                  //debugger
                  $chooseResult.text($nameset.val());
              })
              .each(function () {
                  var _args = DWZ.jsonEval($(this).val());
                  if ($.inArray(_args["IDSet"], id_set) > -1)
                      $(this).attr("checked", true);

              });
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });

    });
</script>
