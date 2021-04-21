<template>
  <div>
    <header>
      <div class="gatter"></div>
      <h1>{{ $t("pages.index.Portfolio") }}</h1>
      <div class="language-control">
        <nuxt-link :to="switchLocalePath(languageControl.targetLocale)">{{
          languageControl.targetLocaleText
        }}</nuxt-link>
      </div>
    </header>
    <main>
      <ul>
        <template v-for="item in items">
          <li :key="item.id">
            <div class="item-header">
              <h2>
                <img class="item-icon" :src="item.icon" v-if="item.icon" />
                {{ $t(`pages.index.items.${item.id}.name`) }}
                <span class="item-tag" v-for="tag in item.tags" :key="tag">{{ $t(`pages.index.tags.${tag}`) }}</span>
              </h2>
            </div>
            <div class="item-text">
              <p>{{ $t(`pages.index.items.${item.id}.description`) }}</p>
              <a
                v-for="link in item.links"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :key="link.href"
              >
                <div class="item-visit-page">
                  {{ $t(`pages.index.visitPage.${link.pageType}`) }}
                  <svg class="item-visit-page-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" :d="icons.mdiChevronRight" />
                  </svg>
                </div>
              </a>
            </div>
            <div class="item-image"><img :src="item.image" v-if="item.image" /></div>
          </li>
        </template>
      </ul>
    </main>
  </div>
</template>

<script>
import { mdiChevronRight } from "@mdi/js";

export default {
  data() {
    let languageControl;
    if (this.$i18n.locale == "ja") {
      languageControl = {
        targetLocale: "en",
        targetLocaleText: "English",
      };
    } else {
      languageControl = {
        targetLocale: "ja",
        targetLocaleText: "日本語",
      };
    }
    return {
      languageControl,
      icons: {
        mdiChevronRight,
      },
      items: [
        {
          id: "BeatsPerMinute",
          icon: "/WebApps/BeatsPerMinute/icon.png",
          image: require("~/assets/screenshot/BeatsPerMinute.png"),
          pageType: "application",
          links: [
            {
              pageType: "application",
              href: "/WebApps/BeatsPerMinute/",
            },
            {
              pageType: "github",
              href: "https://github.com/accup/WebApps",
            },
          ],
          tags: ["NuxtJs", "PWA", "forSmartphone"],
        },
        {
          id: "ShapeN",
          icon: "/WebApps/ShapeN/icon.png",
          image: require("~/assets/screenshot/ShapeN.png"),
          links: [
            {
              pageType: "application",
              href: "/WebApps/ShapeN/",
            },
            {
              pageType: "github",
              href: "https://github.com/accup/WebApps",
            },
          ],
          tags: ["NuxtJs", "PWA", "forSmartphone"],
        },
        {
          id: "VyJit",
          image: require("~/assets/screenshot/VyJit.png"),
          links: [
            {
              pageType: "github",
              href: "https://github.com/accup/VyJit",
            },
          ],
          tags: ["Python", "HTML5", "WebSocket"],
        },
        {
          id: "RoomAvailabilityViewer",
          image: require("~/assets/screenshot/Room-Availability-Viewer.png"),
          links: [
            {
              pageType: "demonstration",
              href: "/Room-Availability-Viewer/",
            },
          ],
          tags: ["HTML5", "forSmartphone"],
        },
        {
          id: "ISEIILifegame",
          image: require("~/assets/screenshot/ISEII-Lifegame.png"),
          links: [
            {
              pageType: "demonstration",
              href: "/ISEII-Lifegame/",
            },
          ],
          tags: ["HTML5", "PHP", "forPC"],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/variables";

header {
  color: #c0c0c0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > h1 {
    flex: 0 1 5em;
    text-align: center;

    font-weight: 400;
    font-family: "Shippori Mincho", serif;
  }

  > div.gatter,
  > div.language-control {
    flex: 1 0 0px;

    margin-top: 0.5em;
    text-align: center;

    a {
      color: unset;
      text-decoration: underline;
    }
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

          .item-icon {
            margin: -0.7em 0 -0.5em 0;
            width: 1.5em;
            height: 1.5em;
            vertical-align: middle;
          }
          .item-tag {
            margin: 0 0.5em;
            padding: 0 0.5em;
            font-size: 0.5em;
            font-weight: 300;
            font-family: "Noto Sans JP", sans-serif;
            vertical-align: middle;
            line-height: 1em;
            border: 1px solid #f85050;
            color: #f85050;
            white-space: nowrap;
          }
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
          padding: 0.5em 0;
          text-align: left;

          text-shadow: 0px -1px 4px #404040, 1px 0px 4px #404040, 0px 1px 4px #404040, -1px 0px 4px #404040;
          color: #80c0ff;
          font-size: 1.2em;

          transform: translateX(0);
          transition: transform 0.2s ease-in-out;
          &:hover {
            transform: translateX(1ex);
          }

          .item-visit-page-icon {
            margin: -0.7em -0.5em -0.5em -0.3em;
            width: 2em;
            height: 2em;
            vertical-align: middle;
          }
        }
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
