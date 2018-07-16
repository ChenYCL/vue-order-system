<template>
  <div id="start">
    <div class="start_content">
      <header class="start_header">
        <img src="../assets/images/canju.png" alt="餐具"> 用餐人数
      </header>
      <p class="notice">请选择正确的用餐人数，小二马上给你送餐具</p>
      <div class="content">
        <ul class="user_list">
          <li v-for="n in 12" :class="{active:activeIndex[n-1]===1}" ref="uid_click" @click="addChangeEvent(n)">
            <span>{{n}}人</span>
          </li>
        </ul>
      </div>

      <div class="start" @click.prevent.stop="sendDesk()">
        <span>开始点菜</span>
      </div>

      <div class="mark_input">
        <input type="text" placeholder="请选择口味" ref="userNeeds" v-model="inputStr">
        <div class="tag">
          <ul>
            <li v-for="(item,key) in inputContent" class="item" v-if="inputContent.length>0">{{item}}<i
              @click="removeUserWant(key)">x</i></li>
          </ul>
        </div>
      </div>
      <ul class="mark_list">
        <li class="" v-for="item in markListDefault" @click.self="addNeeds(item)">
          <span @click.self="addNeeds(item)">{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Config from '../assets/model/config.js';
  import storage from '../assets/model/storage.js';

  export default {
    name: "Start",
    data() {
      return {
        activeIndex: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        markListDefault: ['打包带走', '不要辣椒', '微辣'],
        inputContent: [],
        inputStr: '',
        api: Config.api,
        num: ''
      }
    },
    created() {
      this.getPeopeleInfoList();
    },
    methods: {
      addChangeEvent(i) {

        for (let f = 0; f < 12; f++) {
          this.$set(this.activeIndex, f, 0);
        }
        this.$set(this.activeIndex, i - 1, 1);
        this.num = i;
      },
      addNeeds(name) {
        if (this.inputContent.includes(name)) return;
        this.inputContent.push(name);
        this.$refs.userNeeds.setAttribute('placeholder', '')
      },
      removeUserWant(id) {
        this.inputContent.splice(id, 1);
      },
      // 提交人数
      async sendDesk() {
        // 桌子号
        let api = this.api + 'api/addPeopleInfo';
        try {
          var res = await this.$http.post(api, {
            uid: storage.get('roomid'),
            p_num: this.num,
            p_mark: this.inputStr == '' ? this.inputContent.join() : this.inputStr
          });
          console.log(res);
          if (res.data.success) {
            this.$router.push({name: 'home', params: {cartNumAdd: this.num}})
          }
        } catch (e) {

        }
      },
      // 获取用户点餐信息
      async getPeopeleInfoList() {
        try {
          let api = this.api + 'api/peopleinfolist?uid=' + storage.get('roomid');
          let res = await this.$http.get(api);
          this.peopleInfoList = res.data.result[0]; // 无内容时，this.peopleInfoList 为undefined
          if(this.editPeopleInfo){
            // 则有数据内容
            this.$route.push({name:'home'})
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    mounted() {

    }
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
    li.active {
      span {
        background: red;
      }
    }
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

  .mark_input {
    text-align: center;
    box-sizing: border-box;
    border-radius: 1rem;
    position: relative;
    .tag {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 2rem;
      margin-top: 2.5rem;
      li {
        display: inline-block;
        border-radius: .5rem;
        border: 1px solid red;
        text-align: center;
        margin: .1rem;
        padding: .2rem;

      }
    }
    input {
      outline: none;
      height: 3rem;
      width: 90%;
      margin: 2rem auto;
      border-radius: 1rem;
    }
  }

  .mark_list {
    width: 90%;
    margin: 0 auto;
    li {
      display: inline-block;
      padding: 1rem 2rem;
      border: 1px solid cadetblue;
      border-radius: 1rem;
      margin: 0 .5rem;
      i {
        color: green;
      }
    }
    li.active {
      background: lightblue;
    }

  }
</style>
