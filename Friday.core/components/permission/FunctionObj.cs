using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public partial class SystemFunctionObjectService
    {
 
        public 统计 统计模块 { get; set; }
        public 日志模块 日志模块 { get; set; }

        public 餐馆管理 餐馆模块 { get; set; }
        public 商店管理 商店模块 { get; set; }
        public 租房管理 租房模块 { get; set; }

        //public 顾客账号管理 顾客账号管理模块 { get; set; }
        //public 商家账号管理 商家账号管理模块 { get; set; }
        
        //public 学校信息管理 学校信息管理模块 { get; set; }
        //public 自定义商品类型管理 自定义商品类型管理模块 { get; set; }
        //public 商品类型管理 商品类型管理模块 { get; set; }
        //public 商铺经营类型管理 商铺经营类型管理模块 { get; set; }
        
        //public 商家活动管理 商家活动管理模块 { get; set; }
        public 消息管理     消息模块 { get; set; }
        public 反馈管理     反馈模块 { get; set; }

        //public 食品订单管理 食品订单模块 { get; set; }
        //public 租房订单管理 租房订单模块 { get; set; }
        //public 商品订单管理 商品订单模块 { get; set; }

        public 基本信息 基本信息模块 { get; set; }

        //public 角色权限管理 角色权限管理模块 { get; set; }
        //public 功能模块管理 功能模块管理模块 { get; set; }
     

    }
    public class 餐馆管理 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 餐馆维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 菜品维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 食品订单维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 食品订单明细维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 餐馆订单评价管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 食品评价项管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 食品评价项评分管理 { get; set; }
        //[PermissionSetting(PermissionTag.Edit, PermissionTag.Enable)]
        //public FunctionTag 食品评论回复管理 { get; set; }

    }
    public class 商店管理 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商店维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable,PermissionTag.Delete)]
        public FunctionTag 商品维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商品订单维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商品订单明细维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商店订单评价管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商品评价项管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商品评价项评分管理 { get; set; }
        //[PermissionSetting(PermissionTag.Edit, PermissionTag.Enable)]
        //public FunctionTag 商品评论回复管理 { get; set; }
    }
    public class 租房管理 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 租房维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 房屋维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 租房订单维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 租房订单明细维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 租房订单评价管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 房屋评价项管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 房屋评价项评分管理 { get; set; }
        //[PermissionSetting(PermissionTag.Edit, PermissionTag.Enable)]
        //public FunctionTag 房屋评论回复管理 { get; set; }
    }
    //public class 顾客账号管理 : BaseModel
    //{
    //    [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
    //    public FunctionTag 顾客账号维护 { get; set; }
    //    [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
    //    public FunctionTag 顾客地址维护 { get; set; }
    //    [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
    //    public FunctionTag 顾客收藏夹维护 { get; set; }
    //}
    //public class 商家账号管理 : BaseModel
    //{

     
    //}
    public class 基本信息 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商铺经营类型维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 学校信息维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 自定义商品类型维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 员工维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商家账号维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 角色权限维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 功能模块维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 商家活动维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 公共商品类型维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 顾客账号维护 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 菜单管理 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 评论回复管理 { get; set; }
    }
    //public class 自定义商品类型管理 : BaseModel
    //{
    //    [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
    //    public FunctionTag 自定义商品类型维护 { get; set; }
    //}
    //public class 商品类型管理 : BaseModel
    //{

    //}
    //public class 商家活动管理 : BaseModel
    //{

    //}
    public class 消息管理 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 消息维护 { get; set; }
    }
    public class 反馈管理 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 反馈维护 { get; set; }
        //[PermissionSetting(PermissionTag.Edit, PermissionTag.Enable)]
        //public FunctionTag 反馈回复 { get; set; }
    }
    //public class 食品订单管理 : BaseModel
    //{
       
    //}
    //public class 租房订单管理 : BaseModel
    //{

    //}
    //public class 商品订单管理 : BaseModel
    //{

    //}
    //public class 角色权限管理 : BaseModel
    //{
       
    //}
    //public class 功能模块管理 : BaseModel
    //{

    //}
    public class 统计 : BaseModel
    {
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Enable, PermissionTag.Delete)]
        public FunctionTag 数据导入 { get; set; }
        [PermissionSetting(PermissionTag.Edit, PermissionTag.Delete)]
        public FunctionTag 业务受理 { get; set; }
    }
    public class 日志模块 : BaseModel
    {
        [PermissionSetting(PermissionTag.Enable)]
        public FunctionTag 日志管理 { get; set; }
    }
}
