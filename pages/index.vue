<template>
  <div>
    <el-row class="banner-row">
      <el-col :span="24" class="banner-container">
        <img src="@/static/images/index/big-banner.png" alt="" class="big-banner">
        <h1 class="banner-title">物联网产业技术创新战略联盟官网<br>全新上线</h1>
      </el-col>
    </el-row>
    <el-row class="block-row">
      <h3 class="block-title">最新资讯</h3>
      <el-col class="content-block">
        <swiper ref="latestSwiper" class="latest-swiper" :options="latestSwiperOptions">
          <swiper-slide v-for="(news, index) in latest" :key="'latest-' + index">
            <news-slide-block :title="news.title" :content="news.abstract" :img-src="news.imgSrc" />
          </swiper-slide>
        </swiper>
      </el-col>
    </el-row>
    <el-row class="block-row">
      <h3 class="block-title">联盟介绍</h3>
      <el-col :span="12" class="content-block">
        <div class="block-logo">
          <img src="@/static/images/logo.png" alt="" class="intro-block-img">
          <img src="@/static/images/title.svg" alt="" class="intro-block-img">
        </div>
        <p><span class="dark-blue">中国物联网产业技术创新战略联盟</span>中国物联网产业技术创新战略联盟由物联网部际联席会议的14部委推荐的40家单位发起，于2013年10月24日成立，中国电子科技集团公司任理事长单位。</p>
        <el-button type="primary">更多</el-button>
      </el-col>
      <el-col :span="12" class="content-block">
        <p>2013年10月24日，“物联网产业技术创新战略联盟”成立大会在京成功召开，科技部曹健林副部长出席会议并讲话，国家发展改革委、工信部等物联网发展部际联席会议14个部委作为联盟指导单位参会，来自40家联盟发起单位的代表参加了会议。</p>
        <p>联盟按照“战略引领、协同创新、产业推动、合作共赢”的原则组建，是由我国物联网产业链优势企业、科研院所、高校、组织共同发起组建的首个国家级物联网产业战略联盟。</p>
        <p>联盟将围绕产业政策研究、重大技术攻关、提供物联网公共服务等方面开展工作，并向全国公开征集联盟会员，形成面向行业的、开放的、具有国际先进水平的行业共性技术创新平台。</p>
      </el-col>
    </el-row>
    <el-row class="block-row">
      <h3 class="block-title">联盟动态</h3>
      <el-col :span="24" class="content-block">
        <el-tabs tab-position="left">
          <el-tab-pane>
            <div slot="label" class="tab-title">物联网产业技术创新战略年会</div>
            <img src="@/static/images/index/trend-1.jpg" alt="" class="trend-img">
          </el-tab-pane>
          <el-tab-pane>
            <div slot="label" class="tab-title">第二界国际开放物联技术与标准峰会</div>
            <img src="@/static/images/index/trend-2.png" alt="" class="trend-img">
          </el-tab-pane>
          <el-tab-pane>
            <div slot="label" class="tab-title">第三界国际开放物联技术与标准峰会</div>
            <img src="@/static/images/index/trend-3.png" alt="" class="trend-img">
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row class="block-row">
      <h3 class="block-title">物联大会</h3>
      <el-col :span="6" class="content-block coferences-row-content">
        <h5 class="coferences-title">全球物联网大会</h5>
        <p> “全球物联网大会及创新成果点映”暨首届全球物联网大会于2017年12月在北京中关村软件园国际会议中心开幕，来自德国、英国等国家和地区的物联网领域专家及企业到场分享全球范围内物联网发展近况及最新技术信息。</p>
        <el-button type="primary">更多</el-button>
      </el-col>
      <el-col :span="18" class="content-block" style="text-align: center">
        <swiper ref="coferencesSwiper" class="coferences-swiper" :options="coferencesSwiperOptions">
          <swiper-slide>
            <img src="@/static/images/index/coferences-1.svg" alt="" class="coferences-img">
          </swiper-slide>
          <swiper-slide>
            <img src="@/static/images/index/coferences-2.svg" alt="" class="coferences-img">
          </swiper-slide>
          <swiper-slide>
            <img src="@/static/images/index/coferences-3.svg" alt="" class="coferences-img">
          </swiper-slide>
        </swiper>
      </el-col>
    </el-row>
    <el-row class="block-row">
      <h3 class="block-title">联盟成员</h3>
      <el-col :span="24" class="content-block">
        <swiper ref="memberSwiper" class="member-swiper" :options="memberSwiperOptions">
          <swiper-slide v-for="(orgnization, index) in member" :key="'member-' + index">
            <img :src="orgnization.imgSrc" class="member-img" :alt="orgnization.title" :title="orgnization.title">
          </swiper-slide>
        </swiper>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { latestGetter, memberGetter } from '@/assets/getters'

export default {
  data() {
    return {
      latestSwiperOptions: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        }
      },
      coferencesSwiperOptions: {
        spaceBetween: 30,
        effect: 'fade',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        }
      },
      memberSwiperOptions: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        }
      },
      latest: [],
      member: []
    }
  },
  created() {
    this.latest = latestGetter()
    this.member = memberGetter()
  }
}
</script>

<style lang="stylus">
.banner-container
  position: relative

  .big-banner
    width: 100%
    height: 400px

  .banner-title
    position: absolute
    top: 15%
    width: 100%
    text-align: center
    font-size: 48px
    color: #fff
    line-height: 100px
    letter-spacing: 26px

.block-row

  .block-title
    width: 100%
    text-align: center

  &:nth-child(odd)
    background-color: rgb(42, 60, 76)
    color: #fff

  &:nth-child(even)
    background-color: #fff
    color: #333

  .content-block
    padding: 40px

  .intro-block-img
    height: 40px

  // 首页标签页的active样式
  .el-tabs__nav.is-left
    padding-right: 80px

  .el-tabs__item.is-left
    padding: 15px
    height: auto

  .tab-title
    background-color: rgba(242, 242, 242, 0.447058823529412)
    font-size: 30px
    color: #333
    text-align: center
    padding: 20px
    height: auto
    border-radius: 15px
    width: 100%

  .el-tabs__nav-wrap.is-left::after
    height: 0

  .el-tabs__active-bar.is-left
    height: 0 !important
    width: 0
    top: 35px
    right: 10px
    border-top: 21px solid transparent
    border-bottom: 21px solid transparent
    border-left: 30px solid rgb(24, 144, 255)
    background-color: transparent

    &::after
      content: '.'
      color: transparent
      position: absolute
      top: -15px
      left: -33px
      height: 0
      width: 0
      border-top: 15px solid transparent
      border-bottom: 15px solid transparent
      border-left: 24px solid #fff

  .trend-img
    height: 100%
    max-height: 330px
    width: 100%

  .coferences-title
    color: #fff
    font-size: 18px
    font-weight: 700

  .coferences-row-content
    color: rgba(215, 215, 215, 0.752941176470588)
    font-size: 14px

  .member-img
    width: 100%
    height: 160px

p
  text-indent: 2em
</style>
