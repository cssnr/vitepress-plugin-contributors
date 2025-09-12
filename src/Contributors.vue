<script setup>
const props = defineProps({
  contributors: { type: Array, required: true },
  size: { type: String, default: '64' },
  margin: { type: String, default: null },
  heading: { type: String, default: null },
  maxUsers: { type: String, default: null },
})
console.debug('%c Contributors', 'color: Cyan', 'props:', props)

const maxUsers = Number(props.maxUsers)
const contributors = maxUsers ? props.contributors.slice(0, maxUsers) : props.contributors
// console.debug('contributors.length:', contributors.length)

const outerStyle = { margin: props.margin }
// console.log('outerStyle:', outerStyle)
const imageStyle = { width: `${props.size}px`, height: `${props.size}px` }
// console.log('imageStyle:', imageStyle)
</script>

<template>
  <div class="vp-contributors" :style="outerStyle">
    <div class="vp-contributors-heading" v-if="props.heading">{{ props.heading }}</div>
    <div class="vp-contributors-images">
      <a
        v-for="{ username, avatar } of contributors"
        :key="username"
        :aria-label="`${username} on GitHub`"
        :href="`https://github.com/${username}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :alt="username"
          :src="avatar"
          :width="props.size"
          :height="props.size"
          :style="imageStyle"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</template>

<style scoped>
div.vp-contributors-heading {
  font-size: 32px;
  text-align: center;
  margin-bottom: 36px;
}

div.vp-contributors-images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
}

.vp-contributors img {
  margin: 0;
  border-radius: 50%;
  /* styles for img:hover transform */
  display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  transition-duration: 0.3s;
  transition-property: transform;
}

.vp-contributors img:hover {
  transform: scale(1.08);
}
</style>
