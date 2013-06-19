<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pDataResourceList.aspx.cs" Inherits="Friday.mvc.weblogin.dataresource.pDataResourceList" %>



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
                    <label>标题:</label>
                    <input  type="text" name="Title" class="textInput" value="<%=title %>"
                        value="" />
                </td>
                <td>
               
			      <label>所属板块：</label>
                  <input type="text" id="SectionName" size="30" class="required textInput gray" runat="server" readonly="true"/>
                
                     <a class="btnLook" href="ListSection.aspx" rel="" lookupgroup="">选择类型</a>
                  <input type="hidden" id="SectionID"   class="textInput gray" runat="server"/>
	 
                </td>
            
            </tr>
             <tr>
             
                <td>
                    <label>起始日期:</label>
                    <input  type="text" name="StartDate" class="date textInput readonly" readonly="true" value="<%=startDate %>"
                        value="" />
                </td>
                <td>
                    <label>截止日期:</label>
                    <input type="text" name="EndDate" class="date textInput readonly" readonly="true" value="<%=endDate %>"
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
        <li><a class="add" href="dataresource/pAddDataResource.aspx" title="添加信息" target="navTab" rel=""><span>
            添加信息</span></a></li>
        <li><a class="edit" href="dataresource/pEditDataResource.aspx?uid={id}" title="修改信息" rel="" target="navTab">
            <span>修改信息</span></a></li>
        <li><a class="delete" href="dataresource/pDataResourceList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除信息</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="dataresourceList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                  <tr>
                       <th width="5%" align="center">序号</th>
                        <th width="10%" align="center">ID</th>
					   <th width="20%" align="center">标题</th> 
					   <th width="10%" align="center">发布人</th> 
					   <th width="10%" align="center">发布时间</th>
					   <th width="17%" align="center">所属板块</th>
					   <th width="18%" align="center">内容</th>
			       <%--    <th width="10%" align="center">审核状态</th>--%>
		   	    
                     </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="id" rel="<%#Eval("Id")%>&discriminer=<%#Eval("Id")%>">
                        <td align="center"><%#Container.ItemIndex+1%></td> 
                        <td><a href="dataresource/pDataResourceDetail.aspx?uid=<%#Eval("Id")%>" prefix='<%=Request.Params["prefix"] %>'  target="ajax" rel_v3="jbsxBox3"><%#Eval("Id")%>
                            </a>
                        </td>
                        <td><%#DataBinder.Eval(Container.DataItem, "Title")%></td>
					     <td align="center"><%#DataBinder.Eval(Container.DataItem, "LoginUser.LoginName")%></td>
					     <td align="center"><%#DataBinder.Eval(Container.DataItem, "CreateTime", "{0:yyyy-MM-dd}")%></td>
					     <td align="center"><%#DataBinder.Eval(Container.DataItem, "Section.Name")%></td>
					     <td align="center"><%#DataBinder.Eval(Container.DataItem, "Description")%></td>
					   <%--<td align="center"><img id="State" src="<%#RcheckState(Eval("CheckState").ToString())%>"/> </imag> </td>   <%----%>
					  
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
            ////debugger
            o.find("#dataresourceList table:eq(1) tr").click(function (e) {
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