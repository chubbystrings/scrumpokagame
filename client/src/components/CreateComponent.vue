<template>
  <div class="contact-wrapper">
    <div class="contact-info">
      <div class="contact-header">
        <h2>Create New Session</h2>
        <small>
         Fill the form to create a new session/game, a link will be generated for other users 
         who intend to join. Share link with others to play.
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
          <button  @click="handleCreate" :disabled="!formIsValid || clicked" class="btn">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import socket from "@/services/socket.service";
import { avatars } from "@/utils/avatars";

export default defineComponent({
  components: {
    //
  },
  setup() {
    const team = ref("");
    const username = ref("");
    const router = useRouter();
    const selectedAvatar = ref("");
    const select = ref('')
    const clicked = ref(false)

    const callback = (room: string) => {
      clicked.value = false
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
      clicked
    };
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
