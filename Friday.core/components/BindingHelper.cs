using System;
using System.Collections.Generic;
using System.Linq;
using System.Text; 
using System.Collections.Specialized;
using System.Reflection;
using System.Web;
using System.Web.UI;


namespace friday.core.components
{
    public class BindingHelper
    {
        public static void LoadPostData(System.Web.UI.Page page)
        {
            NameValueCollection postData = page.Request.Form;
            if (postData == null)
                return;
            foreach (string postKey in postData)
            {

                if (postKey != null)
                {

                    Control ctrl = page.FindControl(postKey);
                    if (ctrl != null)
                    {
                        if (ctrl is IPostBackDataHandler)
                        {
                            IPostBackDataHandler consumer = ctrl as IPostBackDataHandler;
                            consumer.LoadPostData(postKey, postData);

                        }
                    }
                }
            }
        }
        public static void RequestToControl(Control container)
        {
            Dictionary<string, string> nv = new Dictionary<string, string>();
            var nv1 = HttpContext.Current.Request.Form;
            foreach (var key in nv1.AllKeys)
            {
                string value = nv1[key];
                if (value == null || value == string.Empty)
                    continue;
                else
                    nv[key] = value;
            }
            nv1 = HttpContext.Current.Request.QueryString;
            foreach (var key in nv1.AllKeys)
            {
                string value = nv1[key];
                if (nv.ContainsKey(key))
                    continue;
                if (value == null || value == string.Empty)
                    continue;
                else
                    nv[key] = value;
            }
            foreach (var key in nv.Keys)
            {
                ReflectionHelper.SetValueToControl(container, key, nv[key]);
            }
        }
        public static void RequestToObject(Object obj)
        {
            Dictionary<string, string> nv = new Dictionary<string, string>();
            var nv1 = HttpContext.Current.Request.Form;
            foreach (var key in nv1.AllKeys)
            {
                string value = nv1[key];
                if (value == null || value == string.Empty)
                    continue;
                else
                    nv[key] = value;
            }
            nv1 = HttpContext.Current.Request.QueryString;
            foreach (var key in nv1.AllKeys)
            {
                string value = nv1[key];
                if (nv.ContainsKey(key))
                    continue;
                if (value == null || value == string.Empty)
                    continue;
                else
                    nv[key] = value;
            }
          
            foreach (PropertyInfo p in obj.GetType().GetProperties())
            {
                if (p.Name == "ID")
                    continue;
                if (IgnorePropertyInfo(p, true))
                    continue;
                if (!nv.ContainsKey(p.Name))
                    continue;
                //if (!p.CanWrite || p.IsSpecialName)
                //    continue;
                //if (p.PropertyType.Namespace != "System" && pobj.PropertyType.IsEnum == false)
                //    continue;
                //object objValue = ReflectionHelper.GetValueFromControl(container, p.InputerName);
                //if (objValue == System.DBNull.Value)
                //    continue;
                ReflectionHelper.SetValue(obj, p, nv[p.Name]);  //对象、对象属性类型信息、对应该成员控件的值

            }
            
            
        }
        public static void ClearControlValue(Control container)
        {
            foreach (Control ctr in container.Controls)
            {
                ReflectionHelper.SetValueToControl(container, ctr.ID, null);
            }
        }
        public static void ObjectToControl(object obj, Control container, bool withoutID)
        {
            foreach (PropertyInfo p in obj.GetType().GetProperties())
            {
                if (p.Name == "ID" && withoutID)
                    continue;
                if (IgnorePropertyInfo(p, false))
                    continue;
                //if (p.IsSpecialName || !p.CanRead)
                //    continue;
                //if (p.PropertyType.Namespace != "System" && p.PropertyType.IsEnum == false)
                //    continue;
                //if（p.MemberType.ToString()=="ShopStatus"）
                //{
                
                //}

                ReflectionHelper.SetValueToControl(container, p.Name, p.GetValue(obj, null));
            }
        }
        public static void ObjectToControl(object obj, Control container)
        {
            ObjectToControl(obj, container, false);
        }
        public static void ControlToObject(object obj, Control container)
        {
            ControlToObject(obj, container, false);


        }
        private static bool IgnorePropertyInfo(PropertyInfo p, bool write)
        {
            if (write)
            {
                if (p.CanWrite == false)
                {
                    return true;
                }
            }
            else
            {
                if (p.CanRead == false)
                {
                    return true;
                }
            }
            if (p.PropertyType.IsEnum)
                return false;
            if (p.IsSpecialName || p.PropertyType.Namespace != "System")
                return true;
            return false;
        }
        public static void ControlToObject(object obj, Control container, bool withoutID)
        {
            foreach (PropertyInfo p in obj.GetType().GetProperties())
            {
                if (p.Name == "ID" && withoutID)
                    continue;
                if (IgnorePropertyInfo(p, true))
                    continue;
                //if (!p.CanWrite || p.IsSpecialName)
                //    continue;
                //if (p.PropertyType.Namespace != "System" && pobj.PropertyType.IsEnum == false)
                //    continue;
                object objValue = ReflectionHelper.GetValueFromControl(container, p.Name);
                if (objValue == System.DBNull.Value)
                    continue;
                ReflectionHelper.SetValue(obj, p, objValue);

            }


        }
        public static void ObjectToDictionary(object item, Dictionary<string, string> dict)
        {
            foreach (PropertyInfo pobj in item.GetType().GetProperties())
            {
                if (IgnorePropertyInfo(pobj, false))
                    continue;
                //if (pobj.IsSpecialName || !pobj.CanRead)
                //    continue;
                //if (pobj.PropertyType.Namespace != "System" && pobj.PropertyType.IsEnum == false)
                //    continue;
                string value = string.Empty;
                if (pobj.GetValue(item, null) != null)
                {
                    value = pobj.GetValue(item, null).ToString();
                }
                dict[pobj.Name] = value;
            }
        }
        public static void DictionaryToObject(object item, Dictionary<string, string> dict)
        {
            foreach (PropertyInfo pobj in item.GetType().GetProperties())
            {
                if (IgnorePropertyInfo(pobj, true))
                    continue;
                //if (!pobj.CanWrite || pobj.IsSpecialName)
                //    continue;
                //if (pobj.PropertyType.Namespace != "System" && pobj.PropertyType.IsEnum == false)
                //    continue;
                object value = null;
                if (dict.ContainsKey(pobj.Name))
                {
                    value = dict[pobj.Name];
                    ReflectionHelper.SetValue(item, pobj, value);
                }

            }
        }
        public static void JsonToObject(object item, Dictionary<string, object> jsonData)
        {
            foreach (PropertyInfo pobj in item.GetType().GetProperties())
            {
                if (IgnorePropertyInfo(pobj, true))
                    continue;
                //if (!pobj.CanWrite || pobj.IsSpecialName)
                //    continue;
                //if (pobj.PropertyType.Namespace != "System" && pobj.PropertyType.IsEnum==false)
                //    continue;
                object value = null;
                if (jsonData.ContainsKey(pobj.Name))
                {
                    value = jsonData[pobj.Name];
                    ReflectionHelper.SetValue(item, pobj, value);
                }

            }
        }
    }
}
