
$(function(){
	var left_btn = $('#banner .btn2 .btn2-left')
	var right_btn = $('#banner .btn2 .btn2-right')

	$('.dd .dd-left li').bind({

		mouseenter:function(_this){
			$('.dd .dd-right').show().stop(false,true).animate({
				left:'189px',
				opacity:1
			},200)
			$('.dd .dd-right').find('li').eq($(this).index()).show().siblings().hide()
		},
		mouseleave:function(){
			
		}
		
	})
	$('.dd').on('mouseleave',function(){
		$('.dd .dd-right').hide().stop().css({
				left:'169px',
				opacity:0.5
		})
	})
	/*$('.dd .dd-right li').on({
		mouseenter:function(){
			$('.dd .dd-left li').eq($(this).index()).css('background','#fff').siblings().css
			
		}
	})*/
	//————————————————轮播按钮显示————————————
	$('#banner .ban-main').mouseenter(function(){
		clearInterval(baner_timer)

		left_btn.stop().animate({
			"margin-left":'0'
		},100);
		right_btn.stop().animate({
			"margin-right":'0'
		},100);
	})
	$('#banner .ban-main').mouseleave(function(){
		baner_timer = setInterval(bnrMove,2000)		
		left_btn.stop().animate({
			"margin-left":'-45px'
		},100)
		right_btn.stop().animate({
			"margin-right":'-45px'
		},100)
	})	
	//————————————————轮播按钮淡入淡出————————————
	$('#banner .btn2 .btn2-left,#banner .btn2 .btn2-right').bind({
		'mouseenter':function(){			
			$(this).stop().animate({
				opacity:'0.5'
			})
		},
		'mouseleave':function(){
			$(this).stop().animate({
				opacity:'0.2'
			})
		}
	})
	//————————————————————点击切换及自动播放——————————
	var index= 0
	left_btn.click(function(){
		if(index == 0){
			index=$('#banner .ban-main>li').length-1
		}else{
			index--;
		}
		$('#banner .ban-main>li').eq(index).fadeIn().siblings('li').fadeOut()		
	})
	right_btn.click(bnrMove)	
	var baner_timer = null;
	clearInterval(baner_timer);
	baner_timer = setInterval(bnrMove,2000);
	
	function bnrMove(){

		if(index == $('#banner .ban-main>li').length-1){
			index=0;
		}else{
			index++;
		}
		
		$('#banner .ban-main>li').eq(index).fadeIn().siblings('li').fadeOut();
		
		$('.btn6 li').eq(index).addClass('hover').stop().animate({
			width:'25px'
		}).siblings().removeClass('hover').animate({
			width:'14px'
		});
	}
	
	$('.btn6 li').click(function(){
		
		index = $(this).index()
		
		$('.btn6 li').eq(index).addClass('hover').animate({
			width:'25px'
		}).siblings().removeClass('hover').stop().animate({
			width:'14px'
		});
		
		$('#banner .ban-main>li').eq(index).fadeIn().siblings('li').fadeOut()	
	})
	//————————————————————floor slider START——————————————————————
	var floor_s_index = 0;
	var oSlid_mian = $('.floor-slider .slid-mian')
	var $slidEq0 = oSlid_mian.children().eq(0).clone()
	oSlid_mian.append($slidEq0)
	oSlid_mian.width($slidEq0.width()+$(this).width())
	setInterval(function(){
		if(floor_s_index == oSlid_mian.children().length-1){
			floor_s_index = 1;
			oSlid_mian.css('left','0')
		}else{
			floor_s_index++
			$('.progress li').eq(0).addClass('active').siblings().removeClass('active')
		}		
		oSlid_mian.animate({
			left:-oSlid_mian.children().eq(0).width()*floor_s_index
		})
		$('.progress li').eq(floor_s_index).addClass('active').siblings().removeClass('active')
	},2000)
	//————————————————————floor slider OVER——————————————————————
	/*for(var i = 0 ;i < $('.floor').length;i++){
		
		//console.log($(this))
		$('.floor').eq(i)
		
	}*/
	
})