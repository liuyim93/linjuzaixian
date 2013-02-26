<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pFeedBackDetail.aspx.cs" Inherits="Friday.mvc.weblogin.feedBack.pFeedBackDetail" %>



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
                    反馈者：</label>
                <input type="text" id="fromSystemUser" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    反馈类型：</label>
                <input type="text" id="Type" size="30" class="required textInput gray" runat="server" />
            </p>
            <p></p>
             <p>
                <label>
                    反馈内容：</label>
             
                
                        <textarea id="Contents" name="Contents"   style="width:1000px; height:100px"
                            runat="server"></textarea>
            </p>
            </div>
             <div  style="height:180px">
                <p>
                <label>
                    回复人：</label>
                <input type="text" id="merchantUser" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <%--<label>
                    类型：</label>
                <input type="text" id="Text2" size="30" class="required textInput gray" runat="server" />--%>
            </p>
            <p></p>
             <p>
                <label>
                    回复内容：</label>
             
                
                        <textarea id="mContents" name="mContents"   style="width:1000px; height:100px"
                            runat="server"></textarea>
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
            o.find("#Content").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
