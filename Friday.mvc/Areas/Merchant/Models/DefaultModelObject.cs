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
    }
    public class DeliveryDO
    {
        public Object deliverySkuMap
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