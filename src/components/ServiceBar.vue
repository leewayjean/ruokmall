<template>
  <div class="service-bar">
    <ul>
      <li>
        <a>
          <span class="icon icon-setting"></span> 预约维修服务
        </a>
      </li>
      <li>
        <a>
          <span class="icon icon-7day"></span>7天无理由退货
        </a>
      </li>
      <li>
        <a>
          <span class="icon icon-15day"></span>15天免费换货
        </a>
      </li>
      <li>
        <a>
          <span class="icon icon-post"></span>满150元包邮
        </a>
      </li>
      <li>
        <a>
          <span class="icon icon-local"></span>520余家售后网点
        </a>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" >
.service-bar {
  height: 80px;
  border-bottom: 1px solid #e0e0e0;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #e0e0e0;
      &:nth-last-child(1){
          border-right: none;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #616161;
        cursor: pointer;
        &:hover {
          color: #f60;
        }
        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          background-repeat: no-repeat;
          background-size: 24px;
          margin-right: 6px;
        }
        .icon-setting {
          background-image: url(../assets/img/servicebar/icon-setting.png);
        }
        .icon-7day {
          background-image: url(../assets/img/servicebar/icon-7day.png);
        }
        .icon-15day {
          background-image: url(../assets/img/servicebar/icon-15day.png);
        }
        .icon-post {
          background-image: url(../assets/img/servicebar/icon-post.png);
        }
        .icon-local {
          background-image: url(../assets/img/servicebar/icon-loc.png);
        }
      }
    }
  }
}
</style>