# Select

### demo
```typescript jsx
const data = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项下级分项下级分项下级分项下级分项' },
    { id: 'lowerLevel2', name: '下级分项2' },
    { id: 'lowerLevel3', name: '下级分项3' },
    { id: 'lowerLevel4', name: '下级分项4' },
    { id: 'lowerLevel45', name: '下级分项5' },
    { id: 'average', name: '滑动平均滑动平均滑动平均滑动平均滑动平均滑动平均滑动平均滑动平均', disabled: true },
    { id: 'lowerLevel451', name: '下级分项6' }
];
const ButtonView = () => {
    const [value, setValue] = useState('totalEnergy');
    const [name, setName] = useState('总量');
    const [dropData, setDropData] = useState(JSON.parse(JSON.stringify(data)));
    const change = (item: Item) => {
        console.log(item);
        setValue(item.id);
        setName(item.name);
    };
    return (
        <div className="component-view">
            <Select
                value={value}
                data={dropData}
                change={change}
            >{name}</Select>
        </div>
    );
};
```

### attributes
| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据 | array | [] | yes     |
| value   | 选中的项 | string | '' | no |
| maxWidth   | 最大宽度 | number | 180 | no   |
| triangle   | 是否显示右边三角形icon | boolean | true | no   |
| openSearch   | 开启搜索 | boolean | false | no   |
| placeholder   | 输入框占位符 | string | 请搜索 | no   |
| disabled   | 是否禁用 | boolean | false | no   |
| maxCount   | 下拉列表容纳最大条数 | number | 5 | no   |
| children   | content | any | button | no   |
| change   | 选中提交的事件 | function | (item) => {} | yes   |
