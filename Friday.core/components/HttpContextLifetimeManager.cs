using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.Unity;
using System.Web;

namespace friday.core.components
{
    public class HttpContextLifetimeManager : LifetimeManager, IDisposable
    {
        const string ItemName = "HttpContextLifetimeManager";


        public override object GetValue()
        {
            return HttpContext.Current.Items[ItemName];
        }
        public override void RemoveValue()
        {
            HttpContext.Current.Items.Remove(ItemName);
        }

        public override void SetValue(object newValue)
        {
            HttpContext.Current.Items[ItemName] = newValue;
        }
        public void Dispose()
        {
            RemoveValue();
        }
    }
}
