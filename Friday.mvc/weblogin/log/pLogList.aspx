<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pLogList.aspx.cs" Inherits="Friday.mvc.weblogin.log.pLogList" %>



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
                   <label>Title:</label>
                    <input  type="text" name="Title" class="textInput" value="<%=title %>"
                         />
                </td>
                <td>
                  
                </td> 
               <td>                   
                    <p>Category</p>
                      <select name="CategoryName" id="CategoryName" runat="server">
                    <option value="">请选择</option>
                    <option value="1">调试</option>
                    <option value="2">信息</option>
                    <option value="3">操作日志</option>
                    <option value="4">异常</option>
                    </select>
                </td> 
               
               
            
            </tr>
             <tr>
             
              <%--  <td>
                    <label>起始日期:</label>
                    <input  type="text" name="StartDate" class="date textInput readonly" readonly="true" value="<%=startDate %>"
                        value="" />
                </td>
                <td>
                    <label>截止日期:</label>
                    <input type="text" name="EndDate" class="date textInput readonly" readonly="true" value="<%=endDate %>"
                        value="" />
                </td>--%>
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
        <li><a class="add" href="log/pAddLog.aspx" title="添加日志 target="navTab" rel=""><span>
            添加日志</span></a></li>
        <li><a class="edit" href="log/pEditLog.aspx?uid={id}" title="修改日志" rel="" target="navTab">
            <span>修改日志</span></a></li>
      
        <li><a class="delete" href="log/pLogList.aspx?flag=alldelete&uid={id}"
            target="ajaxTodo" title="确定要删除吗?"><span>删除日志</span></a></li>
        <li class="line">line</li>
    </ul>
</div>
<div id="logList">
    <table class="table" layouth="440">
        <asp:repeater id="repeater" runat="server">
                <HeaderTemplate>
                <thead>
                <tr>
                   <%-- <th width="10%" align="center">序 号</th>--%>
                        <th width="10%" align="center">LogID</th>
                       <th width="10%" align="center">名称</th> 
                              

                   <th width="10%" align="center">线程名称</th>
                      <th width="10%" align="center">消息内容</th>     
                             <th width="10%" align="center">优先级</th>
                        <th width="10%" align="center">进程名称</th> >
                   <th width="10%" align="center">时间戳</th>
                        <th width="10%" align="center">机器名称</th>
                        <th width="10%" align="center">ThreadName</th> 
                </tr>
                </thead>
                <tbody> 
                </HeaderTemplate>
                <ItemTemplate> 
                
                <tr target="logid" rel="<%#Eval("LogID")%>&discriminer=<%#Eval("LogID")%>">
                      <%--  <td align="center"><%#Container.ItemIndex+1%></td> --%>
                 <td><a href="log/pLogDetail.aspx?uid=<%#Eval("LogID")%>" prefix='<%=Request.Params["prefix"] %>'  target="ajax" rel_v3="jbsxBox3"><%#Eval("LogID")%>
                            </a>
                        </td>
                       <td align="center"><%#DataBinder.Eval(Container.DataItem, "Title")%></td>              
                       

                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "ThreadName")%></td>
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Message")%></td> 
                       <td align="center"><%#DataBinder.Eval(Container.DataItem, "Priority")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "ProcessName")%></td> 
                         <td align="center"><%#DataBinder.Eval(Container.DataItem, "Timestamp")%></td> 
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "MachineName")%></td>  
                        <td align="center"><%#DataBinder.Eval(Container.DataItem, "ThreadName")%></td>                      
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
            //debugger
            o.find("#logList table:eq(1) tr").click(function (e) {
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