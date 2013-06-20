<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pAddDataResource.aspx.cs" Inherits="Friday.mvc.weblogin.dataresource.pAddDataResource"   validateRequest="false"  %>

<div class="page" style="">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>添加信息</span>
           </a></li>
           
        </ul>
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
           onsubmit="return iframeCallback(this,navTabAjaxDone)" enctype="multipart/form-data" runat="server" >
        <div class="pageFormContent" style=" height:500px">
         
            <h1>
                信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
         
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
                 <%--   <p>
                    <label>
                            作者：</label>
                        <input type="text" id="Publisher" size="30" class="textInput gray" runat="server" />
                    </p>
                    --%>
               <%--  <p style="float:left;">
                     <a href="AttachmentUpload.aspx" rel="Attachment"
                      target="dialog"><label style="color:Red;width:80px;">点击上传附件:</label></a> 
                     <label id="AttachmentName" style="color:Blue; width:223px; padding:0,0,0,0;"></label>
                     <input type="hidden" id="AttachmentID" class="textInput gray" runat="server" />
                 </p>
              --%>
                  
                 
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
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

            o = null;

        });


    });
</script>