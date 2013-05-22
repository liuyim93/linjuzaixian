using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;


namespace friday.core.repositories
{
    public class SchoolOfMerchantRepository : Repository<SchoolOfMerchant>,ISchoolOfMerchantRepository
    {
        
        public string[] GetSchoolNamesAndIdsByMerchantID(string rentid)
        {
            string schnames="";
            string schids = "";
            string[] a = new string[2];
            int i = 1;
            var q = Session.CreateQuery(@"select s  from   SchoolOfMerchant as  sm left join  sm.School  as  s    where  sm.Merchant=:MId ")
                           .SetString("MId", rentid).List<School>();
            
        
            foreach (School sc in q)
            {
                if (i == 1)
                {
                    schnames = sc.Name;
                    schids = sc.Id;
                }
                else 
                {
                    schnames = sc.Name + "，" + schnames;
                    schids = sc.Id + "，" + schids;
                }
                i++;
            }
            a[0] = schnames;
            a[1] = schids;
            return a;             
        }

    

       public  void  DeleteSchoolOfMerchantByMerchantID(string MID)
       {
          
           using (ITransaction tran = Session.BeginTransaction())
           {
               try
               {
                   Session.CreateQuery(@"delete from   SchoolOfMerchant as  sm  where  sm.Merchant.Id=:MId ")
                        .SetString("MId", MID).ExecuteUpdate();                  
                   tran.Commit();
               }
               catch (Exception ex)
               {
                   tran.Rollback();
                   throw ex;
               }
           }

       }


    }
     
}
