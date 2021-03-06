(function() {
    var main = {
        name: 'self_library',
        data: {
            search: true,
            tableClear: true,
            ajax1: {
                name: 'myNewsList',
                context: undefined,
                field: undefined,
                start: 0,
                size: 20
            }
        },
        //启动
        start: function() {
            common.val_reset();
            common.height_reset();
            common.clearfloat();
            common.getTrumpet();
            common.getPullDownList();
            common.bind_element();
            common.user_show();
            common.new_role_control();
            main.data.ajax1.uid = common.k;
            $('.left-list .item1').addClass('active');
            ajax_news.myNewsList(main.data.ajax1, main.table_show);
        },
        //列表展示
        table_show: function(data) {
            common.skip(main.skip_jump, main.data.ajax1, data, main.table_show);
            var list = data.context.list;

            var html1 = ' ';

            for (var i = 0; i < list.length; i++) {
                var html2 = '';
                var html3 = '';
                var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : '';

                for (var j = 0; j < channel.length; j++) {
                    if (channel[j]) {
                        html2 += `<span>【${channel[j]}】</span>`;
                    }

                }
                switch (list[i].news.status) {
                    case 0:
                        html3 = "待审核";
                        break;
                    case 1:
                        html3 = '一审通过';
                        break;
                    case 2:
                        html3 = '二审通过';
                        break;
                    case 3:
                        html3 = '待终审';
                        break;
                    case 4:
                        html3 = '待刊发';
                        break;
                    case 5:
                        html3 = '已发刊';
                        break;
                    case -1:
                        html3 = '草稿';
                        (list[i].news.reviewStatus == 0) && (html3 += ":退回");
                        break;
                    case -2:
                        html3 = '已删除';
                        break;
                    default:
                        html3 = "未知状态";
                        break;
                }
                html1 += `<tr class="${i%2==0?'bg_write':'bg_gray'}" tr_id = '${list[i].news.id}'><td class="type1">${list[i].news.id}</td><td class="type2"><span>【${list[i].news.field}】</span><a href="javascript:void(0)">${list[i].news.title}</a></td><td class="type3">${html3}</td><td class="type4">${html2}</td><td class="type1">${list[i].news.createTime}</td><td class="type5"><a href="javascript:void(0)" class='t_bianji ${list[i].news.status>=0?'hide':''}'>编辑</a><a href="javascript:void(0)" class='t_chakan'>查看</a><a href="javascript:void(0)" class='t_bidui'>比对</a></td></tr>`;
            }
            $('.contain_b tbody').html(html1);



        },
        //搜索栏控制
        choice: function() {
            var k1 = $('#s_input')[0].value || undefined;
            var k2 = $('#s_field')[0].value || undefined;
            k2 = k2 == '0' ? undefined : k2;
            main.data.ajax1.context = k1;
            main.data.ajax1.field = k2;
            main.data.ajax1.start = 0;
            main.data.ajax1.size = 20;
            ajax_news.myNewsList(main.data.ajax1, main.table_show);
        },
        //分页器跳转
        skip_jump: function(data, fun) {
            ajax_news.myNewsList(data, fun);
        }
    }
    main.start();

    $('#s_search').on('click', function() {
        main.choice();
    })
})()