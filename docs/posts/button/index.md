# Button

### demo
```tsx
const ButtonView = () => {
    const click = () => {
        console.log('click');
    };
    return (
        <div className="component-view">
            <Button width="90" click={click}>按钮</Button>
            <Button type="blue" width="90" click={click}>按钮</Button>
        </div>
    );
};
```

### attributes
| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（可选值：default/blue/word） | string | default | no     |
| size   | 大小（可选值：large/medium/small） | string | medium | no |
| disabled   | 是否禁用 | boolean | false | no   |
| width   | 宽 | string/number | 80 | no   |
| children   | content | any | button | no   |
