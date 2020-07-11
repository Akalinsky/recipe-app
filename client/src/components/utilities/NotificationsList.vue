<template>
  <div class="notifications-list">
    <notification-card v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </div>
</template>

<script>
import NotificationCard from '@/components/utilities/NotificationCard'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationCard
  },
  computed: {
    ...mapState({
      notifications: state => state.util.notifications
    })
  }
}
</script>

<style lang="scss">

.notifications-list {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 15px;
  width: 90%;
  @media screen and (min-width: 1024px) {
    width: 520px;
  }
}

</style>
