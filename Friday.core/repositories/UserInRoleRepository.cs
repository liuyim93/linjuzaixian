using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;

namespace friday.core.repositories
{
    public class UserInRoleRepository : Repository<UserInRole>, IUserInRoleRepository
    {
        public string[] GetRoleNamesAndIDByLoginUserID(string userID)
        {
            string[] schnames = {"",""} ;
            string name="";
            string id="";
            int i = 1;
            var q = Session.CreateQuery(@"select s  from   UserInRole as  sm left join  sm.Role  as  s    where  sm.LoginUser=:LId ")
                           .SetString("LId", userID).List<SystemRole>();

            foreach (SystemRole sc in q)
            {
                if (i == 1)
                {
                    name = sc.Name;
                    id = sc.Id;
                }
                else 
                {
                    name = sc.Name + "," + name;
                    id = sc.Name + "," + id;  
                }
                i++;
            }
            schnames[0] = name;
            schnames[1] = id;
            return schnames;             
        }


        public void DeleteUserInRoleByLoginUserID(string MID)
       {
          
           using (ITransaction tran = Session.BeginTransaction())
           {
               try
               {
                   Session.CreateQuery(@"delete from   UserInRole as  sm  where  sm.LoginUser.Id=:LId ")
                        .SetString("LId", MID).ExecuteUpdate();                  
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
