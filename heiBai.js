var heiBai = {
    start:function () {
        $.ajax({
            url: "./admin/api.php",
            dataType: "json",
            async:false,
            success: function (e) {
                logo = e.data.logo;
                pbgjz = e.data.pbgjz;
                color = e.data.color;
                laoding = e.data.loading == "on" ? 1 : 0;
                adimg = e.data.ads.pause.pic;
                adlink = e.data.ads.pause.link;
                pause_ad = e.data.ads.pause.state == "on" ? 1 : 0;
                danmuon = e.data.danmuon == "on" ? 1 : 0;
                e.data.bt?heiBai.setBt(e.data.bt):"";
                dmapi=e.data.damapi?e.data.damapi:dmapi;
                dmrule=e.data.dmly?e.data.dmly:dmrule;
                right=e.data.right?e.data.right:right;

            }
        });
    },
    pause_adload:function(l,p) {
        var pause_ad_html = '<div id="player_pause"><div class="tip">广告</div><a href="'+l+'" target="_blank"><img src="'+p+'"></a></div>';
        $('#player').before(pause_ad_html);

    },
    report:function(a,b,c,d) {
        layer.confirm(''+c+'<!--br><br><span style="color:#333">请选择需要举报的类型</span-->', {
            anim: 1,
            title: '举报弹幕',
            btn: ['违法违禁', '色情低俗', '恶意刷屏', '赌博诈骗', '人身攻击','侵犯隐私','垃圾广告','剧透','引战']
            ,btn3: function(index, layero){
                heiBai.post_r(a,b,c,d,'恶意刷屏');
            },btn4: function(index, layero){
                heiBai.post_r(a,b,c,d,'赌博诈骗');
            },btn5: function(index, layero){
                heiBai.post_r(a,b,c,d,'人身攻击');
            },btn6: function(index, layero){
                heiBai.post_r(a,b,c,d,'侵犯隐私');
            },btn7: function(index, layero){
                heiBai.post_r(a,b,c,d,'垃圾广告');
            },btn8: function(index, layero){
                heiBai.post_r(a,b,c,d,'剧透');
            },btn9: function(index, layero){
                heiBai.post_r(a,b,c,d,'引战');
            }
        }, function(index, layero){
            heiBai.post_r(a,b,c,d,'违法违禁');
        }, function(index){
            heiBai.post_r(a,b,c,d,'色情低俗');
        });
    },
    post_r:function (a,b,c,d,type) {
        $.ajax({
            type: "get",
            url: dmapi+'?ac=report&cid='+d+'&user='+a+'&type='+type+'&title='+b+'&text='+c,
            cache: false,
            dataType: 'json',
            beforeSend: function() {
            },
            success: function (data) {
                layer.msg("举报成功！感谢您为守护弹幕作出了贡献");
            },
            error: function(data) {
                var msg ="服务故障 or 网络异常，稍后再试6！";
                layer.msg(msg);
            }
        });
    },
    setBt:function (bt) {
        document.title=bt;
    }
}

