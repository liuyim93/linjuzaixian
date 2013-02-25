<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pRestaurantDetail.aspx.cs"
    Inherits="Friday.mvc.weblogin.restaurant.pRestaurantDetail" %>

<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
                <li><a href="#"><span>服务的学校</span></a></li>
                <li><a href="#"><span>配送时间</span></a></li>
                <li><a href="#"><span>促销打折</span></a></li>
                <li><a href="#"><span>公告和Logo</span></a></li>
                <li><a href="#"><span>详细信息</span></a></li>
                
                <li><a href='Food/pFoodList.aspx?restaurant_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>菜品</span></a></li>
                <li><a href='restaurantEmployee/pRestaurantEmployeeList.aspx?restaurant_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox2"
                target="ajax"><span>员工列表</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style=" height:200px;">
         <div>
             <input type="hidden" id="MyOrderId" size="30" runat="server" />
          <p>
                <label>
                    餐馆名称：</label>
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
                    登陆名：</label>
                <input type="text" id="LoginName" size="30"   class=" textInput readonly"   runat="server" />
            </p>
                <p>
                <label>
                    营业时间：</label>
                <input type="text" id="Text1" size="30" class="required textInput gray" runat="server" />
            </p>
        <p>
                <label>
                    Tel：</label>
                <input type="text" id="Text2" size="30" class="required textInput gray" runat="server" />
            </p>

             <p>
                <label>
                    Email：</label>
                <input type="text" id="Text3" size="30" class="required email" runat="server" />
            </p>
             <p>
                <label>
                    地址：</label>
                <input type="text" id="Text4" size="30" class="required Address" runat="server" />
            </p>
              <p>
                <label>
                    距离：</label>
                <input type="text" id="Text5" size="30" class="required textInput gray" runat="server" />
            </p>
              <p>
                <label>
                    商铺当前状态：</label>
                <select id="ShopStatus" style="width:85px" runat="server">
					<option value="">请选择</option>
				
					<option value="营业时间">营业时间</option>
                    <option value="正在休息">正在休息</option>
				</select> 
            </p>
         </div>
         <div>
         <p>
                <label>
                    服务的学校：</label>
                <input type="text" id="NameSet" size="35"  
                    runat="server" readonly="true" />
            </p>

       <%--     <p>
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
            </p>--%>

         </div>
         <div>
             <p>
                <label>
                    早餐配送时间：</label>
                <input type="text" id="MorningBeginHour" size="10" class="required textInput gray"
                    runat="server" />
                <label style="width: 10px">
                    —</label><input type="text" id="MorningEndHour" size="10" class="required textInput gray"
                        runat="server" />
            </p>
            <p>
                <label>
                    午餐配送时间：</label>
                <input type="text" id="AfternoonBeginHour" size="10" class="required textInput gray"
                    runat="server" /><label style="width: 10px">—</label><input type="text" id="AfternoonEndHour"
                        size="10" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    晚餐配送时间：</label>
                <input type="text" id="NightStartHour" size="10" class="required textInput gray"
                    runat="server" /><label style="width: 10px">—</label><input type="text" id="NightEndHour"
                        size="10" class="required textInput gray" runat="server" />
            </p>
           
         </div>

         <div>
             <p >
                 <label >商铺活动：</label>
					<textarea   class="editor" tools="simple"  style="width:317px; height 200px;"    name="Activity" id="Textarea1"    runat="server"></textarea>
           </p>
        

               <p>
                <label>
                    折扣：</label>
                <input type="text" id="Rate" size="30" class="required textInput gray" runat="server" />
            </p>
            <p></p>
            <p></p>
            <p></p>
         </div>

        <div>
                    
                <p >
                 <label >商铺公告：</label>
					<textarea class="editor" tools="simple"  style="width:317px; height 200px;"   name="Bulletins" id="Bulletins"  runat="server"></textarea>
           </p>
         
          
           <p>
            
                <label>
                    Logo：</label>
          
           <%--     <input id="Image" type="file" class="required textInput gray" runat="server" />
              
            <span style="color: red; width:300px">
                请上传大小为100×120的logo(支持格式：.jpg/.jpeg/.png/.gif/.bmp)
            </span>  
           
            </p>
          
             <p >--%>
                <img id="ImagePreview" runat="server"  style=" width:240px; height:200px" />
            </p>
       </div>
       
       <div>
             <p>
                 <label>详细内容：</label>
             
				 	<textarea id="Description"    name="Description" style="width:1000px; height:500px;" runat="server"></textarea>
		 
                </p>
          </div>
                  
       

        <div id="jbsxBox1" >
        </div>
        
          <div id="jbsxBox2" >
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
        $(document).one("panelloaded", function (e,o) {
            o.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });


        });


    });
</script>
