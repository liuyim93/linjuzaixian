<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pEditRent.aspx.cs" Inherits="Friday.mvc.weblogin.rent.pEditRent" %>

<div class="pageFormContent" layoutH="20">
    <form id="form" method="post" class="pageForm required-validate" enctype="multipart/form-data" runat="server">
    <div class="panel collapse" defh="95">
        <h1>
            租房公司基本信息</h1>
        <div>
         <p>
                <label>
                    公司名称：</label>
                <input type="text" id="Name" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    简称：</label>
                <input type="text" id="ShortName" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    店主：</label>
                <input type="text" id="Owener" size="30" class="required textInput gray" runat="server" />
            </p>
                  <p>
                <label>
                    营业时间：</label>
                <input type="text" id="ShopHours" size="30" class="required textInput gray" runat="server" />
            </p>
         
              <p>
                <label>
                    距离：</label>
                <input type="text" id="Distance" size="30" class="required textInput gray" runat="server" />
            </p>
              <p>
                <label>
                    折扣：</label>
                <input type="text" id="Rate" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Tel：</label>
                <input type="text" id="Tel" size="30" class="required textInput gray phone" runat="server" />
            </p>
          
            <p>
                <label>
                    Email：</label>
                <input type="text" id="Email" size="30" class="required email" runat="server" />
            </p>
             <p>
                <label>
                    地址：</label>
                <input type="text" id="Address" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    商铺当前状态：</label>
                <select id="ShopStatus" runat="server">
                    <option value="">请选择</option>
                    <option value="接受预定">接受预定</option>
                    <option value="营业时间">营业时间</option>
                    <option value="正在休息">正在休息</option>
                </select>
            </p>

          
        </div>
    </div>
     <div class="panel collapse" defh="95">
        <h1>
            服务的学校</h1>
    <div>
      
       <p>
                <label>
                    服务的学校：</label>
                <input type="text" id="SchoolOfMerchant" size="30" 
                    runat="server" readonly="true" />
                <a class="btnLook" href="ListSchool.aspx" rel=""  lookupgroup="">选择学校</a>
            </p>
            <p>
                <label>
                    仅演示，应隐藏ID</label>
                <input type="text" id="SchoolOfMerchantID"  size="30"  
                    runat="server" readonly="true" />
            </p>
            <p>
                <label>
                    服务的学校(多选）：</label>
                <input type="text" id="NameSet" size="35"  
                    runat="server" readonly="true" />
                <a class="btnLook" href="MultiListSchool.aspx?IDSet={IDSet}&NameSet={NameSet}"  rel=""  lookupgroup="">选择学校</a>
            </p>
            <p>
                <label>
                    仅演示，应隐藏ID</label>
                <input type="text" id="IDSet" size="35"  
                    runat="server" readonly="true" />
            </p>
 </div>
    </div>
         <div  class="panel close collapse" defh="120">
          <h1>
            公告和logo</h1>
            <div>
              <p >
                 <label >商铺公告：</label>
					<textarea class="editor" tools="simple"  name="Bulletins" id="Bulletins" rows="15" cols="42" runat="server"></textarea>
           </p>
        
       
           <p>
            
                <label>
                    Logo上传：</label>
          
                <input id="Image" type="file" class="required textInput gray" runat="server" />
              
            <span style="color: red; width:300px">
                请上传大小为100×120的logo(支持格式：.jpg/.jpeg/.png/.gif/.bmp)
            </span>  
           
            </p>
          
             <p >
                <img id="ImagePreview" runat="server"  style=" width:240px; height:200px" />
            </p>
          
            <p >
                 <label >商铺活动：</label>
					<textarea   class="editor"    name="Activity" id="Activity" rows="15" cols="42"  runat="server"></textarea>
           </p>
        
          </div>
           </div> 
     <div class="panel close collapse" defh="70">
        <h1>
            详细信息</h1>          
       
          <div>
                
        
             <p>
                 <label>详细内容：</label>
         	 	<textarea id="Description"    name="Description" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
			 
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
                        <button type="reset" id="Button1">
                            重置</button>
                    </div>
                </div>
            </li>
            <li></li>
        </ul>
    </div>
    </form>
    <div class="divider"></div>
      <a href="house/pHouseList.aspx" prefix='<%=Request.Params["prefix"] %>' target="ajax" rel_v3="jbsxBox1" style="display:none">load</a>
    <div id="jbsxBox1">
    </div>
</div>
<script type="text/javascript">

    $(function () {
        var prefix = '<%=Request.Params["prefix"] %>';
        //2013-01-15 basilwang must use one while not bind cause child panel may trigger panelloaded and bubble
        //ensure this function will be called delay until initUI called
        //2013-02-10 basilwang use document
        $(document).one("panelloaded", function (e, o) {
            //o.find("a[rel_v3]").trigger("click");
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });

            var target_type = $.get_target_type(prefix);
            if (/navtab/i.test(target_type)) {
                o.find("#form").bind("submit", function (e) {
                    return iframeCallback(this, navTabAjaxDone)

                });
            }
            else {
                o.find("#form").bind("submit", function (e) {
                    return iframeCallback(this, dialogAjaxDone)

                });
            }
            //2013-02-10 basilwang set o to null to avoid memory leak
            o = null;

        });


    });
</script>