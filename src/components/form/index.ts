import FormInstance from './Form';
import Item from './Item';

type TypeForm = typeof FormInstance
interface FormInterface extends TypeForm {
    Item: typeof Item
}
const Form = FormInstance as FormInterface;
Form.Item = Item;

export default Form;
