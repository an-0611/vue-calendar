<template>
  <svg class="heart-icon" viewBox="0 0 60 60">
    <path
      class="heart-path"
      d="M30,21.6c0,0-2.1-4.6-7-4.6c-5.3,0-8.1,4.5-8.1,9.1C15,33.6,30,43,30,43s15-9.3,15-16.9c0-4.6-2.9-9.1-8-9.1 C34,17.1,31.3,18.9,30,21.6L30,21.6z"
    />
    <path
      class="heart-fill"
      d="M30,21.6c0,0-2.1-4.6-7-4.6c-5.3,0-8.1,4.5-8.1,9.1C15,33.6,30,43,30,43s15-9.3,15-16.9c0-4.6-2.9-9.1-8-9.1 C34,17.1,31.3,18.9,30,21.6L30,21.6z"
    />
  </svg>
</template>

<style lang="scss" scoped>
.heart-icon {
  &:hover > .heart-fill {
    opacity: 1;
  }
  .heart-path {
    stroke: $main-font-gray;
    stroke-width: 0.04rem;
    fill: transparent;
  }
  .heart-fill {
    fill: #e73155;
    stroke: #e73155;
    stroke-width: 0.04rem;
    transform-origin: 50%;
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
}
</style>
