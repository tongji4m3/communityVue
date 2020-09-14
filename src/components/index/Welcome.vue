<template>

	<div id="banner">
        <el-carousel  :height="banH+'px'" width="100%">
			<el-carousel-item >
			  <img class="banImg" src="../../assets/img/tj_pic5.jpg" alt=""  :height="banH+'px'" style="width: 100%;margin:0;">
			</el-carousel-item>
			<el-carousel-item >
			  <img class="banImg" src="../../assets/img/tj_pic6.jpg" alt="" :height="banH+'px'" style="width: 100%;margin:0;">
			</el-carousel-item>
              <el-carousel-item >
                <img class="banImg" src="../../assets/img/sanhaowu.jpg" alt="" :height="banH+'px'" style="width: 100%;margin:0;">
              </el-carousel-item>
			  <el-carousel-item>
			    <img class="banImg" src="../../assets/img/hehua.jpg" alt="" :height="banH+'px'" style="width: 100%;margin:0;">
			  </el-carousel-item>
			  <el-carousel-item >
			    <img class="banImg" src="../../assets/img/sanhaowu3.jpg" alt="" :height="banH+'px'" style="width: 100%;margin:0;">
			  </el-carousel-item>
        </el-carousel>

        <!-- 系统介绍模块 -->
        <div class="mokuai" id="content1">
            <div id="aboutText">
                <div class="mokuaiTitle">
                     关于系统
                </div>
                <div class="engTitle">
                     About
                </div>
                <p>
                    
                    随着我国对高等教育的体制改革的逐渐深入,学生社团信息系统的应用已经逐渐成为高校中不可缺少的必需品。
					学生社团,顾名思义是由学生根据爱好兴趣自发组织到一起并且不以盈利为目的社团组织,而且需要依据一定的制度规章组织并开展活动,
					来丰富学生的课余活动,是大学生第二课堂的一个极其重要的组成部分。随着社会经济的快速发展,学生社团的数量的不断增长,
					各级学生社团需要处理大量的学生数据信息,从而快捷地管理学生信息,科学地制定工作计划,准确地评价学生工作;
					学生也需要一个集中的平台来了解学校中社团的各种信息,方便直观地与社团组织进行交互;
					学校的社团管理人员同样需要一个可以快速管理社团,处理社团事务的途径。
					如何更加高效便捷地管理学生社团已然成为一个小的研究热点,信息管理系统是一个新兴学科,想要更加高效便捷地管理组织活动等,
					必须结合相应组织特点建立一个信息化系统。
                </p>
            </div>
            <img src="../../assets/img/zonghelou.png" alt="">
        </div>

        <!-- 社团列表模块 -->
        <div id="shetuan">

            <div id="shetuanTitle">
                百团大战
            </div>
            <div class="engTitle">
                Club Table
            </div>
            <el-divider></el-divider>
            <div id="clubTable">
                <div class="clubItem">
                    <img src="../../assets/img/shudumiti.png" alt="">
                    <div class="clubName">数独迷题社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/xingkongyanyi.png" alt="">
                    <div class="clubName">星空演艺社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/OMYUJIA.png" alt="">
                    <div class="clubName">OM瑜伽社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/jinyindiyi.png" alt="">
                    <div class="clubName">金音笛艺社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/zhuoyoushe.png" alt="">
                    <div class="clubName">桌游社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/daobiyouhua.png" alt="">
                    <div class="clubName">刀笔油画社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/piyonghanfushe.png" alt="">
                    <div class="clubName">辟雍汉服社</div>
                </div>
                <div class="clubItem">
                    <img src="../../assets/img/jixianfeipan.png" alt="">
                    <div class="clubName">极限飞盘协会</div>
                </div>

                <div class="clubItem">
                    <img src="../../assets/img/tongfeihangmo.png" alt="">
                    <div class="clubName">同飞航模协会</div>
                </div>
				<div class="clubItem">
				    <img src="../../assets/img/dijiuyishu.png" alt="">
				    <div class="clubName">第九艺术协会</div>
				</div>
				<div class="clubItem">
				    <img src="../../assets/img/jianshenxiehui.png" alt="">
				    <div class="clubName">健身协会</div>
				</div>
				<div class="clubItem">
				    <img src="../../assets/img/jitaxiehui.png" alt="">
				    <div class="clubName">吉他协会</div>
				</div>

                <div class="clubItem">
                    <img src="../../assets/img/moshuaihaozhe.png" alt="">
                    <div class="clubName">魔术协会</div>
                </div>

				<div class="clubItem">
				    <img src="../../assets/img/wushuxiehui.png" alt="">
				    <div class="clubName">武术协会</div>
				</div>
            </div>

        </div>

	    <!-- 社团活动模块 -->
	    <div class="mokuai">
	        <div id="aboutNews">
	            <div class="mokuaiTitle">
	                  社团活动
	            </div>
	            <div class="engTitle">
	                 Activity
	            </div>
	            <ol>
	            	<li><p>同济大学第一届狼人杀比赛开始报名啦！</p>
					<hr  align="left" size="1" />
	            	</li>
	            	<li><p>同济国标|开学的第一场舞！</p>
					<hr  align="left" size="1" /> </li>
	            	<li><p>C4Family九周年专场公演</p>
					<hr  align="left" size="1" /> </li>
	            	<li><p>同声汇雅韵——上海大学生戏曲汇演揭幕在即</p>
					<hr  align="left" size="1" /> </li>
	            	<li><p>同一片蓝天|沪上高校社团携手云端开唱</p>
					<hr  align="left" size="1" /> </li>
					<li><p>2020同济吉他协会春季招新</p>
					<hr  align="left" size="1" /> </li>
					<li><p>音乐创作大赛——同济大学站启动啦~</p>
					<hr  align="left" size="1" /> </li>
					<li><p>全国大学生数独挑战赛开赛在即！你准备好了吗？</p>
					<hr  align="left" size="1" /> </li>
	            </ol>
	        </div>
	        <img src="../../assets/img/yinghua.png" alt="" style="margin-left: 45px;height: 470px;">
	    </div>

		<!-- 底部	 -->
		<div id="foot">
			<!-- <span style="--i:1;">快</span>
			<span style="--i:2;">来</span>
			<span style="--i:3;">寻</span>
			<span style="--i:4;">找</span>
			<span style="--i:5;">志</span>
			<span style="--i:6;">同</span>
			<span style="--i:7;">道</span>
			<span style="--i:8;">合</span>
			<span style="--i:9;">的</span>
			<span style="--i:10;">伙</span>
			<span style="--i:11;">伴</span>
			<span style="--i:12;">，</span>
			<span style="--i:13;">站</span>
			<span style="--i:14;">上</span>
			<span style="--i:15;">属</span>
			<span style="--i:16;">于</span>
			<span style="--i:17;">自</span>
			<span style="--i:18;">己</span>
			<span style="--i:19;">的</span>
			<span style="--i:20;">舞</span>
			<span style="--i:21;">台</span>
			<span style="--i:22;">吧</span> -->
			<!-- 来
			寻
			找
			志同道合的伙伴，站上属于自己的舞台吧 -->
			<span id="shineText">快来寻找志同道合的伙伴，站上属于自己的舞台吧</span>
		</div>

	</div>

