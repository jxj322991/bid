var main = {
    name: 'audit_word',
    data: {
        search: true,
        tableClear: true,
        table: 1,
        ajax1: {
            name: 'getReviewNews',
            context: undefined,
            author: undefined,
            field: undefined,
            stage: undefined,
            type: undefined,
            start: 0,
            size: 20
        },
        ajax2: {
            name: 'asignNews',
            newsId: undefined,
            asignUid: undefined,
            stage: undefined
        }
    },
    start: function() {
        common.val_reset();
        common.height_reset();
        common.clearfloat();
        common.getTrumpet();
        common.getPullDownList();
        common.bind_element();
        common.user_show();
        main.data.ajax1.uid = common.k;
        main.data.ajax2.uid = common.k;
        $('.item2').addClass('active');
        $('.switch1').addClass('active');
        main.data.ajax1.stage = 0;
        ajax_news.getReviewNews(main.data.ajax1, main.table12_show);
        ajax_news.getPullDownList(undefined, main.search_show);
    },
    search_show: function(res) {
        var users = res.context.users || [];
        var html1 = '';
        for (var i = 0; i < users.length; i++) {
            html1 += `<option value='${users[i].uid}'>${users[i].username}</option>`;
        }
        $('.pop select').html(html1)
    },
    table12_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.table12_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            html1 += `<tr class="${i%2==0?'bg_write':'bg_gray'}" tr_id='${list[i].news.id}'><td><input type="checkbox" name=""></td><td class="type1">                ${list[i].news.id}</td><td class="type2"><span>【${list[i].news.field}】</span><a href="javascript:void(0)">${list[i].news.title}</a></td><td class="type3">                ${list[i].news.author}</td><td class="type1">                ${list[i].news.createTime}</td><td class="type5"><a href="javascript:void(0)" class='t_zhipai'>指派</a><a href="javascript:void(0)" class='t_shenhe'>审核</a><a href="javascript:void(0)" class='t_chakan'>查看</a><a href="javascript:void(0)" class='t_bidui'>比对</a></td></tr>`;

        }
        $('.table12 tbody').html(html1);
    },
    table3_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.table3_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            var html2 = '';
            var html5 = '';
            var person = list[i].newsReviews;
            for (var j = 0; j < person.length; j++) {
                if (person[j].stage > 0) {
                    html5 += `<span>【${person[j].stage==3?'三':person[j].stage==2?'二':'一'}审】${person[j].user.username}</span><br>`
                }
            }

            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : '';
            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += `<span>【${channel[j]}】</span>`;
                }

            }
            html1 += `<tr class="${i%2==0?'bg_write':'bg_gray'}" tr_id = '${list[i].news.id}'><td><input type="checkbox" name=""></td><td class="type1">                ${list[i].news.id}</td><td class="type2"><span>【${list[i].news.field}】</span><a href="javascript:void(0)">${list[i].news.title}</a><span class="explain ${(list[i].newsReviews[0] && list[i].newsReviews[0].editOpinion)?'':'hide'}"><img src="//liaowang.oss-cn-hangzhou.aliyuncs.com/src/img/alert_03.png" alt="explain"><span class="explain_box">${list[i].newsReviews[0] && list[i].newsReviews[0].editOpinion}<span class="yellow_arrow"></span></span></span></td><td class="type3">                ${ list[i].news.author }</td><td class="type4">            ${html5}</td><td class="type4">            ${html2}</td><td class="type6">                ${list[i].news.createTime}</td><td class="type5"><a href="javascript:void(0)" class='t_zhipai'>指派</a><a href="javascript:void(0)" class='t_shenhe'>审核</a><a href="javascript:void(0)" class='t_chakan'>查看</a><a href="javascript:void(0)"  class='t_bidui'>比对</a></td></tr>`;
        }
        $('.table3 tbody').html(html1);
    },
    tablemy_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.tablemy_show);
        var list = res.context.list;
        var html1 = '';
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
                    html3 = '三审通过';
                    break;
                case 4:
                    html3 = '已发刊'
                    break;
                case -1:
                    html3 = '草稿'
                    break;
                default:
                    html3 = "未知状态";
                    break;
            }

            html1 += `<tr class="${ i % 2 == 0 ? 'bg_write' : 'bg_gray' }" tr_id = '${list[i].news.id}'><td class="type1">                ${ list[i].news.id }</td><td class="type2"><span>【${ list[i].news.field }】</span><a href="javascript:void(0)">${ list[i].news.title }</a></td><td class="type3">                ${html3}</td><td class="type4">                ${html2}</td><td class="type1">                ${ list[i].news.createTime }</td><td class="type5"><a href="javascript:void(0)" class='t_shenhe'>审核</a><a href="javascript:void(0)" class='t_chakan'>查看</a><a href="javascript:void(0)" class='t_bidui'>比对</a></td></tr>`;
        }
        $('.tablemy tbody').html(html1);
    },
    tableself_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.tableself_show);
        var list = res.context.list;
        var html1 = '';
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
                    html3 = '三审通过';
                    break;
                case 4:
                    html3 = '已发刊'
                    break;
                case -1:
                    html3 = '草稿'
                    break;
                default:
                    html3 = "未知状态";
                    break;
            }
            html1 += `<tr class="${ i % 2 == 0 ? 'bg_write' : 'bg_gray' }" tr_id = '${list[i].news.id}'><td class="type1">                ${ list[i].news.id }</td><td class="type2"><span>【${ list[i].news.field }】</span><a href="javascript:void(0)">${ list[i].news.title }</a></td><td class="type3">                ${html3}</td><td class="type4">               ${html2}</td><td class="type1">                ${ list[i].news.createTime }</td><td class="type5"><a href="javascript:void(0)" class='t_shenhe ${list[i].news.status>3 && 'hide'}'>审核</a><a href="javascript:void(0)" class='t_chakan'>查看</a><a href="javascript:void(0)" class='t_bidui'>比对</a></td></tr>`;
        }
        $('.tableself tbody').html(html1);
    },
    click_li: function($this) {
        common.getPullDownList();
        $('.contain_b>div').addClass('hide');
        $('#switch li').removeClass('active');
        $this.addClass('active');
        if ($this.hasClass('switch1')) {
            main.data.table = 1;
            main.data.ajax1 = {
                context: undefined,
                author: undefined,
                field: undefined,
                stage: 0,
                type: undefined,
                start: 0,
                size: 20
            }
            main.data.ajax1.uid = common.k;
            ajax_news.getReviewNews(main.data.ajax1, main.table12_show);
            $('.table12').removeClass('hide');
        } else if ($this.hasClass('switch2')) {
            main.data.table = 2;
            main.data.ajax1 = {
                context: undefined,
                author: undefined,
                field: undefined,
                stage: 1,
                type: undefined,
                start: 0,
                size: 20
            }
            main.data.ajax1.uid = common.k;
            ajax_news.getReviewNews(main.data.ajax1, main.table3_show);
            $('.table3').removeClass('hide');
        } else if ($this.hasClass('switch3')) {
            main.data.table = 3;
            main.data.ajax1 = {
                uid: 1001,
                context: undefined,
                author: undefined,
                field: undefined,
                stage: 2,
                type: undefined,
                start: 0,
                size: 20
            }
            main.data.ajax1.uid = common.k;
            ajax_news.getReviewNews(main.data.ajax1, main.table3_show);
            $('.table3').removeClass('hide');
        }else if ($this.hasClass('switch6')) {
            main.data.table = 6;
            main.data.ajax1 = {
                context: undefined,
                author: undefined,
                field: undefined,
                stage: undefined,
                type: undefined,
                start: 0,
                size: 20
            }
            main.data.ajax1.uid = common.k;
            ajax_news.getReviewNews(main.data.ajax1, main.tableself_show);
            $('.table3').removeClass('hide');
        } else if ($this.hasClass('switch4')) {
            main.data.table = 4;
            main.data.ajax1 = {
                context: undefined,
                author: undefined,
                field: undefined,
                stage: undefined,
                type: 0,
                start: 0,
                size: 20
            }
            main.data.ajax1.uid = common.k;
            ajax_news.getReviewNews(main.data.ajax1, main.tablemy_show);
            $('.tablemy').removeClass('hide');
        } else if ($this.hasClass('switch5')) {
            main.data.table = 5;
            main.data.ajax1 = {
                context: undefined,
                author: undefined,
                field: undefined,
                stage: undefined,
                type: 1,
                start: 0,
                size: 20
            }
            main.data.ajax1.uid = common.k;
            ajax_news.getReviewNews(main.data.ajax1, main.tableself_show);
            $('.tableself').removeClass('hide');
        }else{
            alert('表单数据错误');
        }
    },
    click_zhipai: function($this) {
        $('body>.pop').removeClass('hide');
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        var stage = main.data.ajax1.stage;
        main.data.ajax2 = {
            newsId: id,
            asignUid: undefined,
            stage: stage
        }
        main.data.ajax2.uid = common.k;
    },
    send_audit: function() {
        var uid = $('.pop select').val();
        main.data.ajax2.asignUid = uid;
        ajax_news.asignNews(main.data.ajax2, undefined);
    },
    choice: function() {
        var k1 = $('#s_input')[0].value || undefined;
        var k2 = $('#s_author')[0].value || undefined;
        var k3 = $('#s_field')[0].value || undefined;
        k2 = k2 == '0' ? undefined : k2;
        k3 = k3 == '0' ? undefined : k3;
        main.data.ajax1.context = k1;
        main.data.ajax1.author = k2;
        main.data.ajax1.field = k3;
        main.data.ajax1.start = 0;
        main.data.ajax1.size = 20;
        if (main.data.table == 1) {
            ajax_news.getReviewNews(main.data.ajax1, main.table12_show);
        } else if (main.data.table == 2) {
            ajax_news.getReviewNews(main.data.ajax1, main.table3_show);
        } else if (main.data.table == 3) {
            ajax_news.getReviewNews(main.data.ajax1, main.table3_show);
        } else if (main.data.table == 6) {
            ajax_news.getReviewNews(main.data.ajax1, main.table3_show);
        } else if (main.data.table == 4) {
            ajax_news.getReviewNews(main.data.ajax1, main.tablemy_show);
        } else if (main.data.table == 5) {
            ajax_news.getReviewNews(main.data.ajax1, main.tableself_show);
        } else {
            alert('表单选择数据错误!');
        }

    },
    skip_jump: function(data, fun) {
        ajax_news.getReviewNews(data, fun);
    }
}

main.start()

$('#switch').on('click', 'li', function() {
    main.click_li($(this));
})
$('table').on('click', '.t_zhipai', function() {
    main.click_zhipai($(this));
})
$('.pop button.bg_blue').on('click', function() {
    main.send_audit();
    $('body>.pop').addClass('hide');
})
$('.pop button.bg_gray').on('click', function() {
    $('body>.pop').addClass('hide');
})
$('#s_search').on('click', function() {
    main.choice();
})