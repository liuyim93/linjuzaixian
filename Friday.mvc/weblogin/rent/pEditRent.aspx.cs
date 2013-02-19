using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.rent
{
    public partial class pEditRent : System.Web.UI.Page
    {
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
        IRepository<SchoolOfMerchant> iSchoolOfMerchantRepository = UnityHelper.UnityToT<IRepository<SchoolOfMerchant>>();
        IRepository<School> iSchoolRepository = UnityHelper.UnityToT<IRepository<School>>();

        private Rent rent;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            rent = iRentRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveRent(uid);
            }
            else
            {

                BindingHelper.ObjectToControl(rent, this);

                ISchoolOfMerchantRepository repoSchoolOfMerchant = new SchoolOfMerchantRepository();

                string schofmntname = repoSchoolOfMerchant.GetSchoolNamesByMerchantID(uid);
                this.SchoolOfMerchant.Value = schofmntname;

            }
        }

        private void SaveRent(string  uid)
        {

            BindingHelper.RequestToObject(rent);
            iRentRepository.SaveOrUpdate(rent);
           
            //2013-02-05  庞夫星
            //修改的时候，由于rent对应的多个school变动，所以保存之前先对SchoolOfMerchant 的关联删除掉，再重新添加
            ISchoolOfMerchantRepository repoSchoolOfMerchant = new SchoolOfMerchantRepository();
            repoSchoolOfMerchant.DeleteSchoolOfMerchantByMerchantID(uid);


            string schid;
            schid = this.SchoolOfMerchantID.Value;
            string[] sArray = schid.Split(',');
            foreach (string shcidsz in sArray)
            {
                friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                schofmt.Merchant = rent;
                schofmt.School = iSchoolRepository.Get(shcidsz);
                iSchoolOfMerchantRepository.SaveOrUpdate(schofmt);
            }   

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        

        }

    }
}