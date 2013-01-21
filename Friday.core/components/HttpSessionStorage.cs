using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using System.Web;
using System.Threading;

namespace friday.core.components
{
    public class HttpSessionStorage:ISessionStorage
    {
        public HttpSessionStorage()
        {

        }
        public ISession Get()
        {
            return (ISession)HttpContext.Current.Items["NhbSession"];
        }
        public void Set(ISession value)
        {
            if (value != null)
            {
                HttpContext.Current.Items.Add("NhbSession", value);
            }
        }
    }
    public class ThreadSessionStorage : ISessionStorage
    {
        LocalDataStoreSlot storeSlot = Thread.GetNamedDataSlot("NhbSession");

        public ISession Get()
        {
            return (ISession)Thread.GetData(storeSlot);
        }
        public void Set(ISession value)
        {
            if (value != null)
            {
                Thread.SetData(storeSlot, value);

            }
        }
    }
}
