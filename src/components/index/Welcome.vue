<template>
    <div>
        <img src="../../assets/img/sanhaowu.jpg" alt="" style="height: 550px;width: 100%;margin:0;">
        <!-- <div class="banner">
			<div class="bannerCenter"></div>
			<div class="bannerBottom"></div>
		</div> -->

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
                    起飞页不仅是一个方便快捷的构建网站的自助建站平台，更重要的是，我们为中国用户提供了更多贴心的服务：网站备案、自动备份、快速恢复以及网站代建服务。我们使用了国内和香港最好的网络和云服务器，确保您的网站能够快速完美的呈现在访客面前。
                    起飞页不仅是一个方便快捷的构建网站的自助建站平台，更重要的是，我们为中国用户提供了更多贴心的服务：网站备案、自动备份、快速恢复以及网站代建服务。我们使用了国内和香港最好的网络和云服务器，确保您的网站能够快速完美的呈现在访客面前。
                    起飞页不仅是一个方便快捷的构建网站的自助建站平台，更重要的是，我们为中国用户提供了更多贴心的服务：网站备案、自动备份、快速恢复以及网站代建服务。我们使用了国内和香港最好的网络和云服务器，确保您的网站能够快速完美的呈现在访客面前。
                    起飞页不仅是一个方便快捷的构建网站的自助建站平台，更重要的是，我们为中国用户提供了更多贴心的服务：网站备案、自动备份、快速恢复以及网站代建服务。我们使用了国内和香港最好的网络和云服务器，确保您的网站能够快速完美的呈现在访客面前。

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
                    <img src="../../assets/img/tjlogo_blue.png" alt="">
                    <div class="clubName">机器人社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">吉他社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">计算机社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">街舞社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">桌游社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">滑板社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">击剑社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">攀岩社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">棒球社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">相声社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">汉服社</div>
                </div>
                <div class="clubItem">
                    <img src="" alt="">
                    <div class="clubName">魔术社</div>
                </div>
				<div class="clubItem">
				    <img src="" alt="">
				    <div class="clubName">飞盘社</div>
				</div>
				<div class="clubItem">
				    <img src="" alt="">
				    <div class="clubName">航模社</div>
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
	            	<li><p>活动标题1</p>
					<hr  align="left" size="1" />  
	            	</li>
	            	<li><p>活动标题2</p>
					<hr  align="left" size="1" /> </li>
	            	<li><p>活动标题3</p>
					<hr  align="left" size="1" /> </li>
	            	<li><p>活动标题4</p>
					<hr  align="left" size="1" /> </li>
	            	<li><p>活动标题5</p>
					<hr  align="left" size="1" /> </li>
					<li><p>活动标题6</p>
					<hr  align="left" size="1" /> </li>
					<li><p>活动标题7</p>
					<hr  align="left" size="1" /> </li>
					<li><p>活动标题8</p>
					<hr  align="left" size="1" /> </li>
	            </ol>
	        </div>
	        <img src="../../assets/img/yinghua.png" alt="" style="margin-left: 45px;height: 470px;">
	    </div>
        
		<!-- 底部	 -->
		<div id="foot">
			快来寻找志同道合的伙伴，站上属于自己的舞台吧
		</div>
	</div>
	

<!--    <div class="block">-->
<!--&lt;!&ndash;        <span class="demonstration">默认 Hover 指示器触发</span>&ndash;&gt;-->
<!--&lt;!&ndash;        <span>111</span>&ndash;&gt;-->
<!--        <el-carousel  height="80%" width="100%" >-->
<!--            <el-carousel-item v-for="item in imgList" :key="item.id">-->

<!--                <img :src="item.idView" alt="" class="image" style="height: 80%;width: 100%;">-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->
<!--    </div>-->
     

</template>

<script>
    // export default {
    //     data(){
    //         return{
    //             imgList:[
    //                 {id:0,idView:"../../"}
    //             ]
    //         }
    //     }
    // }
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
        height: 600px;
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
	}
	
	#aboutNews ol li p{
		line-height: 22px;
		transition: 0.5s;
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
	
	#foot{
		height: 50px;
		background: rgb(43,43,43);
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(255,255,255);
		font-size: 15px;
		/* color: rgba(0,153,255,0.9); */
	}
	
	.banner{
		height:550px;
		width: 100%;
		margin: 0;
		display: flex;
	}
	
	.bannerCenter{
		width:35%;
		height:25%;
		display: flex;
	}

</style>
