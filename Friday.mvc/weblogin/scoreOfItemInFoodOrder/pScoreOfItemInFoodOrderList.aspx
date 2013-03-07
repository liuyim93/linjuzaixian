<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pScoreOfItemInFoodOrderList.aspx.cs" Inherits="Friday.mvc.weblogin.scoreOfItemInFoodOrder.pScoreOfItemInFoodOrderList" %>

<form id="pagerForm" action="#rel#">
<input type="hidden" id="p" name="pageNum" value="<%=pageNum %>" />
<input type="hidden" name="prefix" value='<%=Request.Params["prefix"] %>' />
<input type="hidden" name="rel_v3" value='<%=Request.Params["rel_v3"] %>' />
<input type="hidden" name="numPerPage" value="<%=numPerPageValue%>" />
</form>

<div class="panelBar">
    <ul class="toolBar">
        <li><a class="add" href="ScoreOfItemInFoodOrder/pAddScoreOfItemInFoodOrder.aspx?valuingOfMyFoodOrder_id=<%=Request.Params["valuingOfMyFoodOrder_id"]%>" title="增加评价项评分" target="dialog"
            rel="" width="600" height="400"><span>增加评价项评分</span></a></li>
        <li><a class="edit" href="ScoreOfItemInFoodOrder/pEditScoreOfItemInFoodOrder.aspx?uid={scoreOfItemInFoodOrderid}" title="修改评价项评分" rel="" target="dialog"
            height="480"><span>修改评价项评分</span></a></li>
        <li><a class="delete" href="ScoreOfItemInFoodOrder/pScoreOfItemInFoodOrderList.aspx?flag=alldelete&uid={scoreOfItemInFoodOrderid}&valuingOfMyFoodOrder_id=<%=Request.Params["valuingOfMyFoodOrder_id"]%>" target="ajaxTodo"
            title="确定要删除吗?"><span>删除评价项评分</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="scoreOfItemInFoodOrderList">
<form id="form" rel="pagerForm" method="post" runat="server">
</form>
    <table class="table" rel='<%=Request.Params["rel_v3"] %>'>
        <asp:repeater id="repeater" runat="server">
              <HeaderTemplate>
                      <thead>
                        <tr>
                            <th width="10%" align="center">序 号</th>
                            <th width="20%" align="center">评价项名称</th>
                            <th width="10%" align="center">评价项得分</th>
                        </tr>
                    </thead>
                    <tbody>
                 </HeaderTemplate>
                 <ItemTemplate> 
                    
                    <tr target="scoreOfItemInFoodOrderid" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                         <td align="center"><%#Container.ItemIndex+1%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "ValuingItemOfMyFoodOrder.ValuingItemName")%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Score")%></td>
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
