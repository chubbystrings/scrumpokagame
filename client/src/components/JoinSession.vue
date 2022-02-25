<template>
  <div class="contact-wrapper">
    <div class="contact-info">
      <div class="contact-header">
        <h2>Join Session As</h2>
      </div>
      <div class="contact-card">
        <div class="contact-inputs">
          <div>
            <label for="name">Name*</label>
            <input v-model="name" type="text" id="name" />
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
          <button @click="handleJoin" :disabled="!name" class="btn">
            Join
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { avatars } from "@/utils/avatars";
import socket from "../services/socket.service";
import { useRouter } from "vue-router";

export default defineComponent({
  setup(props, context) {
    const name = ref("");
    const route = useRoute();
    const selectedAvatar = ref("");
     const router = useRouter();

    const isSelected = computed(() => {
      return (i: number) => {
        if (avatars[i] === selectedAvatar.value) return "selectedAvatar";
        return "";
      };
    });

    const handleSelect = (avatar: string) => {
      selectedAvatar.value = avatar;
    };

    

    const handleJoin = () => {
      const user = {
        username: name.value,
        room: route.params.id,
        avatar: selectedAvatar.value,
      };
      socket.joinRoom(user.username, user.room as string, user.avatar, () => {
        router.push(`/session/${user.room}`);
      });
      // context.emit("join", user);
    };
    return { handleJoin, name, isSelected, handleSelect, avatars };
  },
});
</script>
<style scoped>
.contact-wrapper {
  display: grid;
  place-items: center;
  width: 100%;
  height: 70vh;
  box-sizing: border-box;
  font-family: Mulish;
}
.contact-info {
  width: 45%;
  display: grid;
  row-gap: 40px;
}
.contact-card {
  padding: 20px 20px 40px 20px;
  background: var(--card);

  position: relative;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  border: 1px solid var(--line);
  max-height: 250px;
}

.contact-card label {
  font-size: 10px;
}

.action {
  display: flex;
  gap: 10px;
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
  margin-bottom: 15px;
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

@media only screen and (min-width: 427px) and (max-width: 725px) {
  .contact-info {
    width: 75%;
  }
}

@media only screen and (min-width: 250px) and (max-width: 426px) {
  .contact-info {
    width: 95%;
  }

  .contact-info h2 {
    font-size: 16px;
  }
}
</style>
