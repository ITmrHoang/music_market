<template>
  <div class="slider">
    <div class="slides">
      <img v-for="(image, index) in images" :key="index" :src="image.src" :class="{ active: index === currentSlide }" class="slide" :alt="'Image ' + (index + 1)"/>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Banner",
    components: {
      Image
    },
     data() {
    return {
      images: [
        {src:'/images/banner1.png'},
        {src:'/images/banner2.png'},
        {src:'/images/banner3.png'}
       

      ],
      currentSlide: 0
    }
  },
  mounted() {
    this.startSlider();
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.nextSlide();
      }, 3000);
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }
  }
  }
</script>

<style scoped>
.slider {
  width: 100%;
  overflow: hidden;
  position: relative;
  border: 0px solid #ddd;
  margin: auto;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  width: 100%;
  height: auto;
  display: none;
}

.slide.active {
  display: block;
}
</style>