import type { Color } from '@blocksuite/affine-model';

import { ThemeObserver } from '@blocksuite/affine-shared/theme';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { EdgelessTool } from '../../../types.js';
import type { LineWidthEvent } from '../../panel/line-width-panel.js';

import '../../buttons/tool-icon-button.js';
import {
  type ColorEvent,
  GET_DEFAULT_LINE_COLOR,
} from '../../panel/color-panel.js';
import '../../panel/one-row-color-panel.js';
import '../common/slide-menu.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';

@customElement('edgeless-brush-menu')
export class EdgelessBrushMenu extends EdgelessToolbarToolMixin(LitElement) {
  static override styles = css`
    :host {
      display: flex;
      position: absolute;
      z-index: -1;
    }

    .menu-content {
      display: flex;
      align-items: center;
    }

    menu-divider {
      height: 24px;
      margin: 0 9px;
    }
  `;

  type: EdgelessTool['type'] = 'brush';

  override render() {
    const color = ThemeObserver.getColorValue(
      this.color,
      GET_DEFAULT_LINE_COLOR()
    );

    return html`
      <edgeless-slide-menu>
        <div class="menu-content">
          <edgeless-line-width-panel
            .selectedSize=${this.lineWidth}
            @select=${(e: LineWidthEvent) =>
              this.onChange({ lineWidth: e.detail })}
          >
          </edgeless-line-width-panel>
          <menu-divider .vertical=${true}></menu-divider>
          <edgeless-one-row-color-panel
            .value=${color}
            .hasTransparent=${!this.edgeless.doc.awarenessStore.getFlag(
              'enable_color_picker'
            )}
            @select=${(e: ColorEvent) => this.onChange({ color: e.detail })}
          ></edgeless-one-row-color-panel>
        </div>
      </edgeless-slide-menu>
    `;
  }

  @property({ attribute: false })
  accessor color!: Color;

  @property({ attribute: false })
  accessor lineWidth!: number;

  @property({ attribute: false })
  accessor onChange!: (props: Record<string, unknown>) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-brush-menu': EdgelessBrushMenu;
  }
}
