<template>
  <footer class="fixed bottom-0 w-full">
    <div class="flex justify-center h-full">
    <div class="footer__content h-1">
      <div class="w-full pt-20px">
        © Music Market 2023. All Rights Reserved.
      </div></div>
       
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer__content {
  height: 100%;
  width: calc(100% - 160px);
  justify-content: center;
  align-items: center;
  border-top: 2px solid var(--border--color);
}
@media not all and (min-width: 640px) {
  .footer__content {
   width: calc(100% - 32px);
  }
}
</style>
