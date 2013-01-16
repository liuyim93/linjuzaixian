using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using friday.core.components;

namespace friday.coretest
{
    class TestSessionStorage : ISessionStorage
    {
        ISession session;
        #region ISessionStorage 成员

        public NHibernate.ISession Get()
        {
            return session;
        }

        public void Set(ISession value)
        {
            if (value != null)
            {
                session = value;
            }
        }

        #endregion
    }
}
