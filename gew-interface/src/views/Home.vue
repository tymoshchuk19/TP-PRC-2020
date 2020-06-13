<template>
  <div class="home">
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
      :grow="grow"
      :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
      :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
      :icons-and-text="icons"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        v-for="i in tabs"
        :key="i"
        :href="`#tab-${i}`"
      >
        {{ titles[i-1] }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item
        v-for="i in tabs"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card
          flat
          tile
        >
          <TimeLine :tab="i"/>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from '@/components/TimeLine.vue'

export default {
  name: 'Home',
  components: {
    TimeLine
  },
  data () {
      return {
        tab: null,
        titles: ['Launched', 'Upcoming', 'TBA'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: false,
        grow: true,
        prevIcon: false,
        nextIcon: false,
        tabs: 3,
      }
    }
}
</script>
