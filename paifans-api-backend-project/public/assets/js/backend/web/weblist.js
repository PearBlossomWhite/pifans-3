define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'web/weblist/index' + location.search,
                    add_url: 'web/weblist/add',
                    edit_url: 'web/weblist/edit',
                    del_url: 'web/weblist/del',
                    multi_url: 'web/weblist/multi',
                    import_url: 'web/weblist/import',
                    table: 'web_list',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {
                            field: 'type_id',
                            title: __('所属类型'),
                            searchList: Config.typeList,
                            formatter: Table.api.formatter.label
                        },
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'title1', title: __('英文版标题'), operate: 'LIKE'},
                        {
                            field: 'show_image',
                            title: __('Show_image'),
                            operate: false,
                            events: Table.api.events.image,
                            formatter: Table.api.formatter.image
                        },
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});