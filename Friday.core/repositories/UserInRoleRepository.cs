using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Criterion;

namespace friday.core.repositories
{
    public class UserInRoleRepository : Repository<UserInRole>, IUserInRoleRepository
    {
        public string[] GetRoleNamesAndIDByLoginUserID(string userID)
        {
            string[] info = {"",""} ;
            string name="";
            string id="";
            int i = 1;
            var q = (from x in this.Session.Query<UserInRole>()
                     where x.LoginUser.Id == userID && x.IsDelete == false 
                     select x.SystemRole)
                     .ToList();

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
                    id = sc.Id + "," + id;  
                }
                i++;
            }
            info[0] = name;
            info[1] = id;
            return info;             
        }


        public void DeleteUserInRoleByLoginUserID(string MID)
       {
          
           using (ITransaction tran = Session.BeginTransaction())
           {
               try
               {
                   Session.CreateQuery(@"update UserInRole set IsDelete=true  where  LoginUser.Id=:LId ")
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
