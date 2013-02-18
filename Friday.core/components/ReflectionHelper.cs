using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using System.Web.UI.WebControls; 
using System.ComponentModel;
using System.Reflection;
using System.Web.UI.HtmlControls;
using friday.core.EnumType;


namespace friday.core.components
{

    public class ReflectionHelper
    {
        public static object ChangeType(object value, Type conversionType)
        {
            if (conversionType.IsGenericType && conversionType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                    return null;

                NullableConverter nullableConverter = new NullableConverter(conversionType);
                conversionType = nullableConverter.UnderlyingType;
            }
            if (conversionType == typeof(Guid))
                return new Guid(value.ToString());
            if (conversionType == typeof(System.String))
            {
                if (value is Guid)
                {
                    return value.ToString();
                }
                else if (value is DateTime)
                {
                    return Convert.ToDateTime(value).ToString("yyyy-MM-dd");
                }
            }
            if (value == null)
            {

                if (conversionType == typeof(int))
                    return 0;
                if (conversionType == typeof(double))
                    return 0;
                else if (conversionType == typeof(DateTime))
                    return DateTime.Now;
            }
            if (conversionType.IsEnum)
            {
                return Enum.Parse(conversionType, value.ToString());
            }
            else
                return Convert.ChangeType(value, conversionType);
        }
        public static void SetValue(object target, PropertyInfo propertyInfo, object value)
        {
            try
            {
                propertyInfo.SetValue(target, ChangeType(value, propertyInfo.PropertyType), null);
            }
            catch (FormatException ex)
            {
                throw new FormatException(string.Format("{0} was not in a correct format.", propertyInfo.Name));
            }
          
        }
        public static object GetValueFromControl(System.Web.UI.Control container, string ControlName)
        {
            Control control = container.FindControl(ControlName);
            if (control != null)
            {
                if (control is ListControl)
                {
                    ListControl listControl = (ListControl)control;
                    if (string.IsNullOrEmpty(listControl.SelectedValue))
                        return null;
                    return listControl.SelectedValue;
                }
                else
                {
                    PropertyInfo propertyInfo = null;
                    Type controlType = control.GetType();
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("Checked");

                    }
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("SelectedDate");
                    }
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("Value");
                    }
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("Text");
                    }
                    if (propertyInfo != null)
                    {

                        if (propertyInfo.GetValue(control, null).ToString() == string.Empty)
                        {
                            return null;
                        }
                        else
                        {
                            return propertyInfo.GetValue(control, null);
                        }

                    }
                }
            }
            return System.DBNull.Value;
        }
        public static void SetValueToControl(System.Web.UI.Control container, string ControlName, object value)
        {
            Control control = container.FindControl(ControlName);
        
            if (control != null)
            {
                //2012-07-22 basilwang for htmlinputfile can't set value
                if (control is HtmlInputFile)
                {
                    return;
                }

                //2013-02-02 pangfuxing for htmlselect can show Enum's value
                if (control is HtmlSelect)
                {

                    HtmlSelect selectControl = (HtmlSelect)control;
                  
                    string propertyValue = "";
                    if (value != null)
                    {
                        //selectControl.ClearSelection();
                        propertyValue = value.ToString();
                    }
                    //根据Value="正在休息"，确定出Select中的Option的value应该付值为2，
                    int optionvalue = (int)value;
                    ListItem listItem = selectControl.Items.FindByValue(optionvalue.ToString());

                    if (listItem != null)
                    {
                        listItem.Selected = true;
                    }

                }

                if (control is ListControl)
                {
                    ListControl listControl = (ListControl)control;

                    string propertyValue = "";
                    if (value != null)
                    {
                        listControl.ClearSelection();
                        propertyValue = value.ToString();
                    }
                    ListItem listItem = listControl.Items.FindByValue(propertyValue);

                    if (listItem != null)
                    {
                        listItem.Selected = true;
                    }
                }
                else
                {
                    PropertyInfo propertyInfo = null;
                    Type controlType = control.GetType();
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("Checked");
                        if (propertyInfo != null && value == null)
                        {
                            SetValue(control, propertyInfo, false);
                            return;
                        }
                    }
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("SelectedDate");
                    }
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("Value");
                    }
                    if (propertyInfo == null)
                    {
                        propertyInfo = controlType.GetProperty("Text");
                    }
                 
                    if (propertyInfo != null)
                    {

                        SetValue(control, propertyInfo, value);

                    }
                }
            }
        }




    }
}
 
