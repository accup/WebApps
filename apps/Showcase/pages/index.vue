<template>
  <div>
    <header>
      <h1>{{ $t("pages.index.Portfolio") }}</h1>
    </header>
    <main>
      <ul v-for="item in items" :key="item.id">
        <a :href="item.href" target="_blank" rel="noopener noreferrer">
          <li>
            <h2>{{ $t(`pages.index.items.${item.id}.name`) }}</h2>
            <p>{{ $t(`pages.index.items.${item.id}.description`) }}</p>
          </li>
        </a>
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
        },
        {
          id: "ShapeN",
          href: "/WebApps/ShapeN/",
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
@import "@/assets/variables";

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
    padding: 0;

    li {
      display: block;
    }
  }
}
</style>
