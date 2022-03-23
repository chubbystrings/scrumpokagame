<template>
  <div>
    <div class="first-screen">
      <div class="welcome-text">
        <h2>Scrum Poka</h2>
        <small>A scrum story points interactive game</small><br />
        <small>Built by Emeka Okwor</small>
      </div>
      <div :class="`icon hide`" ref="wrapper">
        <BIconSuitClubFill
          :style="{ width: '100%', height: '100%', color: '#5692e8' }"
        />
      </div>
    </div>
    <div class="contact-wrapper" ref="contactWrapper">
      <div class="contact-info">
        <div class="contact-header">
          <h2>Create New Session</h2>
          <small>
            Fill the form to create a new session/game, a link will be generated
            for other users who intend to join. Share link with others to play.
          </small>
        </div>
        <div class="contact-card">
          <div class="contact-inputs">
            <div>
              <label for="name">Name*</label>
              <input v-model="username" type="text" id="name" name="name" />
            </div>
            <div>
              <label for="team">Team Name*</label>
              <input v-model="team" type="text" id="team" name="team" />
            </div>
            <div>
              <label for="name">Max Fibonacci*</label>
              <select v-model="select">
                <option>select option</option>
                <option value="1">1</option>
                <option value="3">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="8">8</option>
                <option value="13">13</option>
              </select>
            </div>
            <div>
              <label>Select Avatar</label>
              <div class="select--avatar">
                <img
                  @click="handleSelect(avatar, i)"
                  v-for="(avatar, i) in avatars"
                  :src="avatar"
                  :key="i"
                  :class="isSelected(i)"
                />
              </div>
            </div>
          </div>

          <div class="button-wrapper">
            <button
              @click="handleCreate"
              :disabled="!formIsValid || clicked"
              class="btn"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import socket from "@/services/socket.service";
import { avatars } from "@/utils/avatars";
import { BIconSuitClubFill } from "bootstrap-icons-vue";
import gsap from "gsap";

export default defineComponent({
  components: {
    BIconSuitClubFill,
  },
  setup() {
    const team = ref("");
    const username = ref("");
    const router = useRouter();
    const selectedAvatar = ref("");
    const select = ref("");
    const clicked = ref(false);

    onMounted(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        onReverseComplete: () => {
          gsap.to(preloader, {
            x: "200%",
            duration: 1,
          });
        },
      });
      const preloader = document.querySelector(".first-screen");
      // const main = document.querySelector(".contact-wrapper");
      const icon = document.querySelector(".hide") as HTMLDivElement;
      const text = document.querySelector(".welcome-text");

      gsap.to(icon, {
        delay: 2.5,
        scale: 1.2,
        repeat: -1,
        ease: "Elastic.easeOut",
        // ease: Elastic.easeOut,
        // ease: Elastic.easeOut.config(1.75, 1),
        yoyo: true,
        duration: 1,
      });

      tl.fromTo(
        text,
        {
          opacity: 0,
        },
        {
          duration: 1.5,
          opacity: 1,
        }
      ).fromTo(
        icon,
        {
          opacity: 0,
          y: -100,
        },
        {
          duration: tl.reversed() ? 1 : 2,
          y: 0,
          opacity: 1,
          ease: "bounce.out",
          onComplete: () => {
            tl.reverse();
          },
        }
      );

      // .fromTo(
      //   main,
      //   {
      //     opacity: 0,

      //   },
      //   {
      //     opacity: 1,

      //   }
      // );
    });

    const callback = (room: string) => {
      clicked.value = false;
      router.push(`/${room}`);
    };

    const handleCreate = () => {
      clicked.value = true;
      socket.createRoom(
        team.value,
        username.value,
        selectedAvatar.value,
        select.value,
        callback
      );
    };

    const formIsValid = computed(() => team.value && username.value);

    const isSelected = computed(() => {
      return (i: number) => {
        if (avatars[i] === selectedAvatar.value) return "selectedAvatar";
        return "";
      };
    });

    const handleSelect = (avatar: string) => {
      selectedAvatar.value = avatar;
    };
    return {
      team,
      username,
      handleCreate,
      selectedAvatar,
      avatars,
      handleSelect,
      isSelected,
      formIsValid,
      select,
      clicked,
    };
  },
});
</script>
<style scoped>
.first-screen {
  background: var(--primary);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 100000001;
}
.welcome-text {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  bottom: 0;
}

.welcome-text h2 {
  font-weight: 900;
  font-size: 50px;
}
.welcome-text small:last-of-type {
  font-size: 10px;
}
.contact-wrapper {
  display: grid;
  place-items: center;
  width: 100%;
  height: 70vh;
  box-sizing: border-box;
  font-family: Mulish;
}

.icon {
  border-radius: 50%;
  width: 220px;
  height: 220px;
  display: grid;
  place-items: center;
  background-color: transparent;
  z-index: 1000000;
}

.preloader {
  background: var(--primary);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info {
  width: 45%;
  display: grid;
  row-gap: 40px;
}

.contact-card {
  padding: 20px;
  background: var(--card);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  border: 1px solid var(--line);
  height: 300px;
}

.contact-card label {
  font-size: 10px;
}

.contact-card .button-wrapper {
  position: absolute;
  bottom: 5px;
  right: 30px;
}

.contact-inputs {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}

.contact-inputs input {
  padding: 0px 10px;
  box-sizing: border-box;
}

.contact-inputs input,
select {
  background: var(--input);
  display: block;
  width: 100%;
  border: none;
  outline: none;
  margin: 5px 0px;
  color: #ffffff;
  border-radius: 5px;
  height: 40px;
}

.contact-message {
  width: 100%;
}

.select--avatar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.select--avatar img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.select--avatar img:hover {
  filter: blur(2px);
  cursor: pointer;
}

.selectedAvatar {
  filter: blur(1px);
}

@media only screen and (min-width: 1024px) {
  .contact-card label {
    font-size: 15px;
  }
}

@media only screen and (max-width: 725px) {
  .contact-info {
    width: 75%;
  }
}

@media only screen and (max-width: 425px) {
  .contact-info {
    width: 75%;
  }

  .contact-info h2 {
    font-size: 16px;
  }

  .contact-card {
    /* width: calc(100% - 50px); */
    height: 350px;
  }
}
</style>
