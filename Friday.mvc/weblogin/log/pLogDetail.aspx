<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pLogDetail.aspx.cs" Inherits="Friday.mvc.weblogin.log.pLogDetail" %>



<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
<%--       
                <li><a href="#"><span>详细内容</span></a></li>--%>
      
      
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
         <div  style=" height:180px">
             <input type="hidden" id="Hidden1" size="30" runat="server" />
            <p>
                <label>
                    事件ID：</label>
                <input type="text" id="EventID" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    优先级：</label>
                <input type="text" id="Priority" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Severity：</label>
                <input type="text" id="Severity" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    标题：</label>
                <input type="text" id="Title" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    时间戳：</label>
                <input type="text" id="Timestamp" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    主机名称：</label>
                <input type="text" id="MachineName" size="30" class="required textInput gray" runat="server" />
            </p>
            
             <p>
                <label>
                    AppDomainName：</label>
                <input type="text" id="AppDomainName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    进程编号：</label>
                <input type="text" id="ProcessID" size="30" class="required textInput gray" runat="server" />
            </p>

            <p>
                <label>
                    进程名称：</label>
                <input type="text" id="ProcessName" size="30" class="required textInput gray" runat="server" />
            </p>
            
             <p>
                <label>
                    ThreadName：</label>
                <input type="text" id="ThreadName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Win32ThreadId：</label>
                <input type="text" id="Win32ThreadId" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Message：</label>
                <input type="text" id="Message" size="30" class="required textInput gray" runat="server" />
            </p>

            <p>
                <label>
                    FormattedMessage：</label>
                <input type="text" id="FormattedMessage" size="30" class="required textInput gray" runat="server" />
            </p>
           
            </div>
           

          </div>
      <%--   <div>
           
                <p>
                    <label>
                        详细内容：</label>
                     
                        <textarea id="Content" name="Content" rows="20"   style="width:1000px"
                            runat="server"></textarea>
                     
                </p>
           
         </div>--%>

    </div>
    <div class="tabsFooter">
        <div class="tabsFooterContent">
        </div>
    </div>
</div>
<script type="text/javascript">

    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $(document).one("panelloaded", function (e, o) {
            o.find("#Contents").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });
            o.find("#mContents").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
