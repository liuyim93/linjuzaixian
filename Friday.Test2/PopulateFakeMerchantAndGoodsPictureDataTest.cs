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
using friday.core.services;

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
            ISchoolRepository iSchoolRepository = UnityHelper.UnityToT<ISchoolRepository>();
            ISchoolOfMerchantRepository iSchoolOfMerchantRepository = UnityHelper.UnityToT<ISchoolOfMerchantRepository>();
            IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

            IList<Commodity> iCommodities = new List<Commodity>();
            //IList<Food> iFoods = new List<Food>();
            //IList<House> iHouses = new List<House>();
            IList<Merchant> iMerchants = new List<Merchant>();
            string[] mctName = { "沃尔玛", "翠峰苑火锅", "家乐福", "小肥羊火锅", "统一银座", "天外村酒店", "大润发", "金山林快餐店", "贵和商厦", "顺风肥牛快餐", "国美商城", "全聚德烤鸭店", "苏宁购物", "便民超市", "金汉斯自助餐", "京东商厦", "加州牛肉面", "双安商厦", "北京商店", "一号店", "韩都金店", "北极星商厦", "索菲特商城", "皇冠假日商城" };
            string[] commodityName = { "T恤热卖29元起", "牛肉盒饭", "短袖", "烤全羊", "精品棉质T恤", "土豆丝", "棉质卫衣", "鸡蛋水饺", "精品特价POLO衫", "牛肉火锅", "休闲短裤", "北京烤鸭", "LV老花镜", "苹果", "巴西烤肉", "薄针织衫", "大碗牛肉面", "牛仔长裤", "卫衣", "西装", "夹克风衣", "西裤", "西服套装", "大码男装", "中老年男装", "设计潮牌", "高质量防摔太阳镜", "物美价廉妈妈鞋", "促销PU包", "玉手镯" };
            //string[] houseName = { "旋转楼梯", "总统套房", "花园别墅", "休闲卧室", "温馨餐厅", "淡雅书房", "绿色阳台"};
            //string[] foodName = { "茶叶", "蛋糕", "减肥茶", "红酒", "营养品", "花生油", "奶粉" };
            string[] gloablType = { "男士衬衫", "牛排", "大码男装", "鲜肉", "热卖T恤", "蔬菜", "女士卫衣", "蛋及制品", "POLO衫", "男士透气鞋",
                                    "牛仔短裤", "火腿", "老花镜", "真皮鞋", "鲜肉", "驾车鞋", "女士手拿包", "人造水晶","女士太阳镜","情侣表",
                                     "手镯","妈妈鞋","PU女包","饰品手镯" };
            string[] schl = { "山东财经大学", "山东建筑大学", "济南职业学院","山东师范大学","山东大学"};
            string[] areas = { "历下区", "市中区", "长清区", "高新区" };
         
            for (int j = 0; j<3; j++)
            {
                for (int i = 0; i < 24; i++)
                {

                    Shop mcht = new Shop()
                    {
                        Name =mctName[i]+":"+j+i,
                        Logo = "/uploadimage/l" + i%13 + ".png",
                        sBrand = "/uploadimage/s" + i%13 + ".jpg",
                        bBrand = "/uploadimage/b" + i%13 + ".jpg",
                        MerchantType = ((i % 2 == 0) ? MerchantTypeEnum.百货 : MerchantTypeEnum.餐馆),
                        Schools = iSchoolRepository.GetSchoolByAreasName(schl[i%4]).Id + "," + iSchoolRepository.GetSchoolByAreasName(areas[i%3]).Id + "," + iSchoolRepository.GetSchoolByAreasName("山东省").Id
                 
                    };
                    iMerchants.Add(mcht);
                    iMerchantRepository.SaveOrUpdate(mcht);

                    SchoolOfMerchant scm = new SchoolOfMerchant()
                    {
                        IsDelete = false,
                        Merchant = mcht,
                        School = iSchoolRepository.SearchByShortName(schl[i%5]),
                    };
                    iSchoolOfMerchantRepository.SaveOrUpdate(scm);



                    Commodity commodity = new Commodity()
                    {
                        Name = commodityName[i] + ":" + j + i,
                        Image = "/uploadimage/c" + (i + 1)%13 + ".jpg",

                        Shop = mcht,
                        GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(gloablType[i]),
                    //2013-05-09 basilwang 增加family
                    GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(gloablType[i]).Family,
                    };
                    iCommodityRepository.SaveOrUpdate(commodity);
                }
            }

            //国际品牌
              string[] NationalMerchat = { "优衣库", "Adidas GAP", "飞利浦", "微软", "新百伦", "Nike", "兰芝", "ELLE", "Karicare" };//{"优衣库","兰芝","微软","飞利浦","新百伦","Nike","Karicare","ELLE"};
           
              GlobalGoodsType ggdt;
              for (int i = 0; i<9;i++ )
              {
                Shop mcht = new Shop()
                {
                    Name = NationalMerchat[i],
                    Logo = "/uploadimage/l" + i  + ".png",
                    sBrand = "/uploadimage/s" + i   + ".jpg",
                    bBrand = "/uploadimage/b" + i   + ".jpg",
                    MerchantType = ((i % 2 == 0) ? MerchantTypeEnum.百货 : MerchantTypeEnum.餐馆),
                    Schools = iSchoolRepository.GetSchoolByAreasName(schl[i % 4]).Id + "," + iSchoolRepository.GetSchoolByAreasName(areas[i % 3]).Id + "," + iSchoolRepository.GetSchoolByAreasName("山东省").Id
                 
                };          
                 iMerchantRepository.SaveOrUpdate(mcht);

                 //把国际名牌的MerchantID  写入到GlobalGoodsType的Description中
                 ggdt=iGlobalGoodsTypeService.GetGlobalGoodsTypeByName(NationalMerchat[i]);
                 ggdt.Description = mcht.Id;
                 iGlobalGoodsTypeService.Save(ggdt);


                 SchoolOfMerchant scmn = new SchoolOfMerchant()
                 {
                     IsDelete = false,
                     Merchant = mcht,
                     School = iSchoolRepository.SearchByShortName(schl[i % 5]),
                 };
                 iSchoolOfMerchantRepository.SaveOrUpdate(scmn);


                 Commodity commodity = new Commodity()
                 {
                     Name = commodityName[i] ,
                     Image = "/uploadimage/c" + (i + 1) + ".jpg",

                     Shop = mcht,
                     GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(NationalMerchat[i]),
                     //2013-05-09 basilwang 增加family
                     GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(NationalMerchat[i]).Family,
                 };
                 iCommodityRepository.SaveOrUpdate(commodity);
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
