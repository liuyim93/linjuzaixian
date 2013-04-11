using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Friday.mvc.Areas.Merchant.Models
{
    public class DefaultModelObject
    {
        public bool isSuccess
        {
            get;
            set;
        }
        public DefaultModel defaultModel
        {
            get;
            set;
        }
    }
    public class DefaultModel
    {
        public DeliveryDO deliveryDO
        {
            get;
            set;
        }
        public GatewayDO gatewayDO
        {
            get;
            set;
        }
        public InventoryDo inventoryDo
        {
            get;
            set;
        }
        public ItemPriceResultDO itemPriceResultDO
        {
            get;
            set;
        }
        public MemberRightDO memberRightDO
        {
            get;
            set;
        }
        public MiscDO miscDO
        {
            get;
            set;
        }
        public SellCountDO sellCountDO
        {
            get;
            set;
        }
        //2013-04-11 pang  //[]
        public string specialServiceList
        {
            get;
            set;
        }
        public TradeResult tradeResult
        {
            get;
            set;
        }
        public UserInfoDO userInfoDO
        {
            get;
            set;
        }
    }
    public class DeliveryDO
    {
        public Object deliverySkuMap
        {
            get;
            set;
        }
        //2013-04-11 pang  //[]
        public string otherServiceList
        {
            get;
            set;
        }
    }
    public class GatewayDO
    {
        public ChangeLocationGateway changeLocationGateway
        {
            get;
            set;
        }
        public Trade trade
        {
            get;
            set;
        }
    }
    public class ChangeLocationGateway
    {
        public bool queryDelivery
        {
            get;
            set;
        }
        public bool queryProm
        {
            get;
            set;
        }
    }
    public class Trade
    {
        public object addToBuyNow
        {
            get;
            set;
        }
        public object addToCart
        {
            get;
            set;
        }
    }
    //2013-04-11 pang
    public class InventoryDo
    {
        public int icTotalQuantity
        {
            get;
            set;
        }
        public SkuQuantity skuQuantity
        {
            get;
            set;
        }
        public bool success
        {
            get;
            set;
        }
        public int totalQuantity
        {
            get;
            set;
        }
        public int type
        {
            get;
            set;
        }
    }
    public class SkuQuantity
    {
        public int quantity
        {
            get;
            set;
        }
        public int type
        {
            get;
            set;
        }
    }
    public class ItemPriceResultDO
    {
        public string areaId
        {
            get;
            set;
        }
        public string campaignInfo
        {
            get;
            set;
        }
        public bool largeScalePromOfficial
        {
            get;
            set;
        }
        public int largeScalePromPeriod
        {
            get;
            set;
        }
        public bool largeScalePromUnOfficial
        {
            get;
            set;
        }
        public bool largeScalePromUnderFiftyPOff
        {
            get;
            set;
        }
        public PriceInfo priceInfo
        {
            get;
            set;
        }
        public string promType
        {
            get;
            set;
        }
        public bool queryProm
        {
            get;
            set;
        }
        public bool umpBigPromotionItem
        {
            get;
            set;
        }
        public string wanrentuanInfo
        {
            get;
            set;
        }
    }
    public class PriceInfo
    {
        public bool areaSold
        {
            get;
            set;
        }
        public float price
        {
            get;
            set;
        }
        public string promotionList
        {
            get;
            set;
        }
        public string tagPrice
        {
            get;
            set;
        }
        public string umpBigPromotionDisplayPrice
        {
            get;
            set;
        }
    }
    public class MemberRightDO
    {
        public float discount
        {
            get;
            set;
        }
        public bool freePostage
        {
            get;
            set;
        }
        public string gradeName
        {
            get;
            set;
        }
        public int level
        {
            get;
            set;
        }
        public bool shopMember
        {
            get;
            set;
        }
        public bool success
        {
            get;
            set;
        }
        public DateTime times
        {
            get;
            set;
        }
    }
    public class MiscDO
    {
        public int sellCountDown
        {
            get;
            set;
        }
        public DateTime systemTime
        {
            get;
            set;
        }
    }
    public class SellCountDO
    {
        //{}
        public string cspuSellCountMap
        {
            get;
            set;
        }
        public int sellCount
        {
            get;
            set;
        }
    }
    //public class SpecialServiceList
    //{
    //    //[]
    //    public string specialServiceList
    //    {
    //        get;
    //        set;
    //    }
    //}
    public class TradeResult
    {
        public bool cartEnable
        {
            get;
            set;
        }
        public int cartType
        {
            get;
            set;
        }
        public bool miniTmallCartEnable
        {
            get;
            set;
        }
        public string param
        {
            get;
            set;
        }
        public string tradeDisableTypeEnum
        {
            get;
            set;
        }
        public bool tradeEnable
        {
            get;
            set;
        }
        public string tradeType
        {
            get;
            set;
        }
    }
    public class UserInfoDO
    {
        public bool juKeBuyerLogin
        {
            get;
            set;
        }
        public bool loginCC
        {
            get;
            set;
        }
        public string loginUserType
        {
            get;
            set;
        }
    }
    public class SKU
    {
        public string money
        {
            get;
            set;
        }
        public string name
        {
            get;
            set;
        }
        public string postage
        {
            get;
            set;
        }
        public bool postageFree
        {
            get;
            set;
        }
        public string signText
        {
            get;
            set;
        }
        public int type
        {
            get;
            set;
        }
    }
}