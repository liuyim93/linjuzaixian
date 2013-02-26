<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddFeedBack.aspx.cs" Inherits="Friday.mvc.weblogin.feedBack.pAddFeedBack"   validateRequest="false"  %>

<div class="page" style="">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>添加消息</span>
           </a></li>
           
        </ul>
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return iframeCallback(this,navTabAjaxDone)" enctype="multipart/form-data" runat="server" >
        <div class="pageFormContent" style=" height:500px">
         
            <h1>
                消息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
          <p>
                <label>
                    消息名称：</label>
                <input type="text" id="ThreadIndex" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    消息类型：</label>
                <input type="text" id="FeedBackType" size="30" class="required textInput gray" runat="server" />
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
  
         <div style="  clear:left; width:80%; margin-top:0px" >
             <p>
                 <label>详细内容：</label>
             <div style="   width:100%; ">
				 	<textarea id="Content"    name="Content" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
				</div>
                </p>
                  
       </div>
    
        </div>
                <div class="formBar">
                <ul>
                    <li>
                        <div class="buttonActive">
                            <div class="buttonContent">
                                <button type="submit">
                                    保存</button>
                            </div>
                        </div>
                    </li>
                    <li></li>
                    <li>
                        <div class="buttonActive">
                            <div class="buttonContent">
                                <button type="reset" id="Clean">
                                    重置</button>
                            </div>
                        </div>
                    </li>
                    <li></li>
                </ul>
            </div>
        </form>
    </div>
</div>

<script   type="text/javascript">
    $(function () {
        var prefix = '<%=Request.Params["prefix"]%>';
        $(document).one("panelloaded", function (e, o) {
            o.find("#Content").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

            o = null;

        });


    });
</script>