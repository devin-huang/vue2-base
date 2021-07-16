<template>
  <fragment>
    <template v-for="(item, key) in routers">
      <el-submenu v-if="hasChildren(item)" :key="key" :index="item.path">
        <template slot="title">
          <i class="el-icon-menu" />
          <span> {{ item.name }} </span>
        </template>
        <el-menu-item-group
          v-for="(child, index) in item.children"
          :key="index"
        >
          <SideBarItem
            v-if="hasChildren(child)"
            :key="child.path"
            :routers="[child]"
          />
          <router-link
            v-else
            :key="child.key"
            :to="`${item.path}/${child.path}`"
          >
            <el-menu-item :index="`${item.path}/${child.path}`">
              <span slot="title">{{ child.name }}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link v-else :key="key" :to="item.path">
        <el-menu-item v-if="item.name" :index="item.path">
          <i class="el-icon-menu" />
          <span slot="title"> {{ item.name }} </span>
        </el-menu-item>
      </router-link>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "SideBarItem",
  props: { routers: { type: Array } },
  methods: {
    hasChildren({ children }) {
      return (
        !!children || (children && children.length === 1 && !!children[0].path)
      );
    },
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<style lang="scss" scoped></style>
