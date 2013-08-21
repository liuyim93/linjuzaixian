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
using System.Drawing;

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

            IMerchantRepository iMerchantRepository = UnityHelper.UnityToT<IMerchantRepository>();
            IRepository<Commodity> iCommodityRepository = UnityHelper.UnityToT<IRepository<Commodity>>();
            //IRepository<Food> iFoodRepository = UnityHelper.UnityToT<IRepository<Food>>();
            //IRepository<House> iHouseRepository = UnityHelper.UnityToT<IRepository<House>>();
            IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository =new GlobalGoodsTypeRepository();
            ISchoolRepository iSchoolRepository = UnityHelper.UnityToT<ISchoolRepository>();
            IShopRepository iShopRepository = UnityHelper.UnityToT<IShopRepository>();
            ISchoolOfMerchantRepository iSchoolOfMerchantRepository = UnityHelper.UnityToT<ISchoolOfMerchantRepository>();
            IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

            ISkuRepository skurep = new SkuRepository();
            ISkuPropRepository skuProprep = new SkuPropRepository();
            IPropIDRepository propIDrep = new PropIDRepository();
            IPropValueRepository propValuerep = new PropValueRepository();

            IRepository<PropID> iPropIDRepository = UnityHelper.UnityToT<IRepository<PropID>>();
            IRepository<PropValue> iPropValueRepository = UnityHelper.UnityToT<IRepository<PropValue>>();
            IRepository<SkuProp> iSkuPropRepository = UnityHelper.UnityToT<IRepository<SkuProp>>();

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
            string[] schl = { "山东经济学院", "山东建筑大学", "济南职业学院","山东师范大学","山东大学"};
            string[] areas = { "历下区", "市中区", "长清区", "高新区" };

            for (int j = 0; j < 3; j++)
            {
                for (int i = 0; i < 24; i++)
                {

                    Shop mcht = new Shop()
                    {
                        Name = mctName[i] + ":" + j + i,
                        Logo = "/uploadimage/l" + i % 13 + ".png",
                        sBrand = "/uploadimage/s" + i % 13 + ".jpg",
                        bBrand = "/uploadimage/b" + i % 13 + ".jpg",
                        MerchantType = ((i % 2 == 0) ? MerchantTypeEnum.百货 : MerchantTypeEnum.餐馆),
                        Schools = iSchoolRepository.GetSchoolByAreasName(schl[i % 4]).Id + "," + iSchoolRepository.GetSchoolByAreasName(areas[i % 3]).Id + "," + iSchoolRepository.GetSchoolByAreasName("济南市").Id + "," + iSchoolRepository.GetSchoolByAreasName("山东省").Id

                    };
                    iMerchants.Add(mcht);
                    iMerchantRepository.SaveOrUpdate(mcht);

                    //添加规格类型
                    IList<PropID> iPropIDs = new List<PropID>();

                    PropID ppt1 = new PropID()
                    {
                        //Id = 1627207,
                        PropIDName = "颜色",
                        IsDelete = false,
                        Merchant = mcht
                    };
                    iPropIDs.Add(ppt1);
                    PropID ppt2 = new PropID()
                    {
                        //Id = 21921,
                        PropIDName = "尺寸",
                        IsDelete = false,
                        Merchant = mcht
                    };
                    iPropIDs.Add(ppt2);
                    foreach (PropID a in iPropIDs)
                    {
                        iPropIDRepository.SaveOrUpdate(a);
                    }

                    //添加规格明细
                    IList<PropValue> iPropValues = new List<PropValue>();

                    //颜色明细
                    PropValue ppv1_1 = new PropValue()
                    {
                        PropValueName = "粉红",
                        IsDelete = false,
                        PropID = ppt1,
                        Merchant = mcht
                    };
                    iPropValues.Add(ppv1_1);
                    PropValue ppv1_2 = new PropValue()
                    {
                        PropValueName = "蓝色",
                        IsDelete = false,
                        PropID = ppt1,
                        Merchant = mcht
                    };
                    iPropValues.Add(ppv1_2);
                    PropValue ppv1_3 = new PropValue()
                    {
                        PropValueName = "橘黄色",
                        IsDelete = false,
                        PropID = ppt1,
                        Merchant = mcht
                    };
                    iPropValues.Add(ppv1_3);
                    foreach (PropValue a in iPropValues)
                    {
                        iPropValueRepository.SaveOrUpdate(a);
                    }

                    //尺寸明细
                    IList<PropValue> iPropValues2 = new List<PropValue>();
                    PropValue ppv2_1 = new PropValue()
                    {
                        PropValueName = "S",
                        IsDelete = false,
                        PropID = ppt2,
                        Merchant = mcht
                    };
                    iPropValues2.Add(ppv2_1);
                    PropValue ppv2_2 = new PropValue()
                    {
                        PropValueName = "M",
                        IsDelete = false,
                        PropID = ppt2,
                        Merchant = mcht
                    };
                    iPropValues2.Add(ppv2_2);
                    PropValue ppv2_3 = new PropValue()
                    {
                        PropValueName = "L",
                        IsDelete = false,
                        PropID = ppt2,
                        Merchant = mcht
                    };
                    iPropValues2.Add(ppv2_3);
                    PropValue ppv2_4 = new PropValue()
                    {
                        PropValueName = "XL",
                        IsDelete = false,
                        PropID = ppt2,
                        Merchant = mcht
                    };
                    iPropValues2.Add(ppv2_4);
                    foreach (PropValue a in iPropValues2)
                    {
                        iPropValueRepository.SaveOrUpdate(a);
                    }



                    SchoolOfMerchant scm = new SchoolOfMerchant()
                    {
                        IsDelete = false,
                        Merchant = mcht,
                        School = iSchoolRepository.SearchByShortName(schl[i % 5]),
                    };
                    iSchoolOfMerchantRepository.SaveOrUpdate(scm);



                    Commodity commodity = new Commodity()
                    {
                        Name = commodityName[i] + ":" + j + i,
                        Image = "/uploadimage/c" + (i + 1) % 13 + ".jpg",

                        Shop = mcht,
                        GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(gloablType[i]),
                        //2013-05-09 basilwang 增加family
                        GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(gloablType[i]).Family,
                        
                        Price = i+10,                 
                        IsDiscount = false,
                        InventoryCount = 100+i*10,              
                        Amount = 100+i*5,
                        AverageValuing = 1+i%5,
                        DiscountInventoryCount = 50+i*5,
                        DiscountPrice = 0.5+i%9,
                        MonthAmount = 300+ i * 5,
                        OldPrice = i,
                        ValuingCount = i*4,
                        IsEnabled = true,
                        IsLimited = false,
                        Description = "五一大促销"+i
                    };
                    iCommodityRepository.SaveOrUpdate(commodity);

                    int skuConut = new Random().Next(12);
                    for (int sj = 0, l = 0, m = 0; sj <= skuConut; sj++)
                    {
                        Sku skus = new Sku()
                        {
                            Commodity = commodity,
                            price = skuConut * 10 + sj * 10,
                            priceCent = sj,
                            stock = sj * 5,
                        };
                        skurep.SaveOrUpdate(skus);

                        //颜色
                        //int pVauCnColor = new Random().Next(iPropValues.Count);//规格明细
                        SkuProp skpcolor = new SkuProp()
                        {
                            PropID = ppt1,
                            PropValue = iPropValues[l / 4],
                            SKU = skus
                        };
                        iSkuPropRepository.SaveOrUpdate(skpcolor);
                        l++;
                        //尺寸
                        //int pVauCntSize = new Random().Next(iPropValues2.Count);//规格明细
                        SkuProp skpsize = new SkuProp()
                        {
                            PropID = ppt2,
                            PropValue = iPropValues2[m % 4],
                            SKU = skus
                        };
                        iSkuPropRepository.SaveOrUpdate(skpsize);
                        m++;

                    }
                }
            }

            //国际品牌
              string[] NationalMerchat = { "优衣库", "Adidas GAP", "飞利浦", "微软", "新百伦", "Nike", "兰芝", "ELLE", "Karicare" };//{"优衣库","兰芝","微软","飞利浦","新百伦","Nike","Karicare","ELLE"};

              GlobalGoodsType ggdt;
              for (int i = 0; i < 9; i++)
              {
                  Shop mcht = new Shop()
                  {
                      Name = NationalMerchat[i],
                      Logo = "/uploadimage/l" + i + ".png",
                      sBrand = "/uploadimage/s" + i + ".jpg",
                      bBrand = "/uploadimage/b" + i + ".jpg",
                      MerchantType = ((i % 2 == 0) ? MerchantTypeEnum.百货 : MerchantTypeEnum.餐馆),
                      Schools = iSchoolRepository.GetSchoolByAreasName(schl[i % 4]).Id + "," + iSchoolRepository.GetSchoolByAreasName(areas[i % 3]).Id + "," + iSchoolRepository.GetSchoolByAreasName("济南市").Id + "," + iSchoolRepository.GetSchoolByAreasName("山东省").Id

                  };
                  iMerchantRepository.SaveOrUpdate(mcht);

                  //添加规格类型
                  IList<PropID> iPropIDsNM = new List<PropID>();

                  PropID pptNM1 = new PropID()
                  {
                      //Id = 1627207,
                      PropIDName = "颜色",
                      IsDelete = false,
                      Merchant = mcht
                  };
                  iPropIDsNM.Add(pptNM1);
                  PropID pptNM2 = new PropID()
                  {
                      //Id = 21921,
                      PropIDName = "尺寸",
                      IsDelete = false,
                      Merchant = mcht
                  };
                  iPropIDsNM.Add(pptNM2);
                  foreach (PropID a in iPropIDsNM)
                  {
                      iPropIDRepository.SaveOrUpdate(a);
                  }

                  //添加规格明细
                  IList<PropValue> iPropValuesNM = new List<PropValue>();
                  //颜色明细
                  PropValue ppvNM1_1 = new PropValue()
                  {
                      PropValueName = "粉红",
                      IsDelete = false,
                      PropID = pptNM1,
                      Merchant = mcht
                  };
                  iPropValuesNM.Add(ppvNM1_1);
                  PropValue ppvNM1_2 = new PropValue()
                  {
                      PropValueName = "蓝色",
                      IsDelete = false,
                      PropID = pptNM1,
                      Merchant = mcht
                  };
                  iPropValuesNM.Add(ppvNM1_2);
                  PropValue ppvNM1_3 = new PropValue()
                  {
                      PropValueName = "橘黄色",
                      IsDelete = false,
                      PropID = pptNM1,
                      Merchant = mcht
                  };
                  iPropValuesNM.Add(ppvNM1_3);
                  foreach (PropValue a in iPropValuesNM)
                  {
                      iPropValueRepository.SaveOrUpdate(a);
                  }

                  //尺寸明细
                  IList<PropValue> iPropValuesNM2 = new List<PropValue>();
                  PropValue ppvNM2_1 = new PropValue()
                  {
                      PropValueName = "S",
                      IsDelete = false,
                      PropID = pptNM2,
                      Merchant = mcht
                  };
                  iPropValuesNM2.Add(ppvNM2_1);
                  PropValue ppvNM2_2 = new PropValue()
                  {
                      PropValueName = "M",
                      IsDelete = false,
                      PropID = pptNM2,
                      Merchant = mcht
                  };
                  iPropValuesNM2.Add(ppvNM2_2);
                  PropValue ppvNM2_3 = new PropValue()
                  {
                      PropValueName = "L",
                      IsDelete = false,
                      PropID = pptNM2,
                      Merchant = mcht
                  };
                  iPropValuesNM2.Add(ppvNM2_3);
                  PropValue ppvNM2_4 = new PropValue()
                  {
                      PropValueName = "XL",
                      IsDelete = false,
                      PropID = pptNM2,
                      Merchant = mcht
                  };
                  iPropValuesNM2.Add(ppvNM2_4);
                  foreach (PropValue a in iPropValuesNM2)
                  {
                      iPropValueRepository.SaveOrUpdate(a);
                  }








                  //把国际名牌的MerchantID  写入到GlobalGoodsType的Description中
                  ggdt = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName(NationalMerchat[i]);
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
                      Name = commodityName[i],
                      Image = "/uploadimage/c" + (i + 1) + ".jpg",

                      Shop = mcht,
                      GlobalGoodsType = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(NationalMerchat[i]),
                      //2013-05-09 basilwang 增加family
                      GlobalGoodsTypeFamily = iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName(NationalMerchat[i]).Family,

                      Price = i + 10,
                      IsDiscount = false,
                      InventoryCount = 100 + i * 10,
                      Amount = 100 + i * 5,
                      AverageValuing = 1 + i % 5,
                      DiscountInventoryCount = 50 + i * 5,
                      DiscountPrice = 0.5 + i % 9,
                      MonthAmount = 300 + i * 5,
                      OldPrice = i,
                      ValuingCount = i * 4,
                      IsEnabled = true,
                      IsLimited = false,
                      Description = "五一大促销" + i
                  };
                  iCommodityRepository.SaveOrUpdate(commodity);
                  int skuConut = new Random().Next(12);
                  for (int sj = 0, l = 0, m = 0; sj <= skuConut; sj++)
                  {
                      Sku skus = new Sku()
                      {
                          Commodity = commodity,
                          price = skuConut * 10 + sj * 10,
                          priceCent = sj,
                          stock = sj * 5,
                      };
                      skurep.SaveOrUpdate(skus);

                      //颜色
                      //int pVauCnColor = new Random().Next(iPropValues.Count);//规格明细
                      SkuProp skpcolor = new SkuProp()
                      {
                          PropID = pptNM1,
                          PropValue = iPropValuesNM[l / 4],
                          SKU = skus
                      };
                      iSkuPropRepository.SaveOrUpdate(skpcolor);
                      l++;
                      //尺寸
                      //int pVauCntSize = new Random().Next(iPropValues2.Count);//规格明细
                      SkuProp skpsize = new SkuProp()
                      {
                          PropID = pptNM2,
                          PropValue = iPropValuesNM2[m % 4],
                          SKU = skus
                      };
                      iSkuPropRepository.SaveOrUpdate(skpsize);
                      m++;

                  }


              }

              //国际品牌中添加银座
              //2013-08-21 basilwang 不要在Description中加id
              //GlobalGoodsType ggdtyz = iGlobalGoodsTypeService.GetGlobalGoodsTypeByName("银座商城");
              //ggdtyz.Description = iShopRepository.SearchByShortName("银座").Id;
              //iGlobalGoodsTypeService.Save(ggdtyz); 


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
                    int[][] imageSize = new int[][] { new int[] { 460, 460 }, new int[] { 120, 120 }, new int[] { 60, 60 }, new int[] { 40, 40 }, new int[] { 160, 160 }, new int[] { 200, 300 } };
                    string genaratePicPath = "";
                    System.Drawing.Image originalImage = System.Drawing.Image.FromFile(filePath.Substring(0, strLength - 10) + @"\uploadImage\commodityPic\" + file.Name);
                    foreach (int[] size in imageSize)
                    {
                        int towidth = size[0];
                        int toheight = size[1];

                        int x = 0;
                        int y = 0;
                        int ow = originalImage.Width;
                        int oh = originalImage.Height;

                        //新建一个bmp图片
                        System.Drawing.Image bitmap = new System.Drawing.Bitmap(towidth, toheight);

                        //新建一个画板
                        Graphics g = System.Drawing.Graphics.FromImage(bitmap);

                        //设置高质量插值法
                        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

                        //设置高质量,低速度呈现平滑程度
                        g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

                        //清空画布并以透明背景色填充
                        g.Clear(Color.Transparent);

                        //在指定位置并且按指定大小绘制原图片的指定部分
                        g.DrawImage(originalImage, new Rectangle(0, 0, towidth, toheight),
                         new Rectangle(x, y, ow, oh),
                         GraphicsUnit.Pixel);

                        try
                        {
                            //以jpg格式保存缩略图
                            genaratePicPath = filePath.Substring(0, strLength - 10) + @"\uploadImage\commodityPic\" + file.Name + "_" + towidth + "x" + toheight + file.Extension;
                            switch (file.Extension)
                            {
                                case ".gif": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Gif); break;
                                case ".jpg": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Jpeg); break;
                                case ".bmp": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Bmp); break;
                                case ".png": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Png); break;
                            }
                            //result = ((result == "") ? "" : result + ";") + "/uploadimage/" + ParentPath + "/" + filesnewName + "_" + size + "x" + size + fileExtension;

                        }
                        catch (System.Exception e)
                        {
                            throw e;
                        }
                        finally
                        {
                            bitmap.Dispose();
                            g.Dispose();
                        }
                    }
                    originalImage.Dispose();
                }

                files = info.GetFiles();
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
