<template>
  <div>
    <teleport to="#teleport-target">
      <div class="popup">
        <div class="popup-video" ref="video">
          <div class="close" @click="closePopup">X</div>
          <iframe
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
            :src="'https://youtube.com/embed/' + videoID"
          />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  props: {
    videoID: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const video = ref(null)
    const closePopup = () => {
      context.emit('close')
    }

    onClickOutside(video, closePopup)

    return {
      closePopup,
      video,
    }
  },
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-video {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close {
  background-color: #e74c3c;
  color: white;
  width: 16px;
  height: 16px;
  padding: 4px;
  border-radius: 50%;
  position: absolute;
  left: -10px;
  top: -10px;
  text-align: center;
  cursor: pointer;
}
</style>
