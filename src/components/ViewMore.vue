<template>
  <article class="mt-100px max-xl:mt-80px max-sm:mt-60px" style="min-height: 100px">
    <div class="h-60px w-full card__title">
      {{ title }}
    </div>

    <div class="card__content pt-80px max-xl:pt-60px max-sm:pt-40px xl:pr-32px">
      <div class="content">
        <div
          class="grid grid-cols-2 gap-y-60px gap-x-5px max-sm:grid-cols-1 max-sm:gap-y-40px item"
        >
          <ISong v-for="(item, index) in items" :key="index" :song="item" />
        </div>
        <div v-if="loading" class="loading">Loading...</div>
      </div>
    </div>
  </article>
</template>

<script>
import { computed } from "vue";
import ISong from "./ISong.vue";
export default {
  setup() {
    const route = useRoute();

    const currentPath = computed(() => route.path);

    return {
      currentPath,
    };
  },
  components: {
    ISong,
  },
  data() {
    const path = this.$route.path;
    let title = "";
    if (path == "/new-songs") {
      title = "New songs";
    } else if (path == "/top-download") {
      title = "Top download";
    }
    return {
      data: [],
      title,
      loading: false,
      items: [],
      page: 1,
      perPage: 10,
    };
  },
  methods: {
    async loadMore() {
      if (this.loading) return;
      this.loading = true;
      // Giả sử call api cos page va du lieu
      const newItems = await this.fetchItems(this.page, this.perPage);
      this.items = [...this.items, ...newItems];
      this.page += 1;
      this.loading = false;
    },
    fetchItems(page, perPage) {
      //TODO Thay thế bằng api thuc
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = [];
          let url = this.path == "/new-songs" ? "newsongs.json" : "/topdownload.json";
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              console.error("There has been a problem with your fetch operation:", error);
            });
        }, 1000);
      });
    },
      handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    
    console.log("Scroll: " + scrollTop, clientHeight, scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      this.loadMore();
    }
  },
  },

  created() {
    this.loadMore();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount () {
    console.log("BeforeDestroy")
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {},
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
.loading {
  text-align: center;
  width: 100%;
  font-size: 30px;
  padding-top: 30px;
  color: var(--text--color);
}
</style>