</template>
<script>
	// export default{
	// 	// var width = window.innerWidth,
	// 	// height = window.innerHeight;
		 
	// 	// if (typeof width != 'number') {  //如果类型不为number,表示该浏览器不支持innerWidth属性
		 
	// 	//  if (document.compatMode == 'CSS1Compat') {   //CSS1Compat：判断是否为标准兼容模式。
		 
	// 	//   width = document.documentElement.clientWidth;
		 
	// 	//   height = document.docuementElement.clientHeight;
		 
	// 	//  } else { //不是标准模式,则有可能是IE6或及其以下版本(早期的浏览器对css进行解析时，并未遵守W3C标准)
		 
	// 	//   width = document.body.clientWidth;   //网页可见区域宽
		 
	// 	//   height = document.body.clientHeight;   //网页可见区域高
	// 	// }
		
	// 	// var ZMD = document.querySelector("#zoumadeng");
	// 	// ZMD.style.height="height px";
	// }
	
	

	
	// window.onresize = window.onload = function(){
	//      var w,h
	//      if(!!(window.attachEvent && !window.opera))
	//      {
	//       h = document.documentElement.clientHeight;
	//       w = document.documentElement.clientWidth;
	//      }else{
	//       h = window.innerHeight;
	//       w = window.innerWidth;
	//      }
	//   //document.getElementById('msg').value  ='窗口大小：' + 'width:' + w + '; height:'+h;
	//     var bgImg = document.getElementById('zoumadeng');
	//     //bgImg.width = (w - 5);
	//    // bgImg.height= (h-5);  
	//    //bgImg.style.height=400;
	          
	//    } 
	
	      // computed: {
	      //   cancard: () => {
	      //     return ""
	      //   }
	      // },
	      
	    //   mounted() {
	    //     let that = this;
	    //     window.onresize = function windowResize() {
	    //       // 通过捕获系统的onresize事件触发我们需要执行的事件
	    //       var w = window.innerWidth
			  // var h = w*0.459;
			  // that.hdgd=h+'px';
			  // console.log(that.hdgd);
	    //       // var h = 270
	    //       // if (w > 1180) {
	    //       //   h = 270
	    //       // } else {
	    //       //   h = 0.22 * w
	    //       // }
	    //       // that.hdgd = h + 'px'
	    //       // console.log(that.hdgd)
	    //     }
	    //   }
		
		
		export default{
			// data(){
			// 	return{
			// 		banH:550
			// 	}
			// },
			// methods:{
			// 	setbanH(){
			// 		this.banH=550
			// 	}
			// },
			// mounted(){
			// 	this.setbanH()
			// }
			
			data(){
				return{
					banH:550,
					
				}
			},
			methods:{
				setSize:function(){
					this.banH=0.43*this.screenWidth;
					// var banIMG = document.getElementsByClassName("banImg");
					// banIMG.style.height = this.banH;
				},
				// imgLoad(){
				// 	this.$nextTick(()=>{
				// 		this.banH=this.$refs.banH[0].height;
				// 	})
				// }
			},
			mounted(){
				this.screenWidth=window.innerWidth;
				this.setSize();
				window.onresize = () =>{
					this.screenWidth = window.innerWidth;
					this.setSize();
				}
				// this.imgLoad();
				// window.addEventListener('resize',()=>{
				// 	this.banH=this.$refs.banH[0].height
				// 	this.imgLoad();
				// },false)
			},
		}
		
		
	    
	
