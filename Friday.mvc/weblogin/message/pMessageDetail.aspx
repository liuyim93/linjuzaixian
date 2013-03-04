<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pMessageDetail.aspx.cs" Inherits="Friday.mvc.weblogin.message.pMessageDetail" %>



<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
       
                <li><a href="#"><span>详细内容</span></a></li>
      
      
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
             <input type="hidden" id="Hidden1" size="30" runat="server" />
            <p>
                <label>
                    消息名称：</label>
                <input type="text" id="ThreadIndex" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    消息类型：</label>
                <input type="text" id="MessageType" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    LoginUserName：</label>
                <input type="text" id="LoginUserName" size="30" class="required textInput gray" runat="server" />
            </p>
             <p>
                <label>
                    MerchantName：</label>
                <input type="text" id="MerchantName" size="30" class="required textInput gray" runat="server" />
            </p>
               <p>
                <label>
                    方向：</label>
                <input type="text" id="Direction" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    消息索引：</label>
                <input type="text" id="TrackIndex" size="30" class="required textInput gray" runat="server" />
            </p>
          <p>
           <label>
                            IsNew:</label>
                        <select name="IsNew" id="IsNew" runat="server"   >
                            <option value="" ></option>
                            <option value="True" >是</option>
                            <option value="False" >否</option>
                        </select>
             </p>

          </div>
         <div>
           
                <p>
                    <label>
                        详细内容：</label>
                     
                        <textarea id="Content" name="Content" rows="20"   style="width:1000px"
                            runat="server"></textarea>
                     
                </p>
           
         </div>

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
