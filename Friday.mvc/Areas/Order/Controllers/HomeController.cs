using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using friday.core.domain;
using friday.core.services;
using friday.core.components;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using Friday.mvc.Models;
using friday.core;

namespace Friday.mvc.Areas.Order.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Order/Home/
        private IUserService iUserService;
        private IShoppingCartService iShoppingCartService;
        private IShopService iShopService;
        private ICartOfCommodityService iCartOfCommodityService;
        private ICommodityService iCommodityService;
        private IAddressService iAddressService;
        private ISkuService iSkuService;
        private ISkuPropService iSkuPropService;

        public HomeController(IUserService iUserService, IShoppingCartService iShoppingCartService, IShopService iShopService, ICartOfCommodityService iCartOfCommodityService, ICommodityService iCommodityService, IAddressService iAddressService, ISkuService iSkuService, ISkuPropService iSkuPropService)
        {
            this.iShopService = iShopService;
            this.iUserService = iUserService;
            this.iShoppingCartService = iShoppingCartService;
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iCommodityService = iCommodityService;
            this.iAddressService = iAddressService;
            this.iSkuService = iSkuService;
            this.iSkuPropService = iSkuPropService;
        }

        public ActionResult ConfirmOrder()
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            OrderModel orderModel = new OrderModel();
            if (systemUser == null)
            {
                return Redirect("http://www.linjuzaixian.com/member/login.jhtml?redirect_url=http://www.linjuzaixian.com/Order/Home/ConfirmOrder");
            }
            else
            {
                //配送地址信息
                foreach (Address a in systemUser.Addresses)
                {
                    if (a.prov != null&&a.IsDelete==false)
                    {
                        orderModel.address = a;
                        break;
                    }
                }

                //购物车信息
                List<ShoppingCart> shoppingCarts = iShoppingCartService.getShoppingCartBySystemUser(systemUser.Id);
                List<friday.core.CartOfCommodity> cartOfCommoditys = new List<friday.core.CartOfCommodity>();
                foreach (ShoppingCart shoppingCart in shoppingCarts)
                {
                    cartOfCommoditys.AddRange(iCartOfCommodityService.getCommoditiesByShoppingCart(shoppingCart.Id));
                }

                if (cartOfCommoditys.Count == 0)
                {
                    return Redirect("http://www.linjuzaixian.com/CartPay/Home/MyCartPay");
                }

                Dictionary<string, List<friday.core.CartOfCommodity>> merchantListItem = new Dictionary<string, List<friday.core.CartOfCommodity>>();

                Shop shop;

                //商品按商铺分类
                foreach (friday.core.CartOfCommodity cartOfCommodity in cartOfCommoditys)
                {
                    shop = cartOfCommodity.ShoppingCart.Shop;
                    if (merchantListItem.ContainsKey(shop.Id))
                    {
                        merchantListItem[shop.Id].Add(cartOfCommodity);
                    }
                    else
                    {
                        List<friday.core.CartOfCommodity> cartOfCommodities = new List<friday.core.CartOfCommodity>();
                        cartOfCommodities.Add(cartOfCommodity);
                        merchantListItem.Add(shop.Id, cartOfCommodities);
                    }
                }


                foreach (string key in merchantListItem.Keys.ToList())
                {
                    shop = iShopService.Load(key);
                    orderModel.shops.Add(shop);
                    orderModel.cartOfCommodities.Add(merchantListItem[key]);
                    //IList<friday.core.CartOfCommodity> cartOfCommodities = new List<friday.core.CartOfCommodity>();
                    IList<IList<string>> skuPropsSecond = new List<IList<string>>();
                    IList<IList<string>> skuValuesSecond = new List<IList<string>>();
                    orderModel.skuProps.Add(skuPropsSecond);
                    orderModel.skuValues.Add(skuValuesSecond);

                    foreach (friday.core.CartOfCommodity cartOfCommodity in merchantListItem[key])
                    {
                        IList<SkuProp> skuProps = iSkuPropService.GetAllSkuPropsBySkuID(cartOfCommodity.Sku.skuId.ToString());
                        IList<string> skuPropsThird = new List<string>();
                        IList<string> skuValuesThird = new List<string>();
                        skuPropsSecond.Add(skuPropsThird);
                        skuValuesSecond.Add(skuValuesThird);

                        foreach (SkuProp skuProp in skuProps)
                        {
                            skuPropsThird.Add(skuProp.PropID.PropIDName);
                            skuValuesThird.Add(skuProp.PropValue.PropValueName);
                        }

                    }
                }
            }

            return View(orderModel);
        }

        public ActionResult addBuyerAddress(string deliverPhoneBak, string deliverPhone, string deliverName, string deliverAddress, string postCode, string divisionCode,string province,string city,string distriction,string districtionName,string provinceName,string cityName)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser == null)
            {
                return Redirect("http://www.linjuzaixian.com/member/login.jhtml?redirect_url=http://www.linjuzaixian.com/Order/Home/ConfirmOrder");
            }

            IList<Address> Addresses = systemUser.Addresses.ToList();
            if (Addresses != null)
            {
                foreach (Address a in Addresses)
                {
                    if(a.IsDelete==false)
                    iAddressService.Delete(a.Id);
                }
            }

            Address address = new Address(){
                    AddressName = provinceName + " " + cityName + " " + districtionName + "" + deliverAddress,
                    StreetAddress = deliverAddress,
                    SystemUser = systemUser,
                    Tel = deliverPhone,
                    BackupTel = deliverPhoneBak,
                    Linkman = deliverName,
                    prov = province,
                    city = city,
                    dist = distriction,
                    post = postCode,
                    distName = districtionName,
                    cityName = cityName,
                    provName = provinceName
            };
            iAddressService.Save(address);

            //return Redirect("http://www.linjuzaixian.com/Order/Home/ConfirmOrder");
            string script = "{\"is_success\": 1,\"address_id\": 1199271214,\"params\":\"id=1199271214^^address=" + deliverAddress + "^^postCode=" + postCode + "^^addressee=" + deliverName + "^^phone=" + deliverPhone + "^^mobile=" + deliverPhoneBak + "^^areaCode=" + divisionCode + "\" }";
            return JavaScript(script);
        }
    }
}
