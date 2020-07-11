<template>
  <div class="notification" :class="[typeClass, stateClass]">
    <span @click="dismissNotification(notification.id)" class="close">&times;</span>
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'notification'
  ],
  data () {
    return {
      timeout: null,
      stateClass: 'show'
    }
  },
  computed: {
    typeClass () {
      return `notification-${this.notification.type}`
    }
  },
  created () {
    if (this.notification.duration) {
      this.timeout = setTimeout(() => {
        this.dismissNotification(this.notification.id)
      }, this.notification.duration)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  methods: {
    ...mapActions([
      'removeNotification'
    ]),
    dismissNotification (id) {
      this.stateClass = 'hide'
      setTimeout(() => {
        this.removeNotification(id)
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.notification {
  padding: .75rem 1.25rem;
  border-radius: .25rem;
  margin-bottom: 1rem;
  position: relative;
  padding-right: 4rem;
  border-left: 8px solid transparent;
  &.notification-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  &.notification-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &.notification-error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;

  }
  &.notification-normal {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
  }
  .close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  &.show {
    animation: show_notification .5s ease forwards;
  }
  @keyframes show_notification {
    0% {
      transform: translateX(100%);
    }
    40% {
      transform: translateX(-10%);
    }
    80% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-10px);
    }

  }
  &.hide {
    animation: hide_notification .5s ease forwards;
  }
  @keyframes hide_notification {
    0% {
      transform: translateX(-10px);
    }
    40% {
      transform: translateX(0%);
    }
    80% {
      transform: translateX(-10%);
    }
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
