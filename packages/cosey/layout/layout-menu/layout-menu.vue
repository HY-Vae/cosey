<template>
  <component :is="template"></component>
</template>

<script setup lang="tsx">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu } from 'element-plus';
import { type MenuItem } from '../../router';
import { useLayoutStore } from '../../store';
import { defineTemplate } from '../../utils';
import { Icon, useComponentConfig } from '../../components';

import useStyle from './style';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineOptions({
  name: 'LayoutMenu',
});

const props = withDefaults(
  defineProps<{
    mode?: 'horizontal' | 'vertical';
  }>(),
  {
    mode: 'vertical',
  },
);

const { prefixCls } = useComponentConfig('layout-menu');

const { hashId } = useStyle(prefixCls);

const route = useRoute();
const router = useRouter();

const layoutStore = useLayoutStore();

const mode = computed(() => {
  if (!layoutStore.isMobile && props.mode === 'horizontal') {
    return 'horizontal';
  }
  return 'vertical';
});

const collapse = computed(() => {
  return !layoutStore.isMobile && mode.value === 'vertical' && layoutStore.collapse;
});

const onMenuItemClick = (item: MenuItem) => {
  if (layoutStore.isMobile) {
    layoutStore.sidebarVisible = false;
  }

  if (item._externalLink) {
    window.open(item.path, '_blank');
  } else {
    router.push({
      name: item.name,
    });
  }
};

function renderMenu(menuItems: MenuItem[]) {
  function renderSubMenu(menuItems: MenuItem[]) {
    return menuItems.map((item) => {
      const iconVNode = () =>
        item.icon && (
          <Icon
            name={item.icon}
            class={`${prefixCls.value}-icon`}
            style={{
              margin: collapse.value ? 0 : undefined,
            }}
          />
        );
      const titleVNode = () => <span>{t(item.title ?? '')}</span>;

      if (item.children && item.children.length > 0) {
        const slots = {
          title: () => [iconVNode(), titleVNode()],
          default: () => renderSubMenu(item.children!),
        };
        if (item.type === 'group') {
          return <ElMenuItemGroup v-slots={slots}></ElMenuItemGroup>;
        }
        return <ElSubMenu index={item.name} v-slots={slots}></ElSubMenu>;
      }

      const menuRoute = item.route;
      const active =
        menuRoute.children?.length &&
        menuRoute.meta.hideChildrenInMenu &&
        route.matched.some((item) => item.name === menuRoute.name);

      return (
        <ElMenuItem
          key={item.name}
          index={item.name}
          class={{ 'is-active': active }}
          onClick={() => onMenuItemClick(item)}
          v-slots={{
            title: titleVNode,
            default: iconVNode,
          }}
        ></ElMenuItem>
      );
    });
  }

  return (
    <ElMenu
      unique-opened
      default-active={route.name}
      mode={mode.value}
      collapse={collapse.value}
      style={{ '--el-menu-horizontal-height': '100%' }}
      class={[hashId.value, prefixCls.value, `is-${layoutStore.menuType}`]}
    >
      {{ default: () => renderSubMenu(menuItems) }}
    </ElMenu>
  );
}

const template = defineTemplate(() => {
  return renderMenu(layoutStore.defaultMenus);
});
</script>
