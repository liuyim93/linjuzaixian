<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="nRentUpdate.aspx.cs" Inherits="Friday.mvc.weblogin.rent.nRentUpdate" %>

<div class="page" style="">
    <div class="pageContent">
    <div class="panelBar">
        <ul class="toolBar">
            <li>  <a class="add" href="OrderFoodList.aspx" target="dialog" rel="" >
             <span>租房详情</span>
           </a></li>
           
        </ul>
    </div>
        <form id="form" method="post"  class="pageForm required-validate" 
        onsubmit="return validateCallback(this,navTabAjaxDone)" runat="server">
        <div class="pageFormContent" style=" height:500px">
         
            <h1>
                房屋基本信息</h1>
            <input type="hidden" id="MyOrderId" size="30" runat="server" />
          <p>
                <label>
                    商铺名称：</label>
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
                    商铺当前状态：</label>
                <select id="ShopStatus" style="width:85px" runat="server">
					<option value="">请选择</option>
				
					<option value="1">营业时间</option>
                    <option value="2">正在休息</option>
				</select> 
            </p>
                 <p>
                        <label>
                            服务的学校：</label>
                        <input type="text" id="SchoolOfMerchant" size="30" class="required textInput gray" runat="server"
                            readonly="true" />
                        <a class="add" target="dialog" href="ListSchool.aspx" rel="">
                            选择</a>
                        <input type="hidden" id="SchoolOfMerchantID" size="30" class="required textInput gray"
                            runat="server" />
                    </p>
          <p></p> 
           <div>
            <p >
                 <label >商铺公告：</label>
					<textarea class="editor" tools="simple"  name="Bulletins" id="Bulletins" rows="15" cols="42" runat="server"></textarea>
           </p>
           </div>
           <div>
            <p >
                 <label >商铺活动：</label>
					<textarea   class="editor"    name="Activity" id="Activity" rows="15" cols="42"  runat="server"></textarea>
           </p>
           </div>        
         <div style="  clear:left; width:80%; margin-top:400px" >
             <p>
                 <label>详细内容：</label>
             <div style="   width:100%; ">
				 	<textarea id="Description"    name="Description" rows="20" cols="240" style="width: 100%" runat="server"></textarea>
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
        var page_prefix = '<%=Request.Params["prefix"] %>';
        var $self = $.self(page_prefix);

        $self.one("panelloaded", function (e) {
            $self.find("#Description").xheditor({ upLinkUrl: "upload.aspx", upLinkExt: "zip,rar,txt", upImgUrl: "upload.aspx", upImgExt: "jpg,jpeg,gif,png", upFlashUrl: "upload.aspx", upFlashExt: "swf", upMediaUrl: "upload.aspx", upMediaExt: "wmv,avi,wma,mp3,mid" });
            //调用ListSchools时，传递过去当前SchoolOfMerchant即可
            var scmname=$self.find("#SchoolOfMerchant").attr("value");
            //alert(scmname);

            //回调后执行
            $self.bind("callback", function (event, arg1, arg2) {
                //2013-02-04 basilwnag muse unbind first
                $self.unbind("callback");
                var schname = "";
                var schid = "";
                $.each(arg1, function (i, o) {
                    var $o = $(o);
                    if (i == 0) {
                        schname = $o.attr("value");
                        schid = $o.attr("idvalue");
                    }
                    else {
                        schname = schname + "," + $o.attr("value");
                        schid = schid + "," + $o.attr("idvalue");
                    }
                });

                $self.find("#SchoolOfMerchant").val(schname);
                $self.find("#SchoolOfMerchantID").val(schid);


            });

        });


    });

    
 
</script>