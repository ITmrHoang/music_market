<template>
  <div class="flex isong w-full h-97px justify-between" @click="clickSong">
    <img class="song_img" style="width: 97px; height=97px" :src="song.src" />
    <div class="isong_infor">
      <p class="song_name">{{ song.name }}</p>
      <p class="author">{{ song.author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ISong",
  props: {
    song: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  methods: {
    clickSong() {
      const _recomment_song = localStorage.getItem("recomment_song") || "[]";
      const recomment_song = JSON.parse(_recomment_song);
      if (recomment_song.findIndex((element) => element.name == this.song.name) === -1) {
        let length = recomment_song.length;
        recomment_song.unshift(this.song);
        recomment_song.splice(3, length);
        localStorage.setItem("recomment_song", JSON.stringify(recomment_song));
      }

      this.$store.commit("seturl", this.song.url);
    },
  },
};
</script>

<style scoped>
.song_img {
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgb(0, 0, 0, 20%);
}
.isong_infor {
  width: calc(100% - 117px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow: hidden;
}

.song_name {
  font-size: 24px;
  line-height: 36px;
  font-weight: 600;
  padding-bottom: 16px;
  color: #22313f;
  white-space: break-spaces;
}
.author {
  font-size: 20px;
  line-height: 24px;
  color: #6d6f81;
}
@media not all and (min-width: 768px) {
  .isong_infor {
    width: calc(100% - 113px);
  }
  .song_name {
    font-size: 18px;
    line-height: 24px;
    padding-bottom: 12px;
  }
  .author {
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
