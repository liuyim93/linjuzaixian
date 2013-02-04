<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pActivityDetail.aspx.cs" Inherits="Friday.mvc.weblogin.activity.pActivityDetail" %>


<div class="page">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>活动详情</span>
           </a></li>
           
        </ul>
    </div>
        <div class="pageFormContent" style=" height:250px;">
         
            <h1>
                基本信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
            <p>
                <label>
                    活动名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    重要性：</label>
                <input type="text" id="Matters" size="30" class="required textInput gray" runat="server" />
            </p>
        
             <p style="margin-left:20px;height:40px">
                <img id="ImagePreview" runat="server" style=" width:240px; height:200px"  />
            </p>
         <div style="  clear:left; width:80%; margin-top:160px" >
             <p>
                 <label>详细内容：</label>
             <div style="   width:100%; ">
				 	<textarea id="Description"    name="Description" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
				</div>
                </p>
                  
       </div>
        </div>
    </div>
</div>
<script   type="text/javascript">

    $(function () {
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        $self.one("panelloaded", function (e) {
            $self.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>