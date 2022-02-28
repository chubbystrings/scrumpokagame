<template>
  <div>
    <div class="preloader" ref="preloader">
      <div class="prl-logo">
        <div :class="`clubs-icon hide`" ref="wrapper">
          <!-- <BIconSuitClubFill
            :style="{ width: '100%', height: '100%', color: '#5692e8' }"
          /> -->
        </div>
      </div>
      <div class="lightBlue-slider" ref="lightBlueSlider"></div>
      <div class="dark-blue-slider" ref="darkBlueSlider"></div>
      <div class="darker-blue-slider" ref="darkerBlueSlider"></div>
    </div>
    <div class="main">
      <left-side-bar :users="users"></left-side-bar>
      <div class="content">
        <game-is-live></game-is-live>
        <Header :team="'Team One'" />
        <div class="btn--wrapper" v-if="isStarted && userType">
          <button class="btn" @click="handleRestart" v-if="isReveal">
            Restart
          </button>
          <button
            :disabled="points.length === 0"
            v-else
            @click="handleReveal"
            class="btn"
          >
            Reveal
          </button>
        </div>

        <div class="btn--wrapper" v-if="!isStarted && userType">
          <button class="btn" @click="handleStart">Start</button>
        </div>
        <div class="generate-comp">
          <generate-link></generate-link>
        </div>
        <div class="card-wrapper" v-if="points.length > 0">
          <card
            v-for="(point, i) in points"
            :key="i"
            :color="point.color"
            :icon="point.icon"
            :number="point.point"
            :username="point.username"
          ></card>
        </div>
        <no-points-component v-else></no-points-component>
      </div>
      <Footer />
      <hanging-side-bar></hanging-side-bar>
      <Tab />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeMount,
} from "vue";
import gsap from "gsap";
import { storeToRefs } from "pinia";
import Header from "./Header.vue";
import LeftSideBar from "./LeftSideBar.vue";
// import RightSideBar from "./RightSideBar.vue";
import HangingSideBar from "./HangingSideTab.vue";
import GameIsLive from "./GameLiveAvatar.vue";
import NoPointsComponent from "./NoPointsComponent.vue";
import Tab from "./HangingTab.vue";
// import JoinSession from "./JoinSession.vue";
import socket from "../services/socket.service";
import { getUser, clearData } from "@/utils/localStorage";
import { useStore } from "@/store/index";
import Card from "./Card.vue";
import Footer from "./Footer.vue";
import { START_MODAL, END_MODAL } from "@/utils/ModalNames";
import GenerateLink from "./ui/GenrateLink.vue";
import { BIconSuitClubFill } from "bootstrap-icons-vue";
import { TextPlugin } from "gsap/TextPlugin";



