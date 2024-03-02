<template>
  <div class="hp-wrapper">
    <div id="fixed-bg"></div>
    <div class="container">
      <div class="splash">
        <h1 class="splash-head">厦一海沧 | 校园流浪猫管理平台</h1>
        <p class="splash-subhead">
          \在这里觅见你的猫猫学长&猫猫学姐/
        </p>
        <p>
          <a @click="doLogin()" class="main-button">
            进入平台
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import {setToken} from "@/cookieManager";

export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    doLogin() {
      this.$router.push('/home')
      setToken("114514")
    }
  }
}
</script>

<style>
body {
  font-size: 16px;
  margin: 0;
}
#fixed-bg{
  background-image: url("~@/assets/images/bg.jpg");
  background-size: cover;
  height: 100vh;
  position: fixed;
  width: 100%;
  z-index: -1;
}


.splash {
  bottom: 0;
  height: 50%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 100px;
  width: 80%
}

.splash-head {
  color: #fff;
  font-family: Minecraft;
  line-height: 1.5em;
  margin: .2em 0 .5em;
  padding: .8em .5em 1em;
  text-shadow: 0 4px 3px rgba(0,0,0,.4),0 8px 13px rgba(0,0,0,.1),0 18px 23px rgba(0,0,0,.1)
}

.splash-subhead {
  color: #fff;
  font-family: Ubuntu,Segoe UI,Microsoft Yahei,Microsoft Jhenghei,sans-serif;
  font-size: 16px;
  letter-spacing: .05em;
  margin-bottom: 3em
}

@media (max-width: 768px) {
  .splash {
    width:100%
  }

  .splash-head {
    font-size: 200%
  }
}

@media (min-width: 768px) {
  .splash-head {
    font-size:250%
  }
}

.main-button {
  background: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  font-size: 120%;
  padding: .8em 2em;
  transition: color .25s ease-in-out,border-color .25s ease-in-out,background-color .25s ease-in-out
}

.main-button:hover {
  background-color: hsla(0,0%,100%,.2);
  color: #fff
}

#intro i {
  font-size: 80px
}
</style>
