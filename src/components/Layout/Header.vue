<template>
  <header
    class="header__bg--color pr-80px pl-80px max-sm:pr-16px max-sm:pl-16px flex justify-start items-center fixed w-full z-10 gap-x-40px max-sm:gap-x-20px"
  >
    <button
    style="position: absolute; top: 0;"
      v-tooltip.bottom="{
        value: 'Clear Recommended',
        pt: {
          arrow: {
            style: {
              borderBottomColor: 'var(--p-primary-color)',
            },
          },
          text: 'bg-primary text-primary-contrast font-medium',
        },
      }"
      @click="clearRecommended"
    ><i class="pi pi-trash"></i></button>
    <div
      class="text__logo text__logo--color text__logo_shadown font-pacifico"
      @click="goHome"
    >
      Music Market
    </div>
    <div class="items-center">
      <AutoComplete
        class="w-316px h-52px max-sm:w-218px"
        v-model="searchQuery"
        :suggestions="filteredSuggestions"
        @complete="search"
        optionLabel="name"
        placeholder="Type any name here..."
      >
        <template #option="slotProps">
          <div class="flex isong w-full h-60px justify-between" @click="clickSong(slotProps.option)">
            <img
              class="song_img"
              style="width: 60px; height=60px"
              :alt="slotProps.option.name"
              :src="slotProps.option.src"
            />
            <div class="isong_infor">
              <p class="song_name">{{ slotProps.option.name }}</p>
            </div>
          </div>
        </template>
      </AutoComplete>
    </div>
  </header>
</template>

<script>
import AutoComplete from "primevue/autocomplete";

export default {
  data() {
    return {
      items: [],
      filteredSuggestions: [],
      searchQuery: "",
    };
  },
  components: {
    AutoComplete,
  },
  created() {
    this.fetchNewSong();
    this.fetchTopDownload();
  },

  methods: {
    clickSong(song) {
      console.log(song)
      const _recomment_song = localStorage.getItem("recomment_song") || "[]";
      const recomment_song = JSON.parse(_recomment_song);
      if (recomment_song.findIndex((element) => element?.name == song.name) === -1) {
        let length = recomment_song.length;
        recomment_song.unshift(song);
        recomment_song.splice(3, length);
        localStorage.setItem("recomment_song", JSON.stringify(recomment_song));
      }

      this.$store.commit("seturl", song.url);
    },
    goHome() {
      this.$router.push("/");
    },
    clearRecommended() {
      localStorage.setItem("recomment_song", "[]");
    },
    search(event) {
      setTimeout(() => {
        const _recomment_song = localStorage.getItem("recomment_song") || "[]";
        const recomment_song = JSON.parse(_recomment_song);
        const _rcm = recomment_song.filter((suggesittion) =>
          suggesittion?.name.toLowerCase().includes(event.query.toLowerCase())
        );
        const _filteredSuggestions = this.items.filter((suggesittion) =>
          suggesittion.name.toLowerCase().includes(event.query.toLowerCase())
        );

        const new_filteredSuggestions = _filteredSuggestions.filter((suggesittion) => {
          let check = recomment_song.findIndex(
            (element) => element?.name.toLowerCase() === suggesittion.name.toLowerCase()
          );
          return check >= 0 ? false : true;
        });
        console.log(_rcm, new_filteredSuggestions);

        this.filteredSuggestions = [..._rcm, ...new_filteredSuggestions];
      }, 1000);
    },

    fetchNewSong() {
      fetch("/newsongs.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.items = [...this.items, ...data];
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
          this.items = [...this.items, ...data];
        })
        .catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
        });
    },
  },
};
</script>

<style scoped>
.header__bg--color {
  background-color: var(--header_bg);
}
.text__logo {
  font-size: 32px;
  font-weight: 600;
}
.text__logo--color {
  color: var(--text_logo);
}
.text__logo_shadown {
  text-shadow: 2px 2px 4px #;
}
@media not all and (min-width: 640px) {
  .text__logo {
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
  }
}

.isong_infor {
  width: calc(100% - 72px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow: hidden;
}
.song_img {
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgb(0, 0, 0, 25%);
}

.song_name {
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  margin: auto 0;
  color: #22313f;
  white-space: break-spaces;
}

@media not all and (min-width: 768px) {
  .isong_infor {
    width: calc(100% - 72px);
  }
  .song_name {
    font-size: 12px;
    line-height: 18px;
    padding-bottom: 12px;
  }
}
</style>