export default defineComponent({
  components: {
    Header,
    LeftSideBar,
    Card,
    Footer,
    Tab,
    HangingSideBar,
    GameIsLive,
    NoPointsComponent,
    GenerateLink,
    //BIconSuitClubFill,
  },
  setup() {
    const isJoinedSession = ref(false);
    const colors = ["red", "black"];
    const store = useStore();
    const { reveal } = storeToRefs(store);
    const isStarted = ref(false);
    gsap.registerPlugin(TextPlugin);

    const isReveal = computed(() => reveal.value.reveal);
    const users = computed(() => store.getAllUsers);
    const points = computed(() => store.getAllPoints);
    const ticketName = computed(() => store.getCurrentTicketName);
    const currentUser = computed(() => store.getCurrentUser);
    const userType = computed(() => store.getCurrentUser.type === "author");

    const randomColor = () => {
      const rand = Math.floor(Math.random() * colors.length);
      return colors[rand];
    };

    const handleJoin = ({
      username,
      room,
      avatar,
    }: {
      username: string;
      room: string;
      avatar: string;
    }) => {
      const handleJoinSession = () => (isJoinedSession.value = true);
      socket.joinRoom(username, room, avatar, handleJoinSession);
    };

    const handleRestart = () => {
      socket.restart(currentUser.value.room);
      store.openModal(START_MODAL);
    };

    const handleReveal = () => {
      socket.revealPoint(currentUser.value.room);
    };

    const handleStart = () => {
      store.openModal(START_MODAL);
    };

    const handleShowWinningCard = () => {
      store.openModal(END_MODAL);
    };

    onMounted(() => {
      const lightBlueSlider = document.querySelector(".lightBlue-slider");
      const darkBlueSlider = document.querySelector(".dark-blue-slider");
      const darkerBlueSlider = document.querySelector(".darker-blue-slider");
      const hide = document.querySelector(".hide");
      const preloader = document.querySelector(".preloader");
      const main = document.querySelector(".main") as HTMLDivElement
      main.style.opacity = '0'

      // gsap.to(hide, {
      //   scale: 1.2,
      //   repeat: -1,
      //   ease: "Elastic.easeOut",
      //   // ease: Elastic.easeOut,
      //   // ease: Elastic.easeOut.config(1.75, 1),
      //   yoyo: true,
      //   duration: 1,
      // });

      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        onReverseComplete: () => {
          gsap.to(preloader, {
            x: "-200%",
            duration: 2,
          });
          gsap.to(
            main,
            {
              delay: 1,
              opacity: 1,
            }
          );
        },
      });

      tl.to(lightBlueSlider, {
        x: "-10%",
        duration: 1,
      });

      tl.to(
        darkBlueSlider,
        {
          x: "-20%",
          duration: 1.5,
        },
        "-=1"
      );

      tl.to(
        darkerBlueSlider,
        {
          x: "-30%",
          duration: 1.5,
        },
        "-=1"
      );

      tl.to(hide, {
        x: "0%",
        duration: 5,
        opacity: 1,
        text:"Let the games begin!",
        repeatDelay:1, 
        yoyo:true,
        onComplete: () => {
          tl.reverse();
        },
      });

      window.onbeforeunload = function (e: BeforeUnloadEvent) {
        e = e || window.event;

        if (e) {
          e.returnValue = "Sure?";
        }

        return "Sure?";
      };
    });

    watch([isReveal], () => {
      if (isReveal.value) {
        setTimeout(() => {
          handleShowWinningCard();
        }, 1000);
      }
    });

    watch([ticketName], () => {
      if (ticketName.value) {
        isStarted.value = true;
      } else {
        isStarted.value = false;
      }
    });

    return {
      isJoinedSession,
      handleJoin,
      users,
      randomColor,
      points,
      handleRestart,
      isReveal,
      handleReveal,
      ticketName,
      handleStart,
      isStarted,
      userType,
    };
  },
});
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.content {
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  display: grid;
  place-items: center;
  position: relative;
}

.btn--wrapper {
  position: absolute;
  top: 60px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.card-wrapper {
  box-sizing: border-box;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 15px;

  margin-top: 150px;

  height: 550px;
  overflow-x: scroll;
  max-width: 60rem;
}

.ticket--name {
  font-size: 55px;
  position: absolute;
  opacity: 0.09;

  bottom: 5px;
}

.generate-comp {
  position: absolute;
  top: 110px;
}

/* .clubs-icon {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: grid;
  place-items: center;
  background-color: transparent;
} */
.hide {
  opacity: 0;
  color: var(--button);
  font-weight: 900;
  font-size: 45px;
}
.prl-logo {
  font-family: "Abril Fatface", cursive;
  font-size: 1.3rem;
  z-index: 2;
}

.preloader {
  background: var(--lighter);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightBlue-slider,
.dark-blue-slider,
.darker-blue-slider {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
}

.lightBlue-slider {
  background: var(--button);
}

.dark-blue-slider {
  background: var(--input);
}

.darker-blue-slider {
  background: var(--primary);
}

@media screen and (max-width: 965px) {
  .card-wrapper {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (max-width: 925px) {
  .main {
    grid-template-columns: 1fr;
  }

  .card-wrapper {
    margin-top: 160px;
  }
}

@media screen and (max-width: 825px) {
  .card-wrapper {
    grid-template-columns: 1fr 1fr;
    row-gap: 25px;
  }
}

@media screen and (max-width: 625px) {
  .card-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
