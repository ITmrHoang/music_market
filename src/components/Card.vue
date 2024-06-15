<template>
  <article class="mt-100px max-xl:mt-80px max-sm:mt-60px" style="min-height: 100px">
    <div class="h-60px w-full card__title">
      <slot name="title"> Title</slot>
      <a class="view_more" @click="viewmore"> view more >></a>
    </div>
    <div class="card__content pt-80px max-xl:pt-60px max-sm:pt-40px xl:pr-32px">
      <slot> <ISong /> </slot>
    </div>
  </article>
</template>

<script>
import ISong from "./ISong.vue";
export default {
  props: {
    name: { type: String },
  },
  components: {
    ISong,
  },
  methods: {
    viewmore() {
      console.log("norrr", this.name);
      if (this.name == "newsongs") {
        this.$router.push("/new-songs");
      }
      if (this.name == "topdownload") {
        this.$router.push("/top-download");
      }
    },
  },
};
</script>

<style scoped>
.card__title {
  position: relative;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  color: var(--text--color);
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border--color);
}
.view_more {
  position: absolute;
  right: 0;
  font-size: 12px;
  color: #6d6f81;
}
</style>
