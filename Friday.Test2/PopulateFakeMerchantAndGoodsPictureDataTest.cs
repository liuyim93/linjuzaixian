using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using System.IO;
using friday.core.EnumType;

namespace Friday.Test2
{
    /// <summary>
    /// PopulateFakeMerchantDataTest 的摘要说明
    /// </summary>
    [TestFixture]
    public class PopulateFakeMerchantAndGoodsPictureDataTest
    {
        [SetUp]
        public void init()
        {

            IRepository<Merchant> iMerchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();
            IRepository<Commodity> iCommodityRepository = UnityHelper.UnityToT<IRepository<Commodity>>();
            //IRepository<Food> iFoodRepository = UnityHelper.UnityToT<IRepository<Food>>();
            //IRepository<House> iHouseRepository = UnityHelper.UnityToT<IRepository<House>>();
            IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository =new GlobalGoodsTypeRepository();
            

            IList<Commodity> iCommodities = new List<Commodity>();
            //IList<Food> iFoods = new List<Food>();
            //IList<House> iHouses = new List<House>();
            IList<Merchant> iMerchants = new List<Merchant>();
            string[] mctName = { "沃尔玛", "翠峰苑火锅", "家乐福", "小肥羊火锅", "统一银座", "天外村酒店", "大润发", "金山林快餐店", "贵和商厦", "顺风肥牛快餐", "国美商城", "全聚德烤鸭店", "苏宁购物", "便民超市", "金汉斯自助餐", "京东商厦", "加州牛肉面" };
            string[] commodityName = { "T恤热卖29元起","牛肉盒饭","短袖","烤全羊","精品棉质T恤","土豆丝","棉质卫衣","鸡蛋水饺","精品特价POLO衫","牛肉火锅","休闲短裤","北京烤鸭","LV老花镜","苹果","巴西烤肉","薄针织衫","大碗牛肉面","牛仔长裤","卫衣","西装","夹克风衣","西裤","西服套装","大码男装","中老年男装","设计潮牌" };
            //string[] houseName = { "旋转楼梯", "总统套房", "花园别墅", "休闲卧室", "温馨餐厅", "淡雅书房", "绿色阳台"};
            //string[] foodName = { "茶叶", "蛋糕", "减肥茶", "红酒", "营养品", "花生油", "奶粉" };
            string[] gloablType = { "男士衬衫", "牛排", "大码男装", "鲜肉", "热卖T恤", "蔬菜", "女士卫衣", "蛋及制品", "POLO衫", "牛排", "牛仔短裤", "火腿", "老花镜", "水果", "鲜肉", "针织衫男士", "牛排", "牛仔短裤" };

            for (int j = 0; j<3; j++)
            {
                for (int i = 0; i < 13; i++)
                {

                    Shop mcht = new Shop()
                    {
                        Name =mctName[i]+":"+j+i,
                        Logo = "/uploadimage/l" + i + ".png",
                        sBrand = "/uploadimage/s" + i + ".jpg",
                        bBrand = "/uploadimage/b" + i + ".jpg",
                        MerchantType = ((i % 2 == 0) ? MerchantTypeEnum.百货 : MerchantTypeEnum.餐馆)
                    };
                    iMerchants.Add(mcht);
                    iMerchantRepository.SaveOrUpdate(mcht);

                    Commodity commodity = new Commodity()
                    {
                        Name = commodityName[i] + ":" + j + i,
                        Image = "/uploadimage/c" + (i + 1) + ".jpg",

                        Shop = mcht,
                        GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(gloablType[i])
                    //2013-05-09 basilwang 增加family
                    GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(gloablType[i]).Family,
                    };
                    iCommodityRepository.SaveOrUpdate(commodity);
                }
            }
            //for (int i = 0 ; i < 13; i++)
            //{
            //    Rent mcht = new Rent()
            //    {
            //        Name = mctName[i],
            //        Logo = "/uploadimage/l" + i + ".png",
            //        sBrand = "/uploadimage/s" + i + ".jpg",
            //        bBrand = "/uploadimage/b" + i + ".jpg"
            //    };
            //    iMerchants.Add(mcht);
            //    iMerchantRepository.SaveOrUpdate(mcht);

            //    GlobalGoodsType globalGoodsTypes = new friday.core.domain.GlobalGoodsType()
            //    {
            //        GoodsType = "租房"
            //    };
            //    iGlobalGoodsTypeRepository.SaveOrUpdate(globalGoodsTypes);

            //    if (i <= 6)
            //    {
            //        House house = new House()
            //        {
            //            Name = houseName[i],
            //            Image = "/uploadimage/h" + (i + 1) + ".jpg",
            //            Rent = mcht,
            //            GlobalGoodsType = globalGoodsTypes,
            //            TimeOfRentFrom = DateTime.Now,
            //            TimeOfRentTO = DateTime.Now
            //        };
            //        iHouseRepository.SaveOrUpdate(house);
            //    }
            //}

            //for (int i = 0, j = 0; i < 13; i++, j++)
            //{
            //    Restaurant mcht = new Restaurant()
            //    {
            //        Name = mctName[j],
            //        Logo = "/uploadimage/l" + i + ".png",
            //        sBrand = "/uploadimage/s" + i + ".jpg",
            //        bBrand = "/uploadimage/b" + i + ".jpg"
            //    };
            //    iMerchants.Add(mcht);
            //    iMerchantRepository.SaveOrUpdate(mcht);

            //    MerchantGoodsType merchantGoodsType = new friday.core.domain.MerchantGoodsType()
            //    {
            //        Merchant = mcht, GoodsType = "食物"
            //    };
            //    iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);

            //    if (i <= 6)
            //    {
            //        Food food = new Food()
            //        {
            //            Name = foodName[i],
            //            Image = "/uploadimage/f" + (i + 1) + ".jpg",
            //            Restaurant = mcht,
            //            MerchantGoodsType = merchantGoodsType
            //        };
            //        iFoodRepository.SaveOrUpdate(food);
            //    }
            //}

            //检查是否存在目的目录
            string filePath = System.AppDomain.CurrentDomain.BaseDirectory;
            int strLength = filePath.Length;

            if (Directory.Exists(filePath.Substring(0, strLength - 10) + @"\uploadImage\merchantPic"))
            {
                if (!Directory.Exists(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage"))
                    Directory.CreateDirectory(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage");

                //先来移动文件
                DirectoryInfo info = new DirectoryInfo(filePath.Substring(0, strLength - 10) + @"\uploadImage\merchantPic");
                FileInfo[] files = info.GetFiles();
                foreach (FileInfo file in files)
                {
                    File.Copy(Path.Combine(filePath.Substring(0, strLength - 10) + @"\uploadImage\merchantPic", file.Name), Path.Combine(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage", file.Name), true); //复制文件
                }
            }

            if (Directory.Exists(filePath.Substring(0, strLength - 10) + @"\uploadImage\commodityPic"))
            {
                if (!Directory.Exists(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage"))
                    Directory.CreateDirectory(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage");

                //先来移动文件
                DirectoryInfo info = new DirectoryInfo(filePath.Substring(0, strLength - 10) + @"\uploadImage\commodityPic");
                FileInfo[] files = info.GetFiles();
                foreach (FileInfo file in files)
                {
                    File.Copy(Path.Combine(filePath.Substring(0, strLength - 10) + @"\uploadImage\commodityPic", file.Name), Path.Combine(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage", file.Name), true); //复制文件
                }
            }

            //if (Directory.Exists(filePath.Substring(0, strLength - 10) + @"\uploadImage\foodPic"))
            //{
            //    //移动文件
            //    DirectoryInfo info = new DirectoryInfo(filePath.Substring(0, strLength - 10) + @"\uploadImage\foodPic");
            //    FileInfo[] files = info.GetFiles();
            //    foreach (FileInfo file in files)
            //    {
            //        File.Copy(Path.Combine(filePath.Substring(0, strLength - 10) + @"\uploadImage\foodPic", file.Name), Path.Combine(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage", file.Name), true); //复制文件
            //    }
            //}

            //if (Directory.Exists(filePath.Substring(0, strLength - 10) + @"\uploadImage\housePic"))
            //{
            //    //移动文件
            //    DirectoryInfo info = new DirectoryInfo(filePath.Substring(0, strLength - 10) + @"\uploadImage\housePic");
            //    FileInfo[] files = info.GetFiles();
            //    foreach (FileInfo file in files)
            //    {
            //        File.Copy(Path.Combine(filePath.Substring(0, strLength - 10) + @"\uploadImage\housePic", file.Name), Path.Combine(filePath.Substring(0, strLength - 22) + @"\Friday.mvc\uploadimage", file.Name), true); //复制文件
            //    }
            //}
        }
    }
}
