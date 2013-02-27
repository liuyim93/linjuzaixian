<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pRentDetail.aspx.cs" Inherits="Friday.mvc.weblogin.rent.pRentDetail" %>


<div class="tabs">
    <div class="tabsHeader">
        <div class="tabsHeaderContent">
          <ul>
                <li class="selected"><a href="#"><span>基本信息</span></a></li>
                 <li><a href="#"><span>服务的学校</span></a></li>          
                <li><a href="#"><span>公告和Logo</span></a></li>
                <li><a href="#"><span>详细信息</span></a></li>
                <li><a href='house/pHouseList.aspx?rent_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox1"
                target="ajax"><span>房屋</span></a></li>
                <li><a href='rentEmployee/pRentEmployeeList.aspx?rent_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox2"
                target="ajax"><span>员工列表</span></a></li>
                  <li><a href='merchantGoodsType/pMerchantGoodsTypeList.aspx?merchantType=Rent&rent_id=<%= Request.Params["uid"]%>' prefix='<%=Request.Params["prefix"] %>' rel_v3="jbsxBox111"
                target="ajax"><span>商品类型管理</span></a></li>
           </ul>
        </div>
    </div>
    <div class="tabsContent" style="height: 250px;">
         <div>
         <p>
                <label>
                    租房名称：</label>
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
                    折扣：</label>
                <input type="text" id="Rate" size="30" class="required textInput gray" runat="server" />
            </p>
            <p>
                <label>
                    Tel：</label>
                <input type="text" id="Tel" size="30" class="required textInput gray" runat="server" />
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
                    商铺当前状态：</label>
                <select id="ShopStatus" runat="server">
                    <option value="">请选择</option>
                    <option value="接受预定">接受预定</option>
                    <option value="营业时间">营业时间</option>
                    <option value="正在休息">正在休息</option>
                </select>
            </p>
         </div>
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
   

         <div>
       
            <p >
                 <label >商铺公告：</label>
					<textarea class="editor" tools="simple"  style="width:317px; height 200px;"   name="Bulletins" id="Bulletins"  runat="server"></textarea>
       </p>

           <p>
            
                <label>
                    Logo上传：</label>          
            
                <img id="ImagePreview" runat="server"  style=" width:240px; height:200px" />
            </p>
          
            <p >
                 <label >商铺活动：</label>
					<textarea   class="editor"    name="Activity" id="Activity" rows="15" cols="42"  runat="server"></textarea>
           </p>
           </div>        
         <div  >
             <p>
                 <label>详细内容：</label>
        
				 	<textarea id="Description"    name="Description" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
			 
                </p>
                  
       </div>
       

        <div id="jbsxBox1" >
        </div>
        
        <div id="jbsxBox2" >
        </div>
         <div id="jbsxBox111" >
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
