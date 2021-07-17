<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </div>
</template>

<script>
// import '@/assets/js/svg.js'
import '@/assets/img/eye.svg'
import '@/assets/img/reply.svg'
import '@/assets/img/praise.svg'
import '@/assets/img/noPraise.svg'
import '@/assets/img/comment.svg'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
