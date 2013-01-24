using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
using Iesi.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
namespace friday.core.domain
{
    public class MyOrder:Entity
    {
        public virtual double Price  //订单总价
        {
            get;
            set; 
        }

        public virtual string OrderNumber
        {
            set;

            get;
        }
        public virtual string Description
        {
            set;
            get;
        }
        public virtual string Linkman//联系人姓名
        {
            set;

            get;
        }
        [Required(ErrorMessage = "必填项")]
        [StringLength(16, ErrorMessage = "请输入5-16位电话号码", MinimumLength = 5)]
        [RegularExpression("^-?\\d+$", ErrorMessage = "电话号码格式不正确")]
        public virtual string Tel
        {
            set;

            get;
        }
        //2013-01-06 basilwang add BackupTel for model bind and  no map
        [StringLength(16, ErrorMessage = "请输入5-16位电话号码", MinimumLength = 5)]
        [RegularExpression("^-?\\d+$", ErrorMessage = "电话号码格式不正确")]
        public virtual string BackupTel
        {
            get;
            set;
        }
        [Required(ErrorMessage = "必填项")]
        [StringLength(16, ErrorMessage = "地址长度为2--16字符", MinimumLength = 2)]
        public virtual string Address
        {
            set;

            get;
        }
        [Required(ErrorMessage = "请选择配送时间")]
        public virtual string SendTime//配送时间
        {

            set;

            get;
        }
        
        public virtual MyOrderStatusEnum OrderStatus
        {
            set;
            get;
        }
        //Order N:1 SystemUser
        public virtual Customer Customer
        {
            set;
            get;
        }
        


      
     
    }
}
