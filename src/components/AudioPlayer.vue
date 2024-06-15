<template>
  <div class="audio-player" v-if="url">
    <button class="gray-100 bg-blue-100" @click="playAudio">Play</button>
    <button class="gray-100 bg-blue-100" @click="pauseAudio">Pause</button>
    <button class="gray-100 bg-blue-100" @click="stopAudio">Stop</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: new Audio(),
      link: null,
    };
  },
  mounted() {
    console.log(this.$store.state.url);
    console.log(this.$store.getters.getUrl);
  },
  watch: {
    url(newVal, oldVal) {
      // phải khởi tạo rồi gán lại url 
      if (newVal) {
        this.audio.src = newVal;
        // this.audio = new Audio(newVal);
        this.audio.play();
      }
    },
  },
  computed: {
    url() {
      return this.$store.getters.getUrl;
    },
  },
  methods: {
    playAudio() {
      console.log(this.audio)
      this.audio.play();
    },
    pauseAudio() {
      this.audio.pause();
    },
    stopAudio() {
      this.audio.pause();
      this.audio.currentTime = 0;
    },
  },
};
</script>

<style scoped>
.audio-player {
  position: fixed;
  right: 0;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
