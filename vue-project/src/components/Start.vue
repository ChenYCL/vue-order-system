<template>
  <div id="start">
    <div class="start_content">
      <header class="start_header">
        <img src="../assets/images/canju.png" alt="餐具"> 用餐人数
      </header>
      <p class="notice">请选择正确的用餐人数，小二马上给你送餐具</p>
      <div class="content">
        <ul class="user_list">
          <li>
            <span>1人</span>
          </li>
          <li>
          <span>
            2人
          </span>
          </li>
          <li>
          <span>
            3人
          </span>
          </li>

          <li>
          <span>
            4人
          </span>
          </li>
          <li>
          <span>
            5人
          </span>
          </li>
          <li>
          <span>
            6人
          </span>
          </li>
          <li>
          <span>
            7人
          </span>
          </li>
          <li>
          <span>
            8人
          </span>
          </li>
          <li>
          <span>
            9人
          </span>
          </li>
          <li>
          <span>
            10人
          </span>
          </li>
          <li>
          <span>
            11人
          </span>
          </li>

          <li>
          <span>
            12人
          </span>
          </li>

        </ul>
      </div>
      <router-link to="/home">
        <div class="start">
          <span>开始点菜</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Start"
  }
</script>

<style scoped lang="scss">
  .start_content .start_header {
    height: 3.2rem;
    line-height: 3.2rem;
    background: #000;
    color: #fff;
    width: 10rem;
    margin: 5rem auto 0rem auto;
    border-radius: .5rem;
  }

  .start_content .start_header img {
    height: 2.2rem;
    line-height: 2.2rem;
    position: relative;
    top: .5rem;
    margin-left: 1rem;
  }

  .start_content .notice {
    text-align: center;
    color: red;
    margin: 1rem 0rem;
  }

  .start_content .user_list {
    display: flex;
    flex-direction: row;
    margin: 1rem .5rem;
    flex-wrap: wrap;
    padding: .5rem;
    justify-content: space-between;
    background: #f7f7f7;
  }

  .start_content .user_list li {
    width: 25%;
    padding: .5rem;
    box-sizing: border-box;
  }

  .start_content .user_list li span {
    border: 1px solid #ccc;
    border-radius: .5rem;
    display: block;
    height: 3.2rem;
    width: 100%;
    text-align: center;
    line-height: 3.2rem;
    background: #fff;
  }

  .start_content .start {
    position: fixed;
    margin-left: -3rem;
    border-radius: 50%;
    bottom: 5rem;
    text-align: center;
    left: 50%;
    width: 6rem;
    height: 6rem;
    background: red;
  }

  .start_content .start span {
    display: block;
    width: 3rem;
    margin: 0 auto;
    position: relative;
    top: 1.4rem;
  }

</style>