</script>
<style >

    .mokuai{
        display: flex;
        margin: 150px;
        margin-top: 110px;

    }

    #shetuan{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        margin-top: 110px;
        height: 650px;
        width: 100%;
        background-image: url("../../assets/img/blueBG.jpg");

    }

    .mokuaiTitle{
        color: #0099FF;
        font-size: 20px;
        line-height: 40px;
    }

    #shetuanTitle{
        color: rgb(255,255,255);
        font-size: 20px;
        line-height: 40px;
        margin-top: 50px;
    }

    .engTitle{
        color:#B0B0B0;
        font-size: 13px;
    }
    #aboutText{
        margin:20px;
		margin-right: 30px;
    }

	#aboutNews{
	    margin:20px;
		width:55%;
	}

    #aboutText p{
        margin-top: 50px;
        margin-right: 70px;
        font-size: 14px;
        color:rgba(52,52,52,0.8);
        /*text-indent: 2em;*/
        line-height: 22px;
    }

	#aboutNews ol{
		margin-top: 40px ;
		margin-left: 15px;
		color:rgba(52,52,52,0.9);
	}

	#aboutNews ol li p{
		line-height: 22px;
		transition: 0.5s;
		color:rgba(52,52,52,0.8);
	}

	#aboutNews hr{
		color:#B0B0B0;
		border-top:dashed;
		margin-top: 10px;
		margin-bottom: 10px;
		transition: 0.5s;
	}

	#aboutNews ol li:hover hr{
		color:#0099FF;
	}

	#aboutNews ol li:hover p{
		text-indent: 1em;
		color:#0099FF;
	}

    .el-divider--horizontal{
        border-top:0.1px solid #B0B0B0;
    }

    #clubTable {
        width: 80%;
        height: 400px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: space-around;
        margin: 20px;

    }

    #clubTable .clubItem{
        width:13%;
        height:150px;
        /*background: rgb(243,242,240);*/
        background: rgb(255,255,255);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all .5s;
    }

    #clubTable .clubItem img{
        height: 90px;
        margin: 15px;

    }

    #clubTable .clubItem .clubName{
        font-size: 13px;
        color:rgba(52,52,52,0.7);
    }

    #clubTable .clubItem:hover{
        box-shadow: 0 7px 12px rgba(52,52,52,0.7);
		transform: scale(1.1);

    }

	/* 普通 */
	/* #foot{
		height: 50px;
		background: rgb(43,43,43);
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(255,255,255);
		font-size: 15px;

	}
	*/

	/* 流动 */
/* 	#foot{
		height: 40px;
		display: flex;
		justify-content: center;
		align-items:flex-end;
		position: relative;
		background: rgb(43,43,43);
		-webkit-box-reflect: below -15px linear-gradient(transparent,rgba(0,0,0,0.2));
	}
	#foot span{
		position: relative;
		display: inline-block;
		color: rgb(255,255,255);
		font-size: 16px;
		text-transform: uppercase;
		animation: animate 3s ease-in-out infinite;
		animation-delay: calc(0.1s * var(--i));
	}
	@keyframes animate{
		0%
		{
			transform:translateY(0px);

		}
		20%
		{
			transform: translateY(-20px);
		}
		40%,100%
		{
			transform: translateY(0px);
		}
	} */

    /* 聚光灯 */
	#foot{
			height: 50px;
			background: rgb(43,43,43);
			-webkit-font-smoothing: grayscale;
			position: relative;
		}
	#shineText{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 30px 68px;
		color: #fff;
		background: linear-gradient(to right ,#4d4d4d 0 ,#fff 10%,#4d4d4d 20%);
		background-position: 0;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shine 5.5s linear infinite;
		font-weight: 500;
		font-size: 25px;
		white-space: nowrap;
	}
	@keyframes shine{
		0%{
			background-position: 0;

		}
		60%{
			background-position: 658px;
		}
		100%{
			background-position: 658px;
		}
	}


</style>
