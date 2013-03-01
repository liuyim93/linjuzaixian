<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pLoginUserDetail.aspx.cs" Inherits="Friday.mvc.weblogin.loginUser.pLoginUserDetail" %>



<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
            
              
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
             <input type="hidden" id="MyOrderId" size="30" runat="server" />
            <p>
                <label>
                    登陆名称：</label>
                <input type="text" id="LoginName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    登陆密码：</label>
                <input type="text" id="Password" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    所属商家：</label>
                <input type="text" id="BelongMerchant" size="30" class="required textInput gray" runat="server" />
            </p>
                <p>
                <label>
                    用户角色：</label>
                <input type="text" id="BelongSystemRole" size="30" class="required textInput gray" runat="server" />
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
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
