<template>
  <svg
    class="arrow-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 20L12 4M12 4L18 10M12 4L6 10" />
  </svg>
</template>

<style lang="scss" scoped>
.arrow-icon {
  fill: none;
  path {
    fill: $common-red;
    stroke: $common-red;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>
