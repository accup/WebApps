<template>
  <div>
    <header>
      <h1>{{ $t("pages.index.Portfolio") }}</h1>
    </header>
    <main>
      <ul>
        <template v-for="item in items">
          <a :href="item.href" target="_blank" rel="noopener noreferrer" :key="item.id">
            <li :class="{ 'list-item-rounded': 'href' in item }">
              <div>
                <h2><img :src="item.icon" v-if="item.icon" />{{ $t(`pages.index.items.${item.id}.name`) }}</h2>
              </div>
              <div>
                <p>{{ $t(`pages.index.items.${item.id}.description`) }}</p>
                <div v-if="'href' in item"></div>
              </div>
              <div><img :src="item.image" v-if="item.image" /></div>
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
        },
        {
          id: "ShapeN",
          href: "/WebApps/ShapeN/",
          icon: "/WebApps/ShapeN/icon.png",
          image: require("~/assets/screenshot/ShapeN.png"),
        },
        {
          id: "RoomAvailabilityViewer",
          href: "/Room-Availability-Viewer/",
        },
        {
          id: "ISEIILifegame",
          href: "/ISEII-Lifegame/",
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

  h2 {
    font-weight: 600;
    font-family: "Shippori Mincho", serif;
  }

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

      > div:nth-child(1) {
        position: relative;
        z-index: 1;

        h2 {
          margin: 0;
          padding: 0.6em;

          color: #f8f8f8;
          font-size: 1.5em;
        }
      }
      > div:nth-child(2) {
        position: relative;
        z-index: 1;

        p {
          margin: 0;
          padding: 0 1em 1em 1em;

          color: #f8f8f8;
        }
      }
      > div:nth-child(3) {
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
