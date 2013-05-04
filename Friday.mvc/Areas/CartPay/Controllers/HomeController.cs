using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.CartPay.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /CartPay/Home/

        public ActionResult MyCartPay()
        {
            return View();
        }
        public ActionResult Render_Cart(string varName)
        {
            string script = varName+"={\"success\":true,\"globalData\":{\"totalSize\":1,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false},\"list\":[{\"id\":\"71955116\",\"title\":\"NIKE官方旗舰店\",\"type\":\"shop\",\"url\":\"http://store.taobao.com/shop/view_shop.htm?user_number_id=890482188\",\"seller\":\"nike官方旗舰店\",\"host\":\"B\",\"isValid\":true,\"gmtCompare\":1367550514000,\"bundles\":[{\"orders\":[{\"id\":\"0_0\",\"itemId\":\"17579720278\",\"skuId\":22016895152,\"cartId\":\"27740303030\",\"isValid\":true,\"url\":\"http://detail.tmall.com/item.htm?id=17579720278\",\"pic\":\"http://img01.taobaocdn.com/bao/uploaded/i1/890482188/T2IcdqXgxNXXXXXXXX_!!890482188.png_sum.jpg\",\"title\":\"Nike 耐克官方 AIR FORCE 1 '07 LE 空军一号男子运动鞋 315122\",\"skus\":{\"颜色分类\":\"白/白\",\"鞋尺码\":\"39/6.5\"},\"shopId\":\"71955116\",\"shopName\":\"NIKE官方旗舰店\",\"seller\":\"nike官方旗舰店\",\"sellerId\":890482188,\"price\":{\"now\":76900,\"origin\":76900,\"descend\":0,\"save\":0,\"sum\":76900,\"actual\":0},\"amount\":{\"now\":1,\"max\":6},\"itemIcon\":{\"PAYMENT\":[{\"title\":\"支持信用卡支付\",\"link\":\"\",\"img\":\"http://a.tbcdn.cn/sys/common/icon/trade/xcard.png\"}],\"MALL_CART_XIAOBAO\":[{\"title\":\"消费者保障服务，卖家承诺7天退换\",\"link\":\"http://www.taobao.com/go/act/315/xbqt090304.php?ad_id=&am_id=130011831021c2f3caab&cm_id=&pm_id=\",\"img\":\"http://a.tbcdn.cn/tbsp/icon/xiaobao/a_7-day_return_16x16.png\"},{\"title\":\"消费者保障服务，卖家承诺如实描述\",\"link\":\"http://www.taobao.com/go/act/315/xfzbz_rsms.php?ad_id=&am_id=130011830696bce9eda3&cm_id=&pm_id=\",\"img\":\"http://a.tbcdn.cn/tbsp/icon/xiaobao/a_true_description_16x16.png\"},{\"title\":\"消费者保障服务，卖家承诺假一赔三\",\"link\":\"http://www.taobao.com/go/act/315/xfzbz_jyps.php?ad_id=&am_id=1300118304240d56fca9&cm_id=&pm_id=\",\"img\":\"http://a.tbcdn.cn/tbsp/icon/xiaobao/an_authentic_item_16x16.png\"}]},\"isCod\":false,\"isAttention\":true}]}]}]}";
            return JavaScript(script);
        }
        public ActionResult Update_Cart()
        {
            string script = "{\"success\":true,\"globalData\":{\"totalSize\":1,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false},\"list\":[{\"id\":\"71955116\",\"orders\":[{\"id\":\"27740303030\",\"price\":{\"now\":76900,\"origin\":76900,\"descend\":0,\"save\":0,\"sum\":153800,\"actual\":0}}]}]}";
            return JavaScript(script);
        }

    }
}
