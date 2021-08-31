## Button

```tsx
    <Button>按钮</Button>
    <Button type="blue" loading width={120}>按钮</Button>
    <Button type="blue" disabled>按钮</Button>
    <Button type="green">按钮</Button>
    <Button type="orange">按钮</Button>
    <Button type="red">按钮</Button>
    <Button type="word">按钮</Button>
```

### attributes
| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（可选值：default/blue/word） | string | default | no     |
| size   | 大小（可选值：large/medium/small） | string | medium | no |
| disabled   | 是否禁用 | boolean | false | no   |
| width   | 宽 | string/number | 80 | no   |
| children   | content | any | button | no   |
