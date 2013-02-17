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
    public class MerchantCategoryRepository : Repository<MerchantCategory>, IMerchantCategoryRepository
    {

        public MerchantCategory SearchByMerchantCategoryName(string name) 
        {
            var q = Session.CreateQuery(@"select mc  from   MerchantCategory as  mc   where  mc.MerchantCategoryName=:mCname ")
                        .SetString("mCname", name).UniqueResult<MerchantCategory>(); ;

            return q;
        
        }
      


    }
     
}
