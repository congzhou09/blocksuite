import type { TemplateResult } from 'lit';

import type { ImageBlockComponent } from '../../../image-block/image-block.js';

export type DefaultItemConfig = {
  name: string;
  icon: TemplateResult;
  tooltip: string;
  showWhen: (block: ImageBlockComponent) => boolean;
  action: (
    block: ImageBlockComponent,
    abortController: AbortController,
    onClick?: () => void
  ) => void;
};

export type CommonItem = DefaultItemConfig & {
  type: 'common';
};

export type MoreItem = DefaultItemConfig & {
  type: 'more';
};

export type DividerItem = {
  type: 'divider';
  showWhen: (block: ImageBlockComponent) => boolean;
};

export type CustomItem = {
  showWhen: (block: ImageBlockComponent) => boolean;
  render: (
    block: ImageBlockComponent,
    onClick?: () => void
  ) => TemplateResult | null;
  type: 'custom';
};

export type ImageConfigItem = CommonItem | CustomItem;
export type MoreMenuConfigItem = MoreItem | DividerItem;
