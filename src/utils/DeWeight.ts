/** *
 * 数组去重
 * 设置padding-left
 * @param data 数据列表
 * @param key 根据key去重
 * @param reverse 数据反向
 * @return []
 */
interface IData {
    [key: string]: any
}
type Fn = (data: IData[], key: string, reverse: boolean) => IData;
const DeWeight: Fn = (data, key, reverse) => {
    const arr = reverse ? data.reverse() : data;
    const obj = {};
    const result = arr.reduce((cur: IData[], next: IData) => {
        if (!obj[next[key]]) obj[next[key]] = cur.push(next);
        return cur;
    }, []);
    return reverse ? result.reverse() : result;
};

export default DeWeight;
