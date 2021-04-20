<template>
  <div>
    <header>
      <h1>{{ $t("pages.index.Portfolio") }}</h1>
    </header>
    <main>
      <ul>
        <template v-for="item in items">
          <a :href="item.href" target="_blank" rel="noopener noreferrer" :key="item.id">
            <li>
              <div class="item-header">
                <h2>
                  <!-- <img :src="item.icon" v-if="item.icon" /> -->
                  {{ $t(`pages.index.items.${item.id}.name`) }}
                </h2>
              </div>
              <div class="item-text">
                <p>{{ $t(`pages.index.items.${item.id}.description`) }}</p>
                <div class="item-visit-page" v-if="'href' in item">
                  {{ item.isDemo ? $t(`pages.index.visitDemoPage`) : $t(`pages.index.visitPage`) }}
                </div>
              </div>
              <div class="item-image"><img :src="item.image" v-if="item.image" /></div>
            </li>
          </a>
        </template>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: "BeatsPerMinute",
          href: "/WebApps/BeatsPerMinute/",
          icon: "/WebApps/BeatsPerMinute/icon.png",
          image: require("~/assets/screenshot/BeatsPerMinute.png"),
          isDemo: false,
        },
        {
          id: "ShapeN",
          href: "/WebApps/ShapeN/",
          icon: "/WebApps/ShapeN/icon.png",
          image: require("~/assets/screenshot/ShapeN.png"),
          isDemo: false,
        },
        {
          id: "RoomAvailabilityViewer",
          href: "/Room-Availability-Viewer/",
          image: require("~/assets/screenshot/Room-Availability-Viewer.png"),
          isDemo: true,
        },
        {
          id: "ISEIILifegame",
          href: "/ISEII-Lifegame/",
          image: require("~/assets/screenshot/ISEII-Lifegame.png"),
          isDemo: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/variables";

header {
  h1 {
    color: #c0c0c0;
    text-align: center;

    font-weight: 400;
    font-family: "Shippori Mincho", serif;
  }
}

main {
  margin: auto;

  @include breakpoint($max: xs) {
    width: 100%;
  }
  @include breakpoint($min: xs, $max: sm) {
    width: container-size(xs);
  }
  @include breakpoint($min: sm) {
    width: container-size(sm);
  }

  ul {
    padding: unset;
    list-style: none;

    a {
      color: unset;
      text-decoration: unset;
    }

    li {
      position: relative;
      display: block;
      margin-bottom: 1em;
      padding: 0;
      background-color: #404044;

      font-weight: 300;
      font-family: "Noto Sans JP", sans-serif;

      @include breakpoint($max: xs) {
        min-height: 160px;
        font-size: 12px;
      }
      @include breakpoint($min: xs) {
        min-height: 240px;
        font-size: 14px;
      }

      > div.item-header {
        position: relative;
        z-index: 1;

        h2 {
          margin: 0;
          padding: 0.6em;

          color: #f8f8f8;
          font-size: 1.5em;
          font-weight: 600;
          font-family: "Shippori Mincho", serif;
          text-shadow: 0px -1px 4px #404040, 1px 0px 4px #404040, 0px 1px 4px #404040, -1px 0px 4px #404040;
        }
      }
      > div.item-text {
        position: relative;
        z-index: 1;

        p {
          margin: 0;
          padding: 0 1em 1em 1em;

          text-shadow: 0px -1px 4px #404040, 1px 0px 4px #404040, 0px 1px 4px #404040, -1px 0px 4px #404040;
          color: #f8f8f8;
        }

        div.item-visit-page {
          margin: auto 1em 0 1em;
          text-align: left;

          text-shadow: 0px -1px 4px #404040, 1px 0px 4px #404040, 0px 1px 4px #404040, -1px 0px 4px #404040;
          color: #80c0ff;
          font-size: 1.2em;

          transform: translate(0, 0);
          transition: transform 0.2s ease-in-out;
        }
      }
      &:hover > div.item-text div.item-visit-page {
        transform: translate(1ex, 0);
      }

      > div.item-image {
        position: absolute;
        z-index: 0;

        top: 0px;
        right: 0px;
        height: 100%;

        img {
          max-width: 100%;
          height: 100%;
          object-fit: contain;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
