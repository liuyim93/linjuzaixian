﻿
KISSY.add("malldetail/sku/areaSell", function (D) {
    var A = D.mods.SKU, E = KISSY, H = E.DOM, G = E.Event;
    var B = [];
    var I = [];
    var F, C = true;
    A.areaSell = { init: function (L) {
        var K = { "110000": ["\u5317\u4eac", "1", "bei jing"], "110100": ["\u5317\u4eac\u5e02", "110000", "bei jing shi"], "120000": ["\u5929\u6d25", "1", "tian jin"], "120100": ["\u5929\u6d25\u5e02", "120000", "tian jin shi"], "130000": ["\u6cb3\u5317\u7701", "1", "he bei sheng"], "130100": ["\u77f3\u5bb6\u5e84\u5e02", "130000", "shi jia zhuang shi"], "130200": ["\u5510\u5c71\u5e02", "130000", "tang shan shi"], "130300": ["\u79e6\u7687\u5c9b\u5e02", "130000", "qin huang dao shi"], "130400": ["\u90af\u90f8\u5e02", "130000", "han dan shi"], "130500": ["\u90a2\u53f0\u5e02", "130000", "xing tai shi"], "130600": ["\u4fdd\u5b9a\u5e02", "130000", "bao ding shi"], "130700": ["\u5f20\u5bb6\u53e3\u5e02", "130000", "zhang jia kou shi"], "130800": ["\u627f\u5fb7\u5e02", "130000", "cheng de shi"], "130900": ["\u6ca7\u5dde\u5e02", "130000", "cang zhou shi"], "131000": ["\u5eca\u574a\u5e02", "130000", "lang fang shi"], "131100": ["\u8861\u6c34\u5e02", "130000", "heng shui shi"], "140000": ["\u5c71\u897f\u7701", "1", "shan xi sheng"], "140100": ["\u592a\u539f\u5e02", "140000", "tai yuan shi"], "140200": ["\u5927\u540c\u5e02", "140000", "da tong shi"], "140300": ["\u9633\u6cc9\u5e02", "140000", "yang quan shi"], "140400": ["\u957f\u6cbb\u5e02", "140000", "chang zhi shi"], "140500": ["\u664b\u57ce\u5e02", "140000", "jin cheng shi"], "140600": ["\u6714\u5dde\u5e02", "140000", "shuo zhou shi"], "140700": ["\u664b\u4e2d\u5e02", "140000", "jin zhong shi"], "140800": ["\u8fd0\u57ce\u5e02", "140000", "yun cheng shi"], "140900": ["\u5ffb\u5dde\u5e02", "140000", "xin zhou shi"], "141000": ["\u4e34\u6c7e\u5e02", "140000", "lin fen shi"], "141100": ["\u5415\u6881\u5e02", "140000", "lv liang shi"], "150000": ["\u5185\u8499\u53e4\u81ea\u6cbb\u533a", "1", "nei meng gu zi zhi qu"], "150100": ["\u547c\u548c\u6d69\u7279\u5e02", "150000", "hu he hao te shi"], "150200": ["\u5305\u5934\u5e02", "150000", "bao tou shi"], "150300": ["\u4e4c\u6d77\u5e02", "150000", "wu hai shi"], "150400": ["\u8d64\u5cf0\u5e02", "150000", "chi feng shi"], "150500": ["\u901a\u8fbd\u5e02", "150000", "tong liao shi"], "150600": ["\u9102\u5c14\u591a\u65af\u5e02", "150000", "e er duo si shi"], "150700": ["\u547c\u4f26\u8d1d\u5c14\u5e02", "150000", "hu lun bei er shi"], "150800": ["\u5df4\u5f66\u6dd6\u5c14\u5e02", "150000", "ba yan nao er shi"], "150900": ["\u4e4c\u5170\u5bdf\u5e03\u5e02", "150000", "wu lan cha bu shi"], "152200": ["\u5174\u5b89\u76df", "150000", "xing an meng"], "152500": ["\u9521\u6797\u90ed\u52d2\u76df", "150000", "xi lin guo le meng"], "152900": ["\u963f\u62c9\u5584\u76df", "150000", "a la shan meng"], "210000": ["\u8fbd\u5b81\u7701", "1", "liao ning sheng"], "210100": ["\u6c88\u9633\u5e02", "210000", "shen yang shi"], "210200": ["\u5927\u8fde\u5e02", "210000", "da lian shi"], "210300": ["\u978d\u5c71\u5e02", "210000", "an shan shi"], "210400": ["\u629a\u987a\u5e02", "210000", "fu shun shi"], "210500": ["\u672c\u6eaa\u5e02", "210000", "ben xi shi"], "210600": ["\u4e39\u4e1c\u5e02", "210000", "dan dong shi"], "210700": ["\u9526\u5dde\u5e02", "210000", "jin zhou shi"], "210800": ["\u8425\u53e3\u5e02", "210000", "ying kou shi"], "210900": ["\u961c\u65b0\u5e02", "210000", "fu xin shi"], "211000": ["\u8fbd\u9633\u5e02", "210000", "liao yang shi"], "211100": ["\u76d8\u9526\u5e02", "210000", "pan jin shi"], "211200": ["\u94c1\u5cad\u5e02", "210000", "tie ling shi"], "211300": ["\u671d\u9633\u5e02", "210000", "chao yang shi"], "211400": ["\u846b\u82a6\u5c9b\u5e02", "210000", "hu lu dao shi"], "220000": ["\u5409\u6797\u7701", "1", "ji lin sheng"], "220100": ["\u957f\u6625\u5e02", "220000", "chang chun shi"], "220200": ["\u5409\u6797\u5e02", "220000", "ji lin shi"], "220300": ["\u56db\u5e73\u5e02", "220000", "si ping shi"], "220400": ["\u8fbd\u6e90\u5e02", "220000", "liao yuan shi"], "220500": ["\u901a\u5316\u5e02", "220000", "tong hua shi"], "220600": ["\u767d\u5c71\u5e02", "220000", "bai shan shi"], "220700": ["\u677e\u539f\u5e02", "220000", "song yuan shi"], "220800": ["\u767d\u57ce\u5e02", "220000", "bai cheng shi"], "222400": ["\u5ef6\u8fb9\u671d\u9c9c\u65cf\u81ea\u6cbb\u5dde", "220000", "yan bian chao xian zu zi zhi zhou"], "230000": ["\u9ed1\u9f99\u6c5f\u7701", "1", "hei long jiang sheng"], "230100": ["\u54c8\u5c14\u6ee8\u5e02", "230000", "ha er bin shi"], "230200": ["\u9f50\u9f50\u54c8\u5c14\u5e02", "230000", "qi qi ha er shi"], "230300": ["\u9e21\u897f\u5e02", "230000", "ji xi shi"], "230400": ["\u9e64\u5c97\u5e02", "230000", "he gang shi"], "230500": ["\u53cc\u9e2d\u5c71\u5e02", "230000", "shuang ya shan shi"], "230600": ["\u5927\u5e86\u5e02", "230000", "da qing shi"], "230700": ["\u4f0a\u6625\u5e02", "230000", "yi chun shi"], "230800": ["\u4f73\u6728\u65af\u5e02", "230000", "jia mu si shi"], "230900": ["\u4e03\u53f0\u6cb3\u5e02", "230000", "qi tai he shi"], "231000": ["\u7261\u4e39\u6c5f\u5e02", "230000", "mu dan jiang shi"], "231100": ["\u9ed1\u6cb3\u5e02", "230000", "hei he shi"], "231200": ["\u7ee5\u5316\u5e02", "230000", "sui hua shi"], "232700": ["\u5927\u5174\u5b89\u5cad\u5730\u533a", "230000", "da xing an ling di qu"], "310000": ["\u4e0a\u6d77", "1", "shang hai"], "310100": ["\u4e0a\u6d77\u5e02", "310000", "shang hai shi"], "320000": ["\u6c5f\u82cf\u7701", "1", "jiang su sheng"], "320100": ["\u5357\u4eac\u5e02", "320000", "nan jing shi"], "320200": ["\u65e0\u9521\u5e02", "320000", "wu xi shi"], "320300": ["\u5f90\u5dde\u5e02", "320000", "xu zhou shi"], "320400": ["\u5e38\u5dde\u5e02", "320000", "chang zhou shi"], "320500": ["\u82cf\u5dde\u5e02", "320000", "su zhou shi"], "320600": ["\u5357\u901a\u5e02", "320000", "nan tong shi"], "320700": ["\u8fde\u4e91\u6e2f\u5e02", "320000", "lian yun gang shi"], "320800": ["\u6dee\u5b89\u5e02", "320000", "huai an shi"], "320900": ["\u76d0\u57ce\u5e02", "320000", "yan cheng shi"], "321000": ["\u626c\u5dde\u5e02", "320000", "yang zhou shi"], "321100": ["\u9547\u6c5f\u5e02", "320000", "zhen jiang shi"], "321200": ["\u6cf0\u5dde\u5e02", "320000", "tai zhou shi"], "321300": ["\u5bbf\u8fc1\u5e02", "320000", "su qian shi"], "330000": ["\u6d59\u6c5f\u7701", "1", "zhe jiang sheng"], "330100": ["\u676d\u5dde\u5e02", "330000", "hang zhou shi"], "330200": ["\u5b81\u6ce2\u5e02", "330000", "ning bo shi"], "330300": ["\u6e29\u5dde\u5e02", "330000", "wen zhou shi"], "330400": ["\u5609\u5174\u5e02", "330000", "jia xing shi"], "330500": ["\u6e56\u5dde\u5e02", "330000", "hu zhou shi"], "330600": ["\u7ecd\u5174\u5e02", "330000", "shao xing shi"], "330700": ["\u91d1\u534e\u5e02", "330000", "jin hua shi"], "330800": ["\u8862\u5dde\u5e02", "330000", "qu zhou shi"], "330900": ["\u821f\u5c71\u5e02", "330000", "zhou shan shi"], "331000": ["\u53f0\u5dde\u5e02", "330000", "tai zhou shi"], "331100": ["\u4e3d\u6c34\u5e02", "330000", "li shui shi"], "340000": ["\u5b89\u5fbd\u7701", "1", "an hui sheng"], "340100": ["\u5408\u80a5\u5e02", "340000", "he fei shi"], "340200": ["\u829c\u6e56\u5e02", "340000", "wu hu shi"], "340300": ["\u868c\u57e0\u5e02", "340000", "beng bu shi"], "340400": ["\u6dee\u5357\u5e02", "340000", "huai nan shi"], "340500": ["\u9a6c\u978d\u5c71\u5e02", "340000", "ma an shan shi"], "340600": ["\u6dee\u5317\u5e02", "340000", "huai bei shi"], "340700": ["\u94dc\u9675\u5e02", "340000", "tong ling shi"], "340800": ["\u5b89\u5e86\u5e02", "340000", "an qing shi"], "341000": ["\u9ec4\u5c71\u5e02", "340000", "huang shan shi"], "341100": ["\u6ec1\u5dde\u5e02", "340000", "chu zhou shi"], "341200": ["\u961c\u9633\u5e02", "340000", "fu yang shi"], "341300": ["\u5bbf\u5dde\u5e02", "340000", "su zhou shi"], "341500": ["\u516d\u5b89\u5e02", "340000", "lu an shi"], "341600": ["\u4eb3\u5dde\u5e02", "340000", "bo zhou shi"], "341700": ["\u6c60\u5dde\u5e02", "340000", "chi zhou shi"], "341800": ["\u5ba3\u57ce\u5e02", "340000", "xuan cheng shi"], "350000": ["\u798f\u5efa\u7701", "1", "fu jian sheng"], "350100": ["\u798f\u5dde\u5e02", "350000", "fu zhou shi"], "350200": ["\u53a6\u95e8\u5e02", "350000", "xia men shi"], "350300": ["\u8386\u7530\u5e02", "350000", "pu tian shi"], "350400": ["\u4e09\u660e\u5e02", "350000", "san ming shi"], "350500": ["\u6cc9\u5dde\u5e02", "350000", "quan zhou shi"], "350600": ["\u6f33\u5dde\u5e02", "350000", "zhang zhou shi"], "350700": ["\u5357\u5e73\u5e02", "350000", "nan ping shi"], "350800": ["\u9f99\u5ca9\u5e02", "350000", "long yan shi"], "350900": ["\u5b81\u5fb7\u5e02", "350000", "ning de shi"], "360000": ["\u6c5f\u897f\u7701", "1", "jiang xi sheng"], "360100": ["\u5357\u660c\u5e02", "360000", "nan chang shi"], "360200": ["\u666f\u5fb7\u9547\u5e02", "360000", "jing de zhen shi"], "360300": ["\u840d\u4e61\u5e02", "360000", "ping xiang shi"], "360400": ["\u4e5d\u6c5f\u5e02", "360000", "jiu jiang shi"], "360500": ["\u65b0\u4f59\u5e02", "360000", "xin yu shi"], "360600": ["\u9e70\u6f6d\u5e02", "360000", "ying tan shi"], "360700": ["\u8d63\u5dde\u5e02", "360000", "gan zhou shi"], "360800": ["\u5409\u5b89\u5e02", "360000", "ji an shi"], "360900": ["\u5b9c\u6625\u5e02", "360000", "yi chun shi"], "361000": ["\u629a\u5dde\u5e02", "360000", "fu zhou shi"], "361100": ["\u4e0a\u9976\u5e02", "360000", "shang rao shi"], "370000": ["\u5c71\u4e1c\u7701", "1", "shan dong sheng"], "370100": ["\u6d4e\u5357\u5e02", "370000", "ji nan shi"], "370200": ["\u9752\u5c9b\u5e02", "370000", "qing dao shi"], "370300": ["\u6dc4\u535a\u5e02", "370000", "zi bo shi"], "370400": ["\u67a3\u5e84\u5e02", "370000", "zao zhuang shi"], "370500": ["\u4e1c\u8425\u5e02", "370000", "dong ying shi"], "370600": ["\u70df\u53f0\u5e02", "370000", "yan tai shi"], "370700": ["\u6f4d\u574a\u5e02", "370000", "wei fang shi"], "370800": ["\u6d4e\u5b81\u5e02", "370000", "ji ning shi"], "370900": ["\u6cf0\u5b89\u5e02", "370000", "tai an shi"], "371000": ["\u5a01\u6d77\u5e02", "370000", "wei hai shi"], "371100": ["\u65e5\u7167\u5e02", "370000", "ri zhao shi"], "371200": ["\u83b1\u829c\u5e02", "370000", "lai wu shi"], "371300": ["\u4e34\u6c82\u5e02", "370000", "lin yi shi"], "371400": ["\u5fb7\u5dde\u5e02", "370000", "de zhou shi"], "371500": ["\u804a\u57ce\u5e02", "370000", "liao cheng shi"], "371600": ["\u6ee8\u5dde\u5e02", "370000", "bin zhou shi"], "371700": ["\u83cf\u6cfd\u5e02", "370000", "he ze shi"], "410000": ["\u6cb3\u5357\u7701", "1", "he nan sheng"], "410100": ["\u90d1\u5dde\u5e02", "410000", "zheng zhou shi"], "410200": ["\u5f00\u5c01\u5e02", "410000", "kai feng shi"], "410300": ["\u6d1b\u9633\u5e02", "410000", "luo yang shi"], "410400": ["\u5e73\u9876\u5c71\u5e02", "410000", "ping ding shan shi"], "410500": ["\u5b89\u9633\u5e02", "410000", "an yang shi"], "410600": ["\u9e64\u58c1\u5e02", "410000", "he bi shi"], "410700": ["\u65b0\u4e61\u5e02", "410000", "xin xiang shi"], "410800": ["\u7126\u4f5c\u5e02", "410000", "jiao zuo shi"], "410900": ["\u6fee\u9633\u5e02", "410000", "pu yang shi"], "411000": ["\u8bb8\u660c\u5e02", "410000", "xu chang shi"], "411100": ["\u6f2f\u6cb3\u5e02", "410000", "luo he shi"], "411200": ["\u4e09\u95e8\u5ce1\u5e02", "410000", "san men xia shi"], "411300": ["\u5357\u9633\u5e02", "410000", "nan yang shi"], "411400": ["\u5546\u4e18\u5e02", "410000", "shang qiu shi"], "411500": ["\u4fe1\u9633\u5e02", "410000", "shen yang shi"], "411600": ["\u5468\u53e3\u5e02", "410000", "zhou kou shi"], "411700": ["\u9a7b\u9a6c\u5e97\u5e02", "410000", "zhu ma dian shi"], "420000": ["\u6e56\u5317\u7701", "1", "hu bei sheng"], "420100": ["\u6b66\u6c49\u5e02", "420000", "wu han shi"], "420200": ["\u9ec4\u77f3\u5e02", "420000", "huang shi shi"], "420300": ["\u5341\u5830\u5e02", "420000", "shi yan shi"], "420500": ["\u5b9c\u660c\u5e02", "420000", "yi chang shi"], "420600": ["\u8944\u9633\u5e02", "420000", "xiang yang shi"], "420700": ["\u9102\u5dde\u5e02", "420000", "e zhou shi"], "420800": ["\u8346\u95e8\u5e02", "420000", "jing men shi"], "420900": ["\u5b5d\u611f\u5e02", "420000", "xiao gan shi"], "421000": ["\u8346\u5dde\u5e02", "420000", "jing zhou shi"], "421100": ["\u9ec4\u5188\u5e02", "420000", "huang gang shi"], "421200": ["\u54b8\u5b81\u5e02", "420000", "xian ning shi"], "421300": ["\u968f\u5dde\u5e02", "420000", "sui zhou shi"], "422800": ["\u6069\u65bd\u571f\u5bb6\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde", "420000", "en shi tu jia zu miao zu zi zhi zhou"], "430000": ["\u6e56\u5357\u7701", "1", "hu nan sheng"], "430100": ["\u957f\u6c99\u5e02", "430000", "chang sha shi"], "430200": ["\u682a\u6d32\u5e02", "430000", "zhu zhou shi"], "430300": ["\u6e58\u6f6d\u5e02", "430000", "xiang tan shi"], "430400": ["\u8861\u9633\u5e02", "430000", "heng yang shi"], "430500": ["\u90b5\u9633\u5e02", "430000", "shao yang shi"], "430600": ["\u5cb3\u9633\u5e02", "430000", "yue yang shi"], "430700": ["\u5e38\u5fb7\u5e02", "430000", "chang de shi"], "430800": ["\u5f20\u5bb6\u754c\u5e02", "430000", "zhang jia jie shi"], "430900": ["\u76ca\u9633\u5e02", "430000", "yi yang shi"], "431000": ["\u90f4\u5dde\u5e02", "430000", "chen zhou shi"], "431100": ["\u6c38\u5dde\u5e02", "430000", "yong zhou shi"], "431200": ["\u6000\u5316\u5e02", "430000", "huai hua shi"], "431300": ["\u5a04\u5e95\u5e02", "430000", "lou di shi"], "433100": ["\u6e58\u897f\u571f\u5bb6\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde", "430000", "xiang xi tu jia zu miao zu zi zhi zhou"], "440000": ["\u5e7f\u4e1c\u7701", "1", "guang dong sheng"], "440100": ["\u5e7f\u5dde\u5e02", "440000", "guang zhou shi"], "440200": ["\u97f6\u5173\u5e02", "440000", "shao guan shi"], "440300": ["\u6df1\u5733\u5e02", "440000", "shen zhen shi"], "440400": ["\u73e0\u6d77\u5e02", "440000", "zhu hai shi"], "440500": ["\u6c55\u5934\u5e02", "440000", "shan tou shi"], "440600": ["\u4f5b\u5c71\u5e02", "440000", "fo shan shi"], "440700": ["\u6c5f\u95e8\u5e02", "440000", "jiang men shi"], "440800": ["\u6e5b\u6c5f\u5e02", "440000", "zhan jiang shi"], "440900": ["\u8302\u540d\u5e02", "440000", "mao ming shi"], "441200": ["\u8087\u5e86\u5e02", "440000", "zhao qing shi"], "441300": ["\u60e0\u5dde\u5e02", "440000", "hui zhou shi"], "441400": ["\u6885\u5dde\u5e02", "440000", "mei zhou shi"], "441500": ["\u6c55\u5c3e\u5e02", "440000", "shan wei shi"], "441600": ["\u6cb3\u6e90\u5e02", "440000", "he yuan shi"], "441700": ["\u9633\u6c5f\u5e02", "440000", "yang jiang shi"], "441800": ["\u6e05\u8fdc\u5e02", "440000", "qing yuan shi"], "441900": ["\u4e1c\u839e\u5e02", "440000", "dong guan shi"], "442000": ["\u4e2d\u5c71\u5e02", "440000", "zhong shan shi"], "445100": ["\u6f6e\u5dde\u5e02", "440000", "chao zhou shi"], "445200": ["\u63ed\u9633\u5e02", "440000", "jie yang shi"], "445300": ["\u4e91\u6d6e\u5e02", "440000", "yun fu shi"], "450000": ["\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a", "1", "guang xi zhuang zu zi zhi qu"], "450100": ["\u5357\u5b81\u5e02", "450000", "nan ning shi"], "450200": ["\u67f3\u5dde\u5e02", "450000", "liu zhou shi"], "450300": ["\u6842\u6797\u5e02", "450000", "gui lin shi"], "450400": ["\u68a7\u5dde\u5e02", "450000", "wu zhou shi"], "450500": ["\u5317\u6d77\u5e02", "450000", "bei hai shi"], "450600": ["\u9632\u57ce\u6e2f\u5e02", "450000", "fang cheng gang shi"], "450700": ["\u94a6\u5dde\u5e02", "450000", "qin zhou shi"], "450800": ["\u8d35\u6e2f\u5e02", "450000", "gui gang shi"], "450900": ["\u7389\u6797\u5e02", "450000", "yu lin shi"], "451000": ["\u767e\u8272\u5e02", "450000", "bo se shi"], "451100": ["\u8d3a\u5dde\u5e02", "450000", "he zhou shi"], "451200": ["\u6cb3\u6c60\u5e02", "450000", "he chi shi"], "451300": ["\u6765\u5bbe\u5e02", "450000", "lai bin shi"], "451400": ["\u5d07\u5de6\u5e02", "450000", "chong zuo shi"], "460000": ["\u6d77\u5357\u7701", "1", "hai nan sheng"], "460100": ["\u6d77\u53e3\u5e02", "460000", "hai kou shi"], "460200": ["\u4e09\u4e9a\u5e02", "460000", "san ya shi"], "500000": ["\u91cd\u5e86", "1", "chong qing"], "500100": ["\u91cd\u5e86\u5e02", "500000", "chong qing shi"], "510000": ["\u56db\u5ddd\u7701", "1", "si chuan sheng"], "510100": ["\u6210\u90fd\u5e02", "510000", "cheng du shi"], "510300": ["\u81ea\u8d21\u5e02", "510000", "zi gong shi"], "510400": ["\u6500\u679d\u82b1\u5e02", "510000", "pan zhi hua shi"], "510500": ["\u6cf8\u5dde\u5e02", "510000", "lu zhou shi"], "510600": ["\u5fb7\u9633\u5e02", "510000", "de yang shi"], "510700": ["\u7ef5\u9633\u5e02", "510000", "mian yang shi"], "510800": ["\u5e7f\u5143\u5e02", "510000", "guang yuan shi"], "510900": ["\u9042\u5b81\u5e02", "510000", "sui ning shi"], "511000": ["\u5185\u6c5f\u5e02", "510000", "nei jiang shi"], "511100": ["\u4e50\u5c71\u5e02", "510000", "le shan shi"], "511300": ["\u5357\u5145\u5e02", "510000", "nan chong shi"], "511400": ["\u7709\u5c71\u5e02", "510000", "mei shan shi"], "511500": ["\u5b9c\u5bbe\u5e02", "510000", "yi bin shi"], "511600": ["\u5e7f\u5b89\u5e02", "510000", "guang an shi"], "511700": ["\u8fbe\u5dde\u5e02", "510000", "da zhou shi"], "511800": ["\u96c5\u5b89\u5e02", "510000", "ya an shi"], "511900": ["\u5df4\u4e2d\u5e02", "510000", "ba zhong shi"], "512000": ["\u8d44\u9633\u5e02", "510000", "zi yang shi"], "513200": ["\u963f\u575d\u85cf\u65cf\u7f8c\u65cf\u81ea\u6cbb\u5dde", "510000", "a ba zang zu qiang zu zi zhi zhou"], "513300": ["\u7518\u5b5c\u85cf\u65cf\u81ea\u6cbb\u5dde", "510000", "gan zi zang zu zi zhi zhou"], "513400": ["\u51c9\u5c71\u5f5d\u65cf\u81ea\u6cbb\u5dde", "510000", "liang shan yi zu zi zhi zhou"], "520000": ["\u8d35\u5dde\u7701", "1", "gui zhou sheng"], "520100": ["\u8d35\u9633\u5e02", "520000", "gui yang shi"], "520200": ["\u516d\u76d8\u6c34\u5e02", "520000", "liu pan shui shi"], "520300": ["\u9075\u4e49\u5e02", "520000", "zun yi shi"], "520400": ["\u5b89\u987a\u5e02", "520000", "an shun shi"], "522200": ["\u94dc\u4ec1\u5730\u533a", "520000", "tong ren di qu"], "522300": ["\u9ed4\u897f\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde", "520000", "qian xi nan bu yi zu miao zu zi zhi zhou"], "522400": ["\u6bd5\u8282\u5730\u533a", "520000", "bi jie di qu"], "522600": ["\u9ed4\u4e1c\u5357\u82d7\u65cf\u4f97\u65cf\u81ea\u6cbb\u5dde", "520000", "qian dong nan miao zu dong zu zi zhi zhou"], "522700": ["\u9ed4\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde", "520000", "qian nan bu yi zu miao zu zi zhi zhou"], "530000": ["\u4e91\u5357\u7701", "1", "yun nan sheng"], "530100": ["\u6606\u660e\u5e02", "530000", "kun ming shi"], "530300": ["\u66f2\u9756\u5e02", "530000", "qu jing shi"], "530400": ["\u7389\u6eaa\u5e02", "530000", "yu xi shi"], "530500": ["\u4fdd\u5c71\u5e02", "530000", "bao shan shi"], "530600": ["\u662d\u901a\u5e02", "530000", "zhao tong shi"], "530700": ["\u4e3d\u6c5f\u5e02", "530000", "li jiang shi"], "530800": ["\u666e\u6d31\u5e02", "530000", "pu er shi"], "530900": ["\u4e34\u6ca7\u5e02", "530000", "lin cang shi"], "532300": ["\u695a\u96c4\u5f5d\u65cf\u81ea\u6cbb\u5dde", "530000", "chu xiong yi zu zi zhi zhou"], "532500": ["\u7ea2\u6cb3\u54c8\u5c3c\u65cf\u5f5d\u65cf\u81ea\u6cbb\u5dde", "530000", "hong he ha ni zu yi zu zi zhi zhou"], "532600": ["\u6587\u5c71\u58ee\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde", "530000", "wen shan zhuang zu miao zu zi zhi zhou"], "532800": ["\u897f\u53cc\u7248\u7eb3\u50a3\u65cf\u81ea\u6cbb\u5dde", "530000", "xi shuang ban na dai zu zi zhi zhou"], "532900": ["\u5927\u7406\u767d\u65cf\u81ea\u6cbb\u5dde", "530000", "da li bai zu zi zhi zhou"], "533100": ["\u5fb7\u5b8f\u50a3\u65cf\u666f\u9887\u65cf\u81ea\u6cbb\u5dde", "530000", "de hong dai zu jing po zu zi zhi zhou"], "533300": ["\u6012\u6c5f\u5088\u50f3\u65cf\u81ea\u6cbb\u5dde", "530000", "nu jiang li su zu zi zhi zhou"], "533400": ["\u8fea\u5e86\u85cf\u65cf\u81ea\u6cbb\u5dde", "530000", "di qing zang zu zi zhi zhou"], "540000": ["\u897f\u85cf\u81ea\u6cbb\u533a", "1", "xi zang zi zhi qu"], "540100": ["\u62c9\u8428\u5e02", "540000", "la sa shi"], "542100": ["\u660c\u90fd\u5730\u533a", "540000", "chang du di qu"], "542200": ["\u5c71\u5357\u5730\u533a", "540000", "shan nan di qu"], "542300": ["\u65e5\u5580\u5219\u5730\u533a", "540000", "ri ka ze di qu"], "542400": ["\u90a3\u66f2\u5730\u533a", "540000", "na qu di qu"], "542500": ["\u963f\u91cc\u5730\u533a", "540000", "a li di qu"], "542600": ["\u6797\u829d\u5730\u533a", "540000", "lin zhi di qu"], "610000": ["\u9655\u897f\u7701", "1", "shan xi sheng"], "610100": ["\u897f\u5b89\u5e02", "610000", "xi an shi"], "610200": ["\u94dc\u5ddd\u5e02", "610000", "tong chuan shi"], "610300": ["\u5b9d\u9e21\u5e02", "610000", "bao ji shi"], "610400": ["\u54b8\u9633\u5e02", "610000", "xian yang shi"], "610500": ["\u6e2d\u5357\u5e02", "610000", "wei nan shi"], "610600": ["\u5ef6\u5b89\u5e02", "610000", "yan an shi"], "610700": ["\u6c49\u4e2d\u5e02", "610000", "han zhong shi"], "610800": ["\u6986\u6797\u5e02", "610000", "yu lin shi"], "610900": ["\u5b89\u5eb7\u5e02", "610000", "an kang shi"], "611000": ["\u5546\u6d1b\u5e02", "610000", "shang luo shi"], "620000": ["\u7518\u8083\u7701", "1", "gan su sheng"], "620100": ["\u5170\u5dde\u5e02", "620000", "lan zhou shi"], "620200": ["\u5609\u5cea\u5173\u5e02", "620000", "jia yu guan shi"], "620300": ["\u91d1\u660c\u5e02", "620000", "jin chang shi"], "620400": ["\u767d\u94f6\u5e02", "620000", "bai yin shi"], "620500": ["\u5929\u6c34\u5e02", "620000", "tian shui shi"], "620600": ["\u6b66\u5a01\u5e02", "620000", "wu wei shi"], "620700": ["\u5f20\u6396\u5e02", "620000", "zhang ye shi"], "620800": ["\u5e73\u51c9\u5e02", "620000", "ping liang shi"], "620900": ["\u9152\u6cc9\u5e02", "620000", "jiu quan shi"], "621000": ["\u5e86\u9633\u5e02", "620000", "qing yang shi"], "621100": ["\u5b9a\u897f\u5e02", "620000", "ding xi shi"], "621200": ["\u9647\u5357\u5e02", "620000", "long nan shi"], "622900": ["\u4e34\u590f\u56de\u65cf\u81ea\u6cbb\u5dde", "620000", "lin xia hui zu zi zhi zhou"], "623000": ["\u7518\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde", "620000", "gan nan zang zu zi zhi zhou"], "630000": ["\u9752\u6d77\u7701", "1", "qing hai sheng"], "630100": ["\u897f\u5b81\u5e02", "630000", "xi ning shi"], "632100": ["\u6d77\u4e1c\u5730\u533a", "630000", "hai dong di qu"], "632200": ["\u6d77\u5317\u85cf\u65cf\u81ea\u6cbb\u5dde", "630000", "hai bei zang zu zi zhi zhou"], "632300": ["\u9ec4\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde", "630000", "huang nan zang zu zi zhi zhou"], "632500": ["\u6d77\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde", "630000", "hai nan zang zu zi zhi zhou"], "632600": ["\u679c\u6d1b\u85cf\u65cf\u81ea\u6cbb\u5dde", "630000", "guo luo zang zu zi zhi zhou"], "632700": ["\u7389\u6811\u85cf\u65cf\u81ea\u6cbb\u5dde", "630000", "yu shu zang zu zi zhi zhou"], "632800": ["\u6d77\u897f\u8499\u53e4\u65cf\u85cf\u65cf\u81ea\u6cbb\u5dde", "630000", "hai xi meng gu zu zang zu zi zhi zhou"], "640000": ["\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a", "1", "ning xia hui zu zi zhi qu"], "640100": ["\u94f6\u5ddd\u5e02", "640000", "yin chuan shi"], "640200": ["\u77f3\u5634\u5c71\u5e02", "640000", "shi zui shan shi"], "640300": ["\u5434\u5fe0\u5e02", "640000", "wu zhong shi"], "640400": ["\u56fa\u539f\u5e02", "640000", "gu yuan shi"], "640500": ["\u4e2d\u536b\u5e02", "640000", "zhong wei shi"], "650000": ["\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a", "1", "xin jiang wei wu er zi zhi qu"], "650100": ["\u4e4c\u9c81\u6728\u9f50\u5e02", "650000", "wu lu mu qi shi"], "650200": ["\u514b\u62c9\u739b\u4f9d\u5e02", "650000", "ke la ma yi shi"], "652100": ["\u5410\u9c81\u756a\u5730\u533a", "650000", "tu lu fan di qu"], "652200": ["\u54c8\u5bc6\u5730\u533a", "650000", "ha mi di qu"], "652300": ["\u660c\u5409\u56de\u65cf\u81ea\u6cbb\u5dde", "650000", "chang ji hui zu zi zhi zhou"], "652700": ["\u535a\u5c14\u5854\u62c9\u8499\u53e4\u81ea\u6cbb\u5dde", "650000", "bo er ta la meng gu zi zhi zhou"], "652800": ["\u5df4\u97f3\u90ed\u695e\u8499\u53e4\u81ea\u6cbb\u5dde", "650000", "ba yin guo leng meng gu zi zhi zhou"], "652900": ["\u963f\u514b\u82cf\u5730\u533a", "650000", "a ke su di qu"], "653000": ["\u514b\u5b5c\u52d2\u82cf\u67ef\u5c14\u514b\u5b5c\u81ea\u6cbb\u5dde", "650000", "ke zi le su ke er ke zi zi zhi zhou"], "653100": ["\u5580\u4ec0\u5730\u533a", "650000", "ka shi di qu"], "653200": ["\u548c\u7530\u5730\u533a", "650000", "he tian di qu"], "654000": ["\u4f0a\u7281\u54c8\u8428\u514b\u81ea\u6cbb\u5dde", "650000", "yi li ha sa ke zi zhi zhou"], "654200": ["\u5854\u57ce\u5730\u533a", "650000", "ta cheng di qu"], "654300": ["\u963f\u52d2\u6cf0\u5730\u533a", "650000", "a le tai di qu"], "710000": ["\u53f0\u6e7e\u7701", "1", "tai wan sheng"], "710100": ["\u53f0\u5317\u5e02", "710000", "tai bei shi"], "710200": ["\u9ad8\u96c4\u5e02", "710000", "gao xiong shi"], "710300": ["\u53f0\u5357\u5e02", "710000", "tai nan shi"], "710400": ["\u53f0\u4e2d\u5e02", "710000", "tai zhong shi"], "710500": ["\u91d1\u95e8\u53bf", "710000", "jin men xian"], "710600": ["\u5357\u6295\u53bf", "710000", "nan tou xian"], "710700": ["\u57fa\u9686\u5e02", "710000", "ji long shi"], "710800": ["\u65b0\u7af9\u5e02", "710000", "xin zhu shi"], "710900": ["\u5609\u4e49\u5e02", "710000", "jia yi shi"], "810000": ["\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a", "1", "xiang gang te bie xing zheng qu"], "810100": ["\u9999\u6e2f\u5c9b", "810000", "xiang gang dao"], "810200": ["\u4e5d\u9f99", "810000", "jiu long"], "810300": ["\u65b0\u754c", "810000", "xin jie"], "820000": ["\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a", "1", "ao men te bie xing zheng qu"], "820100": ["\u6fb3\u95e8\u534a\u5c9b", "820000", "ao men ban dao"], "820200": ["\u79bb\u5c9b", "820000", "li dao"], "990000": ["\u6d77\u5916", "1", "hai wai"], "990100": ["\u6d77\u5916", "990000", "hai wai"] };
        var J = D.cfg();
        if (!J.isAreaSell) {
            return
        }
        if (typeof L != "undefined" && L && typeof L.allAreaSold != "undefined" && typeof L.soldAreas != "undefined") {
            F = L.allAreaSold;
            if (!F) {
                E.each(K, function (O, N) {
                    if (L.soldAreas) {
                        var M = 0;
                        for (var M = 0; M < L.soldAreas.length; M++) {
                            if (N == L.soldAreas[M]) {
                                break
                            }
                        }
                        if (M == L.soldAreas.length) {
                            I.push(N)
                        }
                    }
                })
            }
        }
    }, getUnSupportCity: function (J) {
        B.push(J);
        E.each(B, function (K) {
            if (typeof K == "function") {
                if (I.length == 0) {
                    K([])
                } else {
                    K(I)
                }
            }
        })
    }, getFirstAreaSold: function () {
        if (!F) {
            var J = H.get("#J_TreeSelectTrigger");
            if (J) {
                var K = A.Service.getAreaID() || H.attr(J, "data-code");
                E.each(I, function (M) {
                    var L = K.toString().substr(0, 4) + "00";
                    if (L == M) {
                        C = false
                    }
                })
            }
        }
        return C
    } 
    }
}, { requires: [] }); /*pub-1|2013-02-28 21:14:23*/