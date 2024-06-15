<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="flex-grow">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    return {};
  },
};
</script>

<style global>  
header,footer {
  background-color: var(--background-color);

  position: fixed;

}
header {
  height: 92px
}
footer {
  height:64px;
}

main {
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 92px; /* Chiều cao của header */
  padding-bottom: 64px; /* Chiều cao của footer */
}
/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}


/* Cho màn hình nhỏ hơn 640px */
@media not all and (min-width: 640px) {
  main {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
