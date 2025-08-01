<template>
  <div>
    <el-button link size="large" @click="open = !open">
      <Icon name="carbon:settings" size="xl" />
    </el-button>
  </div>

  <el-drawer
    v-model="open"
    size="360px"
    :title="t('setting.settings')"
    append-to-body
    :header-class="`${prefixCls}-header`"
    :class="[hashId, prefixCls]"
  >
    <Title>{{ t('setting.menuType') }}</Title>
    <el-radio-group v-model="layoutStore.menuType">
      <el-radio
        v-for="item in menuTypes"
        :key="item"
        :value="item"
        :style="{
          margin: 0,
          marginBlockEnd: token.marginXS + 'px',
          width: '50%',
        }"
      >
        {{ item }}
      </el-radio>
    </el-radio-group>

    <Title>{{ t('setting.verticalMenuExpandCollapse') }}</Title>
    <el-switch v-model="layoutStore.collapse" />

    <Title>{{ t('setting.showSidebar') }}</Title>
    <el-switch v-model="layoutStore.sidebarVisible" />

    <Title>{{ t('setting.showTabs') }}</Title>
    <el-switch v-model="layoutStore.tabbarVisible" />

    <template v-if="httpMessageManager">
      <Title>Mock</Title>
      <el-button type="primary" @click="resetLocalDB">
        {{ t('setting.resetLocalDatabase') }}
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="tsx">
import { defineComponent, inject, ref } from 'vue';
import { ElButton } from 'element-plus';
import { useLayoutStore } from 'cosey/store';
import { Icon, useComponentConfig, useToken } from 'cosey/components';
import { HttpMessageManager, resetDB } from '@cosey/mock';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

import useStyle from './style';

defineOptions({
  name: 'LayoutSetting',
});

const { prefixCls } = useComponentConfig('layout-setting');

const { hashId } = useStyle(prefixCls);

const { token } = useToken();

const layoutStore = useLayoutStore();

const menuTypes = ref([
  'vertical',
  'biserial',
  'horizontal',
  'horizontal-vertical',
  'horizontal-biserial',
]);

const open = ref(false);

const httpMessageManager = inject<HttpMessageManager | null>('mockContext', null);

const resetLocalDB = async () => {
  await resetDB();
  window.location.reload();
};

const Title = defineComponent({
  setup:
    (_, { slots }) =>
    () => (
      <div
        style={{
          marginBlockStart: token.value.marginSM + 'px',
          marginBlockEnd: token.value.marginXS + 'px',
          fontSize: token.value.fontSize + 'px',
          fontWeight: token.value.fontWeightStrong,
        }}
      >
        {slots.default?.()}
      </div>
    ),
});
</script>
