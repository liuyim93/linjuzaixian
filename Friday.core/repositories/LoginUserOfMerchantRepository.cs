using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.repositories
{
    public class LoginUserOfMerchantRepository : Repository<LoginUserOfMerchant>, ILoginUserOfMerchantRepository
    {

    
        //20120223  pangfuxing  get Merchant's  Admin user
        //public LoginUser GetMerchantLoginUserBy(string MerchantId,UserTypeEnum ust)
        //{
            

        //    var q = Session.CreateQuery(@"select  u from LoginUserOfMerchant  as lu   left join  lu.LoginUser as u  where  lu.Merchant=:mchtId and  lu.LoginUser.UserType=:ust")
        //         .SetString("mchtId", MerchantId).SetEnum("ust", ust); 

        //    return q.UniqueResult<LoginUser>();
        //}


        //20120223  pangfuxing get  merchant_id  in LoginUserOfMerchant
        //public String[] GetLoginUserOfMerchantBy(string loginusername)
        //{
        //    int j = 0;
        //    //UserTypeEnum ustadmin = UserTypeEnum.餐馆;
        //    //UserTypeEnum ustxiaoer = UserTypeEnum.餐馆店小二;

        //    //var q = Session.CreateQuery(@"select  lu from LoginUserOfMerchant  as lu   left join  lu.LoginUser as u  where  lu.LoginUser.LoginName like : lname and  (lu.LoginUser.UserType=:ustadmin or lu.LoginUser.UserType=:ustxiaoer)")
        //    //     .SetString("lname", "%" + loginusername + "%").SetEnum("ustadmin", ustadmin).SetEnum("ustxiaoer", ustxiaoer).List<LoginUserOfMerchant>();

        //    //IList<LoginUserOfMerchant> loginUserOfMerchantList = new List<LoginUserOfMerchant>();
        //    //loginUserOfMerchantList = q;  

        //    //string[] idset = new string[loginUserOfMerchantList.Count]; 

        //    //foreach (var i in loginUserOfMerchantList)
        //    //{
        //    //    idset[j] =i.Merchant.Id;
        //    //    j++;
        //    //}

        //    return "Null";// idset;
        //}


    }
     
}
