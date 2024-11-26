<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>

<template>
  <button :style="{ background: color }" class="btn" @click="onClick()">
    {{ text }}
  </button>
</template>
