/// <reference path="jquery-1.3.2-vsdoc.js" />
/*
基于jQuery的单据输入
author : Snryang,Basil
Date   : 2008-11-4 10:28:00
blog   : http://snryang.cnblogs.com
            http://www.basilwang.net
修改历史：
2008-11-17 增加删除之前之后事件
2008-11-18 增加单元得得到焦点与失去焦点事件  暂时作废  因为与activeCell()方法类似
2008-11-18 当单元格有数据验证时，如果单元格类型为下拉列表框则给验证方法传入的是下拉列表框的值。
2008-11-18 为snTable对象增加了getCurrentCell方法 得到表格中当前单元格对象
2008-11-24 增加exitEdit 为snTable增加退出编辑状态方法
2008-12-05 New(sn_Cell,[cell]).text( datas[i][el.config.Field] ? datas[i][el.config.Field].toString() : "" ); 改为下面语句，不然绑定数据时单元格中不能显示0值
New(sn_Cell,[cell]).text( datas[i][el.config.Field] != undefined ? datas[i][el.config.Field].toString() : "" );
2009-07-13 重构了Sntable
2011-01-06 参考jquery 插件形式重构sntable 
*/ 
;(function($) {
    $.fn.extend({
        sntable: function(o) {

            //初始化列的属性设置
            return new $.sntable(this, o);
        },
        //2011-05-07 王华杰  使用$('#snryang').setInputValue或者gpage.jObj('snryang').setInputValue赋值
        setInputValue: function(value) {
            return this.trigger("setInputValue", value);
        }
    });
    $.sntable = function(table, o) {
        var element = table.get(0);
        var rows = element.tBodies[0].rows;
        var cols;
        var currentElement = null;
        var helpInput = null;
        if (!o) return;
        var isAllowAddRow = o.config.isAllowAddRow || false;
        o.event = o.event || {};
        var config = {};
        config.event = {
            runClick: true,
            runKeyUp: true,
            runValidateCell: true,
            snTableOnChange: o.event.snTableOnChange || null,
            snTableOnKeyUp: o.event.snTableOnKeyUp || null,
            snTableDeletedBefore: o.event.snTableDeletedBefore || null,
            snTableDeletedAfter: o.event.snTableDeletedAfter || null,
            snTableValidateCell: o.event.snTableValidateCell || null,
            snTableRowDataBinding: o.event.snTableRowDataBinding || null,
            snTableCellDataBinding: o.event.snTableCellDataBinding || null
        };
        table.wrap("<div></div>");
        cols=computeTableHeaderCellIndexes();
        $.each(cols,function(i, el) {
            var jel = jQuery(el);
            el.config = {
                Field: o.fields[i].Field || jel.attr("Field") || "sn_NoField",
                Text: o.fields[i].Text || jel.attr("Text") || el.innerText,
                Editable: o.fields[i].Editable || jel.attr("Editable") || false,
                Hide: o.fields[i].Hide || jel.attr("Hide") || false,
                Option: o.fields[i].Option || jel.attr("Option") || null,
                Validator: o.fields[i].Validator || o.fields[i].FV || jel.attr("Validator") || null,
                Complete: o.fields[i].Complete || jel.attr("Complete") || false,
                Default: o.fields[i].Default || jel.attr("Default") || "",
                ToFixed: o.fields[i].ToFixed || jel.attr("ToFixed") || -1,
                Percent: o.fields[i].Percent || jel.attr("Percent") || false,
                Action: o.fields[i].Action || null,
                UrlOrData: o.fields[i].UrlOrData || null,
                //2011-04-26 王华杰 传递Params给autocomplete控件
                Params: o.fields[i].Params || null,
                //2011-05-07 王华杰 开窗url
                WinOpts: o.fields[i].WinOpts || null,
                //2011-05-17 王华杰 超链接 （如果显示超链接，必须为Editable=false）
                DownloadUrl: o.fields[i].DownloadUrl || null,
                ArgField: o.fields[i].ArgField || null,
                ControlType: o.fields[i].ControlType || 1,   //1:input 2:select 3:autocomplete 4:date
                Alignment: o.fields[i].Alignment || null     //对齐方式

            }
            var c;
            switch (el.config.ControlType) {
                case 1:
                    c = $("<input/>").attr("snindex", i).css("position", "absolute").hide().insertAfter(table);
                    break;
                case 2:
                    c = $("<select/>").attr("snindex", i).css("position", "absolute").hide().insertAfter(table);
                    break;
                case 3:
                    c = $("<input/>").attr("snindex", i).css("position", "absolute").hide().insertAfter(table);
                    //2011-04-26 王华杰 传递Params给autocomplete控件
                    c.autocomplete(el.config.UrlOrData, el.config.Params);
                    break;
                case 4:
                    c = $("<input/>").attr("snindex", i).css("position", "absolute").hide().addClass("date").insertAfter(table);
                    c.datepicker();
                    break;
            }
            //2011-05-07 王华杰 绑定dbclick事件
            //TODO　是否其他方式处理（比如选择按钮）
            //TODO 需要考虑开窗点击取消按钮时的处理
            if (el.config.WinOpts) {
                c.bind("dblclick", function() {
                    //TODO options是否应该移到外面配置
                    /*
                    options.mask = true;
                    options.width = "600";
                    options.height = "400";
                    options.rel = "_blank";
                    options.max = false;
                    options.callback = el.config.Callback;
                    */
                    el.config.WinOpts.mask = true;
                    $.pdialog.open(el.config.WinOpts.WindowUrl, el.config.WinOpts.rel, el.config.WinOpts.title, el.config.WinOpts);

                });
            }

            //2011-01-11 王华杰 此时不处理，当第一次click时应该判断helpInput是否为空
            //(helpInput为空则currentElement一定为空，该假设是否成立？如果保证删除和退出编辑时同时处理，应该没问题)
            //            if (helpInput == null)
            //                helpInput = c;
            c.bind("keyup", KeyUp);


            if (el.config.Hide) jel.hide();
            jel.text(el.config.Text);
        });
        var tbody = table.find("tbody:first");
        //2011-05-07 王华杰 增加赋值事件（此处利用闭包），使用$('#snryang').setInputValue或者gpage.jObj('snryang').setInputValue赋值
        table.bind('setInputValue', function() {
            if (helpInput != null) {
                //2011-05-07 王华杰 arguments[0] 为jQuery.Event
                helpInput.val(arguments[1]);
                helpInput.focus();
            }
        });
        tbody.bind('click', click);
        //王华杰 不允许tbody响应keyup
        //       tbody.bind('keyup', jQuery.snTable.keyUp);
        tbody.empty();
        
         function computeTableHeaderCellIndexes(t) {
                var matrix = [];
                var lookup = {};
                var thead = table.find("thead:first");
                var trs = thead.find("tr");
                var cols=[];
                for (var i = 0; i < trs.length; i++) {
                    var cells = trs[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var c = cells[j];

                        var rowIndex = c.parentNode.rowIndex;
                        var cellId = rowIndex + "-" + c.cellIndex;
                        var rowSpan = c.rowSpan || 1;
                        var colSpan = c.colSpan || 1
                        var firstAvailCol;
                        if (typeof(matrix[rowIndex]) == "undefined") {
                            matrix[rowIndex] = [];
                        }
                        // Find first available column in the first row
                        for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                            if (typeof(matrix[rowIndex][k]) == "undefined") {
                                firstAvailCol = k;
                                break;
                            }
                        }
                        lookup[cellId] = firstAvailCol;
                        for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                            if (typeof(matrix[k]) == "undefined") {
                                matrix[k] = [];
                            }
                            var matrixrow = matrix[k];
                            for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                matrixrow[l] = "x";
								cols[l]=c;
                            }
                        }
                    }
                }
                return cols;
            }

        function bind(o) {
            insertRow(o);
        };
        function KeyUp() {
            var el = currentElement;
            //        var cell = New (sn_Cell, [el]);
            //        var input = cell.table().element.helpInput;
            var input = $(this);
            var cell = new $.sntable.cell(el);
            if (config.event.snTableOnKeyUp != null) {
                //输入框的按键事件 ,事件返回 false 将停止snTable默认行为
                if (config.event.snTableOnKeyUp(new $.sntable.cell(el), this) == false)
                    return;
            }
            if ((event.keyCode == 13 || event.keyCode == 39) && el.config.Editable) {
                //2011-05-16 王华杰 重构为inputValidate函数
                if (!inputValidate(input)) return;
                if (isAllowAddRow) {
                    if (cell.nextActiveCell() == null)
                        insertRow.apply(table);
                    inputShow.apply(cell.nextActiveCell().e());
                }
                else {
                    if (cell.nextActiveCell() != null)
                        inputShow.apply(cell.nextActiveCell().e());
                }
            }
            if ((event.keyCode == 37) && el.config.Editable) {
                //2011-05-16 王华杰 重构为inputValidate函数
                if (!inputValidate(input)) return;
                if (cell.prevActiveCell() == null) {
                    if (cell.row().prevRow() != null) {
                        var lastcell = cell.row().prevRow().getCell(cell.row().cells().length - 1);
                        //每行至少有一个可编辑单元格
                        while (lastcell.e().config.Hide) {
                            lastcell = lastcell.prevActiveCell();
                        }
                        inputShow.apply(lastcell.e());
                        lastcell = null;
                    }
                    else {
                        inputShow.apply(cell.e());
                    }
                }
                else
                    inputShow.apply(cell.prevActiveCell().e());
            }
            el = null;
            input = null;
        };
        function inputValidate(input) {
            var ret = true;
            if (input != null) {
                //吕兴举 2011-04-20
                if (
                      (
                        (
                          !input.val() //2011-05-17 王华杰 为0或者为""
                          &&
                          input.val() === currentElement.innerText   //2011-05-17 王华杰 精确等于 
                        )  //2011-05-17 王华杰 也需要走验证 ，非空的可以等到validatecell中验证
                        || input.val() != currentElement.innerText
                      )
                      && config.event.snTableValidateCell != null) {
                    //if (config.event.snTableValidateCell != null) {
                    //输入框的按键事件 ,事件返回 false 将停止snTable默认行为  
                    //2011-05-16 王华杰 snTableValidateCell没有任何返回值返回undefined 切记(undefined==false)结果为false
                    if (!config.event.snTableValidateCell(new $.sntable.cell(currentElement), input.val()) == true)
                        ret = false;
                    //当input为空时不需要inputBlur

                }
                if (ret) {
                    inputBlur.apply(input);
                }
            }
            return ret;
        }
        function click() {

            el = event.srcElement;
            //王华杰 当选中表格内文字时，TR为srcElement,需要排除
            if (el.tagName != "TD") return;
            var cell = new $.sntable.cell(el);
            //王华杰　2009-07-25
            //而input.get(0).config.currentElement被置空，此时不需要验证被删除行原焦点单元格对应的input的内容
            //王华杰 2009-09-25 可以假定如果光标离开了单元格，则一定是验证通过。删除后，光标不存在，input.get(0).config.currentElement被置空,
            //如果原光标在删除行，则此时仍需要调用inputBlur将原光标所在处文本框隐藏。
            //王华杰 2009-09-25 删除以后再click应该可以不用调用inputBlur.apply了吧，因为删除已经隐藏了helpinput  (未测试)
            if (!(el.config.Editable && config.event.runClick)) return;
            //王华杰 2011-01-07 先判断currentElement!=null再判断input.val()!=currentElement.innerText
            //如果select在第一列时input.val()=null而currentElement此时为空 ，此处需要优化，感觉helpInput第一次进来时不需要赋值
            //王华杰 2011-01-12 已修改，改为判断helpInput是否为空
            //2011-05-16 王华杰 重构为inputValidate函数
            if (inputValidate(helpInput)) {
                helpInput = table.parent().find("[snindex=" + cell.cellIndex() + "]");
                inputShow.apply(el);
            }

            //cell = null;
            //2011-01-21 王华杰 不需要吧
            //helpInput.focus();
        };
        function inputFocus() {
            this.show();
            var input = this.get(0);
            try {
                input.focus();
            }
            catch (e) {

            }
            if (currentElement) {
                if (input.tagName == "SELECT") {
                    var options = currentElement.config.Option;
                    for (var i in options) {
                        if (currentElement.innerText == options[i].Text) {
                            input.selectedIndex = i;
                            break;
                        }
                    }
                }
                else input.value = currentElement.innerText;
            }
            input = null;
        };
        function inputBlur() {

            //切换到下一个单元格后，将文本框值回填到单元格中
            var input;
            if (currentElement) {
                input = this.get(0);
                this.hide();
                var oldValue = currentElement.innerText;
                if (input.tagName == "SELECT") {
                    currentElement.innerText = input.options[input.selectedIndex].innerText;
                }
                else {
                    currentElement.innerText = input.value;
                }
                //王华杰 2009-09-25 调用inputBlur之前，都需要调用ValidateCell是否通过，此处去掉ValidateCell调用 
                if (config.event.runValidateCell) {
                    if (oldValue != currentElement.innerText) {
                        if (config.event.snTableOnChange != null) {
                            config.event.snTableOnChange(new $.sntable.cell(currentElement), oldValue); //王洪海  2009-06-22 取得文本框的旧值
                        }
                    }
                }
            }
            input = null;
        };
        function inputShow() {

            var cell = new $.sntable.cell(this);
            //2011-01-07 王华杰  找到table wrapper
            helpInput = table.parent().find("[snindex=" + cell.cellIndex() + "]");


            var input = helpInput.get(0);
            currentElement = this;

            if (input.tagName == "SELECT") {
                input.length = 0;          //王华杰 2009-09-21 清空
                for (var i in this.config.Option) {
                    var oOption = document.createElement("option");
                    input.options.add(oOption);
                    oOption.innerText = this.config.Option[i].Text;
                    oOption.Value = this.config.Option[i].Value;
                    if (this.config.Option[i].Default) oOption.selected = true;
                }
            }
            var jel = jQuery(this);
            //2011-01-07 王华杰 不再用offset("body"),需要取得离最近的已定位的父元素的位置 
            //TODO 需要从配置中传递发生scroll的父元素
            input.style.left = jel.position().left;
            input.style.top = jel.parents("div.pageFormContent").scrollTop() + jel.position().top;
            //2011-01-24 王华杰 当jel为hidden且其父元素为hidden,jquery无法得到其正确width（得到0),而input.style.width不接受负值
            //解决此问题的另一个方法是初始不绑定任何行（因此不会引起activecell,activecell进一步引起inputshow)
            //切记只要有绑定就会引起第一行第一个元素的激活（这里是否需要调整？）
            input.style.width = Math.max(0, jel.width() - 2); //2011-01-24 王华杰 调整宽度-2  
            input.style.height = Math.max(0, jel.height() - 5);  //2011-01-24 王华杰 调整高度-5  
            inputFocus.apply(helpInput);
            //王洪海  2009-06-22 得到文本框的焦点，并全选文本框内容
            //王华杰 2009-09-21 Select 不支持选中
            if (input.tagName != "SELECT")
                input.select();
            cell = null;
            input = null;
        };
        function getRow(i) {
            return rows[i] ? new $.sntable.row(rows[i]) : null;
        };
        function getLastRow() {
            return rows[rows.length - 1] ? new $.sntable.row(rows[rows.length - 1]) : null;
        };
        function insertRow(d, dindex) {
            var datas = d || [{}];
            var index = dindex || -1;
            var tbody, theads, row, cell;
            var rs = [];
            if (datas.constructor == Object) datas = [datas];

            tbody = element.tBodies[0];
            theads = cols;
            jQuery.each(datas, function(i, o) {
                try {
                    row = index == -1 ? tbody.insertRow() : tbody.insertRow(index++);
                }
                catch (e) {
                    row = tbody.insertRow();
                }
                jQuery.each(theads, function(c, el) {
                    cell = row.insertCell();
                    cell.config = {
                        Editable: el.config.Editable,
                        Option: el.config.Option,
                        Hide: el.config.Hide,
                        Field: el.config.Field,
                        Complete: el.config.Complete,
                        Default: el.config.Default,
                        ToFixed: el.config.ToFixed,
                        //2011-05-17 王华杰 支持超链接
                        DownloadUrl: el.config.DownloadUrl,
                        ArgField: el.config.ArgField,
                        //对齐方式
                        Alignment: el.config.Alignment
                    }
                    //2011-01-05 王华杰 暂时不支持
                    //if (el.config.Validator != null) jQuery.formValidator.argInit.apply(cell, [el.config.Validator]);
                    var sncell = new $.sntable.cell(cell);
                    var value;
                    //2010-01-22 王华杰 小数点位数 默认-1
                    if (el.config.ToFixed == -1)
                        value = datas[i][el.config.Field] != undefined ? datas[i][el.config.Field].toString() : el.config.Default;
                    else {
                        value = datas[i][el.config.Field] != undefined ? parseFloat(datas[i][el.config.Field].toString()).toFixed(el.config.ToFixed) : parseFloat(el.config.Default).toFixed(el.config.ToFixed);
                        if (isNaN(value))
                            value = parseFloat(0).toFixed(el.config.ToFixed);
                    }
                    if (el.config.Percent) {
                        value = (value * 100).toFixed(2) + "%";
                    }
                    if (!el.config.DownloadUrl) {
                        sncell.text(value);
                    }
                    else {
                        //2011-05-17 王华杰 在ie下table元素及tr,td元素不允许修改innerHTML，否则报运行时错误
                        var a = document.createElement("a");
                        a.href = el.config.DownloadUrl + datas[i][el.config.ArgField];
                        a.target = "_blank";
                        a.appendChild(document.createTextNode(datas[i][el.config.Field]));
                        //sncell.e().innerHTML = "<a href='" + el.config.DownloadUrl + datas[i][el.config.Field] + "'>" + datas[i][el.config.Field] + "</a>";
                        sncell.e().appendChild(a);
                    }
                    if (el.config.Alignment != null) {
                        if (el.config.Alignment == "right") {
                            $(cell).css('text-align', 'right');
                        }
                        else if (el.config.Alignment == "left") {
                            $(cell).css('text-align', 'left');
                        }
                    }

                    if (el.config.Hide) jQuery(cell).hide();
                    if (config.event.snTableCellDataBinding != null) {
                        config.event.snTableCellDataBinding(sncell, c);
                    }
                    if (el.config.Action != null) {
                        if (el.config.Action == "DEL") {
                            cell.innerHTML = '<a style="color:red;cursor:hand;" onclick="javascript:jQuery.snTable.deleted(New(sn_Row,[this.parentElement.parentElement]));">×</a>';
                        }
                    }

                });
                var snrow = $.sntable.row(row);
                if (config.event.snTableRowDataBinding != null) {
                    config.event.snTableRowDataBinding(snrow, i);
                }
                rs.push(snrow);
                //2011-01-11 王华杰 增加一行将当前行激活，增加多行不处理
                if (index == -1 && i == 0) {
                    activeCell(snrow, 0);
                }
            });
            return rs;
        };
        //2011-01-11 王华杰 私有函数, deleted函数调用
        function deleteRow(i) {
            var row = getRow(i);
            if (row != null) row.remove();
        };
        function getJson() {
            var value;
            var str = "[";
            for (var i = 0; i < rows.length; i++) {
                //if (this.rows[i].cells[0].config.Complete == true && this.rows[i].cells[0].innerText == "") break
                str += "{";
                for (var j = 0; j < rows[i].cells.length; j++) {
                    if (rows[i].cells[j].config.Field == "sn_NoField") continue
                    value = rows[i].cells[j].config.Option == null ? rows[i].cells[j].innerText : new $.sntable.cell(rows[i].cells[j]).text();
                    //王华杰　2009/05/25 防止乱码
                    //value = $.quoteString(value);
                    str += $.quoteString(rows[i].cells[j].config.Field) + ":\"" + value + "\",";
                }
                if (str.substr(str.length - 1, 1) == ",") str = str.substring(0, str.length - 1);
                str += "}";
                if (i + 1 != rows.length)
                    str += ",";
            }
            str += "]";
            return str;
        };
        function getObject() {
            var obj;
            eval("obj = " + getJson() + ";")
            return obj;
        };
        function getCurrentCell() {
            try {
                return $.sntable.cell(currentElement);
            }
            catch (e) {
                return null;
            }
        };
        function exitEdit(saveState /*true or false*/) {
            var ret;
            //王华杰 没有任何数据时，调用clean，此时helpInput为空
            //2011-05-21 
            if (helpInput == null) return true;
            //当点了删除之后，input的currentElement设置为空，继续点删除的时候，则currentElement为空，找不到他的parentElement所以加一个判断。
            //王华杰 当第二次执行exitEdit时cell为空
            if (currentElement == null) return true;
            //王华杰 删除时需要退出编辑状态(有可能因为删除行原焦点单元格所对应的<input>类型未通过验证，所以无法删除，造成幻影单元格
            //未解决问题（不需要改），此时直接关闭验证单元格开关，可能由于未通过验证的焦点单元格不存在于所删除的行中，造成exitEdit()成功，需要在保存
            //数据的时候再次验证
            //王华杰 为什么不把config加到table上而是tbody?
            //王华杰 2009-09-25 当saveState=true即为保存状态时，需要验证ValidatorCell，此时返回是否验证通过,
            //当saveState==null即为删除状态时，不需要验证ValidatorCell
            //输入框的按键事件 ,事件返回 false 将停止snTable默认行为    
            ret = true;
            if (saveState) {

                ret = inputValidate(helpInput);
            }
            else {
                inputBlur.apply(helpInput);
                //2011-05-20 王华杰 只有在删除的时候才可以将currentElement设为null, 而保存时可能出错文本框仍在，此时点击文本框修改时首先触发KeyUp(会检查currentElement)
                //bug941
                config.event.runClick = true;
                currentElement = null;
                //2011-01-11 王华杰 helpInput和currentElement要同时处理
                helpInput = null;
            }

            return ret;
        };
        function deleted(snRow) {
            if (config.event.snTableDeletedBefore != null) {
                if (config.event.snTableDeletedBefore(snRow) == false) {
                    return;
                }
            }
            /*
            // tbody[0].config.event.runValidateCell = false;
            if (snRow.table().element.helpInput[0].config.currentElement.parentElement.rowIndex == snRow.element.rowIndex) {
            snRow.table().exitEdit();
            }
            else {
            if(!snRow.table().exitEdit(true))
            return false;
            }
            */
            exitEdit(false  /*不验证*/);
            //tbody[0].config.event.runValidateCell = true;
            if (snRow.prevRow() != null) {
                //2011-05-17 王华杰 如果第一列不可编辑，则无法找到焦点
                activeCell(snRow.prevRow(), 0);
            }
            snRow.remove();
            if (config.event.snTableDeletedAfter != null) {
                config.event.snTableDeletedAfter();
            }
        };
        function activeCell(row, cindex) {
            //        if (this.table().element.helpInput == null) {
            //            this.table().element.helpInput = (this.element.config.Option == null ? (this.element.config.Complete == true ? $('#sn_inputBudget') : $('#sn_input')) : $('#sn_select'));

            //        }
            //王华杰 2009-06-11 防止呈现多个文本框
            //2011-01-11 王华杰 keyup和click自动维护helpInput,而activeCell应该将前一helpInput隐藏
            inputBlur.apply(helpInput);
            var cell = row.c(cindex).e();
            if (cell.config.Editable) inputShow.apply(cell);
        };
        function clean() {
            exitEdit();
            $("tbody", element).empty();
            jQuery.each(cols,function(i, el) {
                var jel = jQuery(el);
                var c;
                switch (el.config.ControlType) {
                    case 3:
                        c = table.parent().find("[snindex=" + i + "]");
                        c.flushCache();
                        break;
                }
            });
        };

        return {
            KeyUp: KeyUp,
            click: click,
            bind: bind,
            inputBlur: inputBlur,
            inputShow: inputShow,
            getRow: getRow,
            getLastRow: getLastRow,
            insertRow: insertRow,
            deleted: deleted,
            getJson: getJson,
            getObject: getObject,
            getCurrentCell: getCurrentCell,
            exitEdit: exitEdit,
            clean: clean
        };
    }
    $.sntable.row = function(row, o) {
        var element = row;
        var cels = element.cells;
        function getCell(i) {
            return cels[i] ? new $.sntable.cell(cels[i]) : null;
        };
        function cells() {
            return cels;
        };
        ///TODO优化
        function c(i) {
            return getCell(i);
        };
        function remove() {
            element.removeNode(true);
        };
        function rowIndex() {
            return element.rowIndex;
        };
        function prevRow() {
            return element.previousSibling != null ? new $.sntable.row(element.previousSibling) : null;
        };
        function nextRow() {
            return element.nextSibling != null ? new $.sntable.row(element.nextSibling) : null;
        };
        //2011-01-06 王华杰 需要继续做
        function getJson() {
            var value;
            var str = "{";
            for (var i = 0; i < cels.length; i++) {
                if (cels[i].config.Field == "sn_NoField") continue;
                value = cels[i].config.Option == null ? cels[i].innerText : new $.sntable.cell(cels[i]).text();
                str += cels[i].config.Field + ":\"" + value + "\",";
            }
            if (str.substr(str.length - 1, 1) == ",") str = str.substring(0, str.length - 1);
            return str + "}";
        };
        function getObject() {
            var obj;
            eval("obj = " + getJson() + ";")
            return obj;
        };
        return {
            getCell: getCell,
            c: c,
            cells: cells,
            remove: remove,
            prevRow: prevRow,
            nextRow: nextRow,
            getJson: getJson,
            rowIndex: rowIndex,
            getObject: getObject
        };

    }
    $.sntable.cell = function(cell, o) {
        var element = cell;
        var field = element.config.Field;
        function row() {
            return new $.sntable.row(element.parentElement);
        };
        function e() {
            return element;
        };
        function text(value) {
            if (element.config.Option == null) {
                //if (value)
                if (arguments.length != 0) //2011-02-24 王华杰 有参数则赋值
                    element.innerText = value;
                else
                    return element.innerText;
            }
            else {
                if (value) {
                    for (var i in element.config.Option) {
                        if (value == element.config.Option[i].Value) {
                            element.innerText = element.config.Option[i].Text;
                            break;
                        }
                    }
                }
                else {
                    for (var i in element.config.Option) {
                        if (element.innerText == element.config.Option[i].Text) {
                            return element.config.Option[i].Value;
                        }
                    }
                    return " ";
                }
            }
        };
        function editable(value) {
            //王洪海  2009-06-22 设置文本框不可编辑
            element.config.Editable = value;
            /* if(value)
            this.element.config.Editable = value;
            else
            return this.element.config.Editable; */
            if (value)
                element.bgColor = "#CCFFCC";
            else
                element.bgColor = "#FFFFFF";
        };
        //2011-01-06 王华杰 由table提供activeCell支持，cell提供无法调用inputShow
        //        function activeCell() {
        //            //王华杰 2009-06-11 防止呈现多个文本框
        //            this.table().element.helpInput.hide();
        //            if (this.element.config.Editable) jQuery.snTable.inputShow.apply(this.element);
        //        };
        function prevCell() {
            if (element.previousSibling != null) return new $.sntable.cell(element.previousSibling);
            if (element.parentElement.prevSibling == null) return null;
            return new $.sntable.cell(element.parentElement.prevSibling.cells[element.parentElement.prevSibling.cells.length - 1]);
        };
        function nextCell() {
            if (element.nextSibling != null) return new $.sntable.cell(element.nextSibling);
            if (element.parentElement.nextSibling == null) return null;
            return new $.sntable.cell(element.parentElement.nextSibling.cells[0]);
        };
        function cellIndex() {
            return element.cellIndex;
        };
        function prevActiveCell() {
            var cell = prevCell();
            if (cell == null) return null;
            return (cell.e().config.Editable && !cell.e().config.Hide) ? cell : cell.prevActiveCell();
        };
        function nextActiveCell() {
            var cell = nextCell();
            if (cell == null) return null;
            return (cell.e().config.Editable && !cell.e().config.Hide) ? cell : cell.nextActiveCell();
        };
        //2011-01-05 王华杰 暂不支持sum
        /*function sum() {
        var datas = this.row().table().getObject();
        var sum = 0;
        var value;
        for (var i in datas) {
        value = eval("datas[" + i + "]." + this.field);
        sum += Number(value) ? Number(value) : 0;
        }
        return sum;
        };*/
        return {
            row: row,
            text: text,
            e: e,
            editable: editable,
            prevCell: prevCell,
            nextCell: nextCell,
            cellIndex: cellIndex,
            prevActiveCell: prevActiveCell,
            nextActiveCell: nextActiveCell
        };
    }
})(jQuery);

