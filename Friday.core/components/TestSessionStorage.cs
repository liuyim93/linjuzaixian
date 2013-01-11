using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using System.Threading;

namespace friday.core.components
{
    class TestSessionStorage : ISessionStorage
    {
        LocalDataStoreSlot s = Thread.GetNamedDataSlot("Moss");
        ISession session;
        #region ISessionStorage 成员

        public NHibernate.ISession Get()
        {
            return (ISession)Thread.GetData(s);
        }

        public void Set(ISession value)
        {
            if (value != null)
            {
                Thread.SetData(s,value);
            }
        }

        #endregion
    }
}
