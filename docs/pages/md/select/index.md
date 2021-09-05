## Select
```ts
    import { Button } from 'double-ui';
    const data = [
        { id: '1', name: 'AAA' },
        { id: '2', name: 'BBB' },
        { id: '3', name: 'CCCCCCCCCCCCCCCCCC' },
        { id: '4', name: 'DDD' },
        { id: '5', name: 'EEE' },
        { id: '6', name: 'FFFF' },
        { id: '7', name: 'GGGGGGG' },
        { id: '8', name: 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH', disabled: true },
        { id: '9', name: 'IIIIIIIIIIIIIIIIIII' }
    ];
    const [value, setValue] = useState('4');
    const [name, setName] = useState('DDD');
    const [dropData, setDropData] = useState(JSON.parse(JSON.stringify(data)));
    const change = (item: Item) => {
        console.log(item);
        setValue(item.id);
        setName(item.name);
    };
```
```tsx
    <Select
        value={value}
        data={dropData}
        change={change}
    >{name}</Select>
```

### attributes

| 参数 | 说明 | 类型 | 默认值 | 必须 |
| ---- | ---- | ---- | ---- | ---- |
| data | 数据 | array | [] | yes |
| value | 选中的项 | string | '' | no |
| maxWidth | 最大宽度 | number | 180 | no |
| triangle | 是否显示右边三角形icon | boolean | true | no |
| openSearch | 开启搜索 | boolean | false | no |
| placeholder | 输入框占位符 | string | 请搜索 | no |
| disabled | 是否禁用 | boolean | false | no |
| maxCount | 下拉列表容纳最大条数 | number | 5 | no |
| children | content | any | button | no |
| change | 选中提交的事件 | function | (item) => {} | yes |
