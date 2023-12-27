---
name: 'component'
root: '.'
output: [
  '**/_components',
  '**/components/domains/*',
  '**/components/elements',
  '**/components/icons',
]
ignore: ['.']
questions:
  name: 'Please enter a component name.'
  needsRefForwarding:
    confirm: 'Do you need a ref forwarding?'
    initial: false
  needsStyle:
    confirm: 'Do you need a style?'
    initial: true
  needsStories:
    confirm: 'Do you need a stories?'
    initial: true
---

# `{{ inputs.name | kebab }}/index.ts`

```ts
export * from './{{ inputs.name | kebab }}';

```

# `{{ inputs.needsStyle || "!" }}{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.css.ts`

```ts
import { style } from '@vanilla-extract/css';

export const wrapper = style({
});

```

# `{{ inputs.needsRefForwarding && "!" }}{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.tsx`

```tsx
{{- if inputs.needsStyle }}
import { clsx } from 'clsx';

import * as styles from './{{ inputs.name | kebab }}.css';

import type { FC } from 'react';
{{ else }}
import type { FC } from 'react';
{{- end }}

export type {{ inputs.name | pascal }}Props = {
  className?: string | undefined;
};

export const {{ inputs.name | pascal }}: FC<{{ inputs.name | pascal }}Props> = ({
  className,
}) => {
  return (
    {{ if inputs.needsStyle -}}
    <div className={clsx(className, styles.wrapper)}>
    {{ else -}}
    <div className={className}>
    {{ end }}
    </div>
  );
};

```

# `{{ inputs.needsRefForwarding || "!" }}{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.tsx`

```tsx
{{- if inputs.needsStyle }}
import { clsx } from 'clsx';
import { forwardRef } from 'react';

import * as styles from './{{ inputs.name | kebab }}.css';

import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';
{{ else }}
import { forwardRef } from 'react';

import type { ForwardRefRenderFunction , ComponentPropsWithoutRef } from 'react';
{{- end }}

export type {{ inputs.name | pascal }}Props = ComponentPropsWithoutRef<'div'> & {
  // nothing
};

const {{ inputs.name | pascal }}Render: ForwardRefRenderFunction<HTMLDivElement, {{ inputs.name | pascal }}Props> = ({
  className,
  ...props
}, ref) => {
  return (
    {{ if inputs.needsStyle -}}
    <div {...props} ref={ref} className={clsx(className, styles.wrapper)}>
    {{ else -}}
    <div {...props} ref={ref} className={className}>
    {{ end }}
    </div>
  );
};

export const {{ inputs.name | pascal }} = forwardRef({{ inputs.name | pascal }}Render);

```

# `{{ inputs.name | kebab }}/{{ inputs.name | kebab }}.stories.tsx`

```typescript
import { {{ inputs.name | pascal }} } from './{{ inputs.name | kebab }}';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: {{ inputs.name | pascal }},
} as Meta<typeof {{ inputs.name | pascal }}>;

type Story = StoryObj<typeof {{ inputs.name | pascal }}>;

export const Default = {
  args: {},
} satisfies Story;

```
