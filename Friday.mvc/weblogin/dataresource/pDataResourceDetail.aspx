<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pDataResourceDetail.aspx.cs" Inherits="Friday.mvc.weblogin.dataresource.pDataResourceDetail" %>



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
             <input type="hidden" id="Hidden1" size="30" runat="server" />
          <p>
                     <label>
                            资讯标题：</label>
                      <input type="text" id="Title" size="30" class="required textInput gray" runat="server" />
                    </p>
                    
                    <p>
                   
			      <label>所属板块：</label>
                  <input type="text" id="SectionName" size="30" class="required textInput gray" runat="server" readonly="true"/>
                
                     <a class="btnLook" href="ListSection.aspx" rel="" lookupgroup="">选择类型</a>
                  <input type="hidden" id="SectionID"   class="textInput gray" runat="server"/>
                   </p>
                    
                    <p>
                        <label>
                            信息来源：</label>
                        <input type="text" id="Source" size="30" class="textInput gray" runat="server" />
                    </p>
                    <p>
                    <label>
                            作者：</label>
                        <input type="text" id="Publisher" size="30" class="textInput gray" runat="server" />
                    </p>
                    
                 <p style="float:left;">
                     <a href="AttachmentUpload.aspx?type=AddDataResource" rel="Attachment"
                      target="dialog"><label style="color:Red;width:80px;">点击上传附件:</label></a> 
                     <label id="AttachmentName" style="color:Blue; width:223px; padding:0,0,0,0;"></label>
                     <input type="hidden" id="AttachmentID" class="textInput gray" runat="server" />
                 </p>
              
                          
                 
                     <div style="  clear:left; width:80%; margin-top:0px" >
             <p>
                 <label>详细内容：</label>
             <div style="   width:100%; ">
				 	<textarea id="Description"    name="Description" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
				</div>
                </p>
                  
       </div>
           <p style="height:1px;"></p>

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
