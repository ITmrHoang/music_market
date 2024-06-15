<script setup>
import { ref } from "vue";
import Banner from "./Banner.vue";
import Card from "./Card.vue";
import ISong from "./ISong.vue";
import AudioPlayer from "./AudioPlayer.vue";
</script>

<script>
export default {
  name: "Home",
  inheritAttrs: false,
  customOptions: {},
  data() {
    return {
      new_songs: [],
      top_download: [],
    };
  },
  created() {
    this.fetchNewSong();
    this.fetchTopDownload();
  },
  methods: {
    fetchNewSong() {
      fetch("/newsongs.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.new_songs = data;
        })
        .catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
        });
    },
    fetchTopDownload() {
      fetch("/topdownload.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.top_download = data;
        })
        .catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
        });
    },
  },
};
</script>

<template>
  <div class="flex flex-col w-full sm:w-auto">
    <Banner />
    <Card name="newsongs">
      <template v-slot:title> New Songs </template>
      <div
        class="grid grid-cols-2 gap-y-60px gap-x-5px max-sm:grid-cols-1 max-sm:gap-y-40px"
      >
        <ISong v-for="(item, index) in new_songs" :key="index" :song="item" />
      </div>
    </Card>
    <Card name="topdownload" class="pb-60px">
      <template v-slot:title> Top Download Songs </template>
      <div
        class="grid grid-cols-2 gap-y-60px gap-x-5px max-sm:grid-cols-1 max-sm:gap-y-40px"
      >
        <ISong v-for="(item, index) in top_download" :key="index" :song="item" />
      </div>
    </Card>
    <AudioPlayer/>
  </div>
</template>

<style scoped></style>
