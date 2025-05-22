# Icon 图标

## 简介

Cosey 中所有展示图标的地方都会使用 Icon 组件，包括标签栏、菜单栏和页面其他地方。

图标数据来源有两个，一是 [iconify](https://github.com/iconify/iconify)，二是本地的 svg 文件。

## iconify

通过 `create-cosey` 包创建的项目，默认会安装 [carbon](https://icones.js.org/collection/carbon) 图标集，其包含2000+的图标基本能满足需求了。

当然，也可以安装其他 iconify 图标集，例如，下面演示如何安装 element-plus 官方图标集。

先安装 `@iconify-json/ep`。

再进行注册：

```ts
import { icons as epIcons } from '@iconify-json/ep';
import { addIconifyIcon } from 'cosey/components';

addIconifyIcon('ep', carbonIcons);
```

使用：

```tsx
<Icon name="ep:avatar" />
```

## 本地 svg 图标

如果 iconify 不能满足需求，觉得引入的包太大，或者想引入定制性的图标。可以将 svg 文件放在 `src/assets/icons` 目录。

`create-cosey` 在 `vite.config.ts` 配置了 `vite-plugin-svg-icons` 插件，会将此目录下的 svg 文件自动打包在一起。

假如此目录下有一个 `vite.svg` 文件，可以这样使用：

```tsx
<Icon name="svg:vite" />
```

`name` 以 `svg:` 开头的图标就是引用 `src/assets/icons` 目录下的图标。

## 代码演示

### 基础使用

::: demo

icon/basic

:::

### SvgIcon

::: demo

icon/svg-icon

:::

## API

### IconProps

| 属性 | 描述     | 类型                                             | 默认值 |
| ---- | -------- | ------------------------------------------------ | ------ |
| name | 图标名称 | string                                           | -      |
| size | 图标尺寸 | 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string | -      |
