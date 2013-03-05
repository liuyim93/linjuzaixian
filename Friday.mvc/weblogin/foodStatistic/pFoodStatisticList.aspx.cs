using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.domain;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.foodStatistic
{
    public partial class pFoodStatisticList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string name;
        protected string foodName;
 
       IFoodStatisticService iFoodStatisticService = UnityHelper.UnityToT<IFoodStatisticService>();

        protected void Page_Load(object sender, EventArgs e)
        {
        
            if (Request.Params["flag"] != "alldelete")
            {
                if (Request.Params["flag"] != "alldelete")
                {
                    numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                    pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                    int start = (pageNum - 1) * numPerPageValue;
                    int limit = numPerPageValue;

                    List<DataFilter> filterList = new List<DataFilter>();
                    List<DataFilter> foodList = new List<DataFilter>();
                    

                    if (!string.IsNullOrEmpty(Request.Form["Name"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "Name",
                            value = name = Request.Form["Name"]

                        });

                    if (!string.IsNullOrEmpty(this.FoodID.Value))
                      {
                          foodList.Add(new DataFilter()
                        {
                            type = "Food",
                            value = Request.Form["FoodID"]

                        });
                          filterList.Add(new DataFilter()
                          {
                              type = "Food",
                              field = foodList
                          });
                        foodName = Request.Form["Food"];
                      }                                 
                    var filter = new DataFilter();
                    if (!string.IsNullOrEmpty(Request.Form["StartDate"]))
                    {
                        filter.type = "CreateTime";
                        filter.value = startDate = Request.Form["StartDate"];
                        if (!string.IsNullOrEmpty(Request.Form["EndDate"]))
                        {
                            filter.valueForCompare = endDate = Request.Form["EndDate"];
                        }
                        filterList.Add(filter);
                    }

                    IList<FoodStatistic> foodStatisticList = iFoodStatisticService.Search(filterList, start, limit, out total);

                    repeater.DataSource = foodStatisticList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }

            else
            {               

                DeleteFoodStatistic();

            }

        }




        private void DeleteFoodStatistic()
        {


            iFoodStatisticService.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "删除成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }

    }
}